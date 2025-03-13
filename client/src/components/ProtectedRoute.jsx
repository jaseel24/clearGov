import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    
    const {user} = useContext(AuthContext);

    console.log(user);

    return <div>{user ? children : <Navigate to={"/login"} />}</div>;
};

export default ProtectedRoute;
