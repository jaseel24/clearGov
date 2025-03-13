import React, { useEffect, useState } from "react";
import ProjectList from "../../components/project/ProjectList";
import axios from "../../config/axios.config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("/govauth/projects")
            .then((res) => {
                console.log(res);
                setProjects(res.data.projects);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error("Session expired!")
                    navigate('/login')
                }
                console.log(err);
            });
    }, []);

    return (
        <div>
            <ProjectList projects={projects} />
        </div>
    );
};

export default Projects;
