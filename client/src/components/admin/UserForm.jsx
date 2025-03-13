import { useState } from "react";
import ContractorRegister from "../../pages/contractor/ContractorRegister";
import Register from "../../pages/user/Register";
import GovernmentAuthorityForm from "../../pages/authority/GovernmentAuthorityForm";
// import ContractorRegister from "../../pages/contractor/ContractorRegister";
// import CitizenRegister from "../../pages/citizen/CitizenRegister"; // Import CitizenRegister component
// import GovernmentAuthorityForm from "../../pages/government/GovernmentAuthorityForm"; // Import GovernmentAuthorityForm component
// import AdminRegister from "../../pages/admin/AdminRegister"; // Import AdminRegister component

const UserForm = () => {
    const [role, setRole] = useState("Citizen");

    const renderFormByRole = () => {
        switch (role) {
            case "Contractor":
                return <ContractorRegister />;
            case "Citizen":
                return <Register border={true} />;
            case "Government Authority":
                return <GovernmentAuthorityForm />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="breadcrumbs text-sm px-5 py-4  bg-white w-full">
                <ul>
                    <li>
                        <a href="/admin/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Users</a>
                    </li>
                    <li>Add User</li>
                </ul>
            </div>
            <form
                className="space-y-4 flex flex-col py-20 p-5 bg-cover bg-center min-h-full"
                style={{
                    backgroundImage:
                        "url(https://img.freepik.com/free-photo/blue-office-stationery-set-with-laptop_23-2147843325.jpg?semt=ais_incoming)",
                }}
            >
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
                    <option value="Citizen">Citizen</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Government Authority">Government Authority</option>
                </select>

                {renderFormByRole()}
            </form>
        </div>
    );
};

export default UserForm;
