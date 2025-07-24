const bcryptjs = require('bcryptjs');
const User = require('../models/userSchema');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists!!' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword, role: 'user' })

        await newUser.save()
        res.status(201).json({ success: true, message: 'New user created' })
    }
    catch (error) {
        next(error)
    }
};


const signin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(errorHandler(400, 'Email and password are required!'));
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found!Enter valid credentials'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'))
        }
        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: 'Lax',
            secure: false
        }).status(200).json(rest)
    }
    catch (error) {
        next(error)
    }
};

// (authCheck)
const authCheck = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decoded = jwt.verify(token, 'secret_key');
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            message: 'Authenticated',
            role: user.role,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
}


module.exports = {
    signup,
    signin,
    authCheck
};