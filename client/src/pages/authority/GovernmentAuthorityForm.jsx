import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { authorityRegisterSchema } from "../../utils/yupSchema";

const GovernmentAuthorityForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(authorityRegisterSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post("/auth/register", {
                ...data,
                role: "Government Authority",
            });
            console.log("User registered successfully:", response.data);
            reset();
            toast.success("Rgistration success!");
            window.location.replace("/login");
        } catch (error) {
            console.error("Error during registration:", error.response.data);
            toast.error(error.response.data.message);
            reset();
        }
    };

    return (
        <div className=" px-10 mx-auto p-5 m-10 bg-white rounded-lg ">
            <h2 className="text-2xl font-semibold text-center mb-4">Government Authority Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        type="text"
                        {...register("username")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors?.username ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors?.email ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        {...register("phoneNumber")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors.phoneNumber ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                        {...register("address")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <input
                        type="text"
                        {...register("department")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors.department ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <input
                        type="text"
                        {...register("position")}
                        className={`w-full p-2 border rounded outline-none ${
                            errors.position ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default GovernmentAuthorityForm;
