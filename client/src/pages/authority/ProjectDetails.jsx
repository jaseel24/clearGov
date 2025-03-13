import React, { useEffect, useState } from "react";
import ProjectView from "../../components/project/ProjectView";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState({});

    useEffect(() => {
        axiosInstance
            .get(`/govauth/project/${projectId}`)
            .then((res) => {
                setProject(res.data.project);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [projectId]);
    return <div>
        <ProjectView project={project} setProject={setProject} />
    </div>;
};

export default ProjectDetails;
