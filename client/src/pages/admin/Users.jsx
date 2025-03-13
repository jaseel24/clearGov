import React, { useEffect, useState } from "react";
import UserList from "../../components/user/UserList";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

        const navigate = useNavigate()
    

    useEffect(() => {
        axios
            .get("/admin/users")
            .then((res) => {
                console.log(res);
                setUsers(res.data.users);
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
            <UserList users={users} setUsers={setUsers} />
        </div>
    );
};

export default Users;
