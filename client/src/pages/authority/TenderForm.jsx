import React, { useEffect, useState } from "react";
import CreateTender from "../../components/tender/CreateTender";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TenderForm = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/govauth/projects")
            .then((res) => {
                console.log(res);
                setProjects(res.data.projects);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error("Session expired!");
                    navigate("/login");
                }
                console.log(err);
            });
    }, []);

    return (
        <div>
            <CreateTender projects={projects} />
        </div>
    );
};

export default TenderForm;
