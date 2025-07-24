import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const signin = async (inputs) => {
        const res = await axios.post('/api/auth/signin', inputs, { withCredentials: true });
        setCurrentUser(res.data);
    };

    const signout = async () => {
        await axios.post('/api/auth/signout', {}, { withCredentials: true });
        setCurrentUser(null);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('/api/auth/me', { withCredentials: true });
                setCurrentUser(res.data);
            } catch (err) {
                setCurrentUser(null);
            }
        };
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
