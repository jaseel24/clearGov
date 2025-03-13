import { useDispatch } from "react-redux";
import axios from "../config/axios.config";
import { addUser } from "../features/user/userSlice";
import { createContext, useEffect, useState } from "react";
import { addTenders } from "../features/tender/tenderSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tenders, setTenders] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("/auth/me")
            .then((res) => {
                dispatch(addUser(res.data.user));
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/tender/tenders")
            .then((res) => {
                dispatch(addTenders(res.data.tenders));
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <AuthContext.Provider value={{ user, setUser, tenders, setTenders }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
