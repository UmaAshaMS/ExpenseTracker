import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ children, role }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/authCheck`, {
                    withCredentials: true,
                });

                if (role && res.data.role !== role) {
                    /* Nannu: ivide API call cheythu status code nokkenam */
                    console.warn("Role mismatch. Expected:", role, "Got:", res.data.role);
                
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }

        } catch (err) {
            console.error("Auth error:", err);
            setIsAuthenticated(false);
        }
    };

    checkAuth();
}, [role]);

if (isAuthenticated === null) return <p>Checking authentication...</p>;
if (!isAuthenticated) return <Navigate to="/signin" />;

return children;
}

export default PrivateRoute;
