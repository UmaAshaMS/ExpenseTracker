const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes');


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then( () => {
        console.log('MongoDB connected')
    })
    .catch( (err) => {
        console.log(err)
    });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,             
  }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})

