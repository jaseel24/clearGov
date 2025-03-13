import React, { useEffect, useState } from "react";

import axios from "../../config/axios.config";
import { useNavigate, useParams } from "react-router-dom";
import UserList from "../../components/user/UserList";
import UserDetails from "../../components/user/UserDetails";
import toast from "react-hot-toast";

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});


    console.log(user);

        const navigate = useNavigate()
    

    useEffect(() => {
        axios
            .get(`/user/user/${id}`)
            .then((res) => {
                console.log(res);
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    toast.error("Session expired!");
                    navigate("/admin");
                }
            });
    }, []);
    return (
        <div>
            <UserDetails user={user} />
        </div>
    );
};

export default User;
