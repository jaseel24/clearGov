import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import QuerryResults from "../../components/tender/QuerryResults";

const SearchResults = () => {
    const { searchQuerry } = useParams();
    const [tenders, setTenders] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/tender/tenders")
            .then((res) => {
                console.log(res.data);
                setTenders(res.data.tenders);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <QuerryResults tenders={tenders} searchQuerry={searchQuerry} />
        </div>
    );
};

export default SearchResults;
