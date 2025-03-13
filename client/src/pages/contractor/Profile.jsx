import React, { useEffect, useState } from "react";
import ContractorProfile from "../../components/contractor/ContractorProfile";
import axiosInstance from "../../config/axios.config";

const Profile = () => {
    const [contractor, setContractor] = useState({});

    useEffect(() => {
        axiosInstance
            .get("/auth/me")
            .then((res) => {
                console.log(res);
                setContractor(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <ContractorProfile contractor={contractor} />
        </div>
    );
};

export default Profile;
