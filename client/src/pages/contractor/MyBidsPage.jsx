import React, { useEffect, useState } from "react";
import MyBids from "../../components/contractor/MyBids";
import axiosInstance from "../../config/axios.config";
import { setBids } from "../../features/bids/bidSlice";
import { useDispatch } from "react-redux";

const MyBidsPage = () => {
    // const [bids, setBids] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        axiosInstance
            .get("/contractor/bids")
            .then((res) => {
                console.log(res);
                dispatch(setBids(res.data.bids));
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    window.location.replace("/login");
                }
            });
    }, []);

    return (
        <div>
            <MyBids />
        </div>
    );
};

export default MyBidsPage;
