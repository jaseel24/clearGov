import React, { useEffect, useState } from "react";
import BidDetails from "../../components/contractor/BidDetails";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBids } from "../../features/bids/bidSlice";

const BidView = () => {
    const [bid, setBid] = useState({});
    const { bidId } = useParams();

    useEffect(() => {
        axiosInstance
            .get(`/contractor/bids/${bidId}`)
            .then((res) => {
                console.log(res);
                setBid(res.data.bid);
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    toast.error("session timeout!");
                    window.location.replace("/login");
                }
            });
    }, []);

    return (
        <div>
            <BidDetails bid={bid} />
        </div>
    );
};

export default BidView;
