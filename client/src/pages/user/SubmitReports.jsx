import React, { useState } from "react";
import GoogleMapComponent from "../../components/user/GoogleMapComponent";
import ReportForm from "../../components/user/ReportForm";

const SubmitReports = () => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState(null);

    return (
        <div className=" w-full  min-h-screen flex flex-col md:flex-row  ">
            <div className=" flex-1 ">
                <GoogleMapComponent markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} setAddress={setAddress} />
            </div>
            <div className=" flex-1  ">
                <ReportForm location={markerPosition} address={address} />
            </div>
        </div>
    );
};

export default SubmitReports;
