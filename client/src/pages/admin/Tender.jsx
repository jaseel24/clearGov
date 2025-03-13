import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios.config";
import TenderDetails from "../../components/admin/TenderDetails";
import toast from "react-hot-toast";

const Tender = () => {
    const { tenderId } = useParams();

    const [tender, setTender] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`/tender/tender/${tenderId}`)
            .then((res) => {
                setTender(res.data.tender);
            })
            .catch((err) => {
                console.log(err.response.message);
                if (err.status === 401) {
                    toast.error("Session expired!");
                    navigate("/admin");
                }
            });
    }, [tenderId]);

    return (
        <div>
            <TenderDetails tender={tender} />
        </div>
    );
};

export default Tender;
