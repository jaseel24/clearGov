import { useEffect, useState } from "react";
import UpdateProgressForm from "../../components/contractor/UpdateProgressForm";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

const UpdateProgressPage = () => {
    const { tenderId } = useParams();

    const [tender, setTender] = useState({})

    useEffect(() => {
        axiosInstance.get(`/contractor/tenders/${tenderId}`).then((res) => {
            setTender(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [tenderId])

    return (
        <div>
            <UpdateProgressForm tender={tender} tenderId={tenderId} />
        </div>
    );
};

export default UpdateProgressPage;
