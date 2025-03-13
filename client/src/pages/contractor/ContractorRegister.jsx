import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contractorRegisterSchema } from "../../utils/yupSchema";
import toast from "react-hot-toast";
import axios from "../../config/axios.config";

const ContractorRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(contractorRegisterSchema),
    });

    const handleSubmitForm = (data) => {
        try {
            toast.promise(axios.post("/auth/register", { ...data, role: "Contractor" }), {
                loading: "Registering...",
                success: (res) => {
                    window.location.replace("/login");
                    console.log(res);
                    return <b>Registration success</b>;
                },
                error: (err) => <b>{err.response.data.message}</b>,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#adb903]">
                Online Enrollment of Corporate/Bidder
            </h2>

            <form onSubmit={handleSubmit((data) => handleSubmitForm(data))} className=" p-3 mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium">Username *</label>
                    <input
                        type="text"
                        {...register("username")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className="text-red-500 text-xs">{errors.username && errors.username.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email *</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className="text-red-500 text-xs">{errors.email && errors.email.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password *</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className="text-red-500 text-xs">{errors.password && errors.password.message}</p>
                </div>

                {/* Company Details */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Company Name *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.companyName")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.companyName &&
                            errors.contractorOrBidderDetails.companyName.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Licence Holder Name *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.licenceHolderName")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.licenceHolderName &&
                            errors.contractorOrBidderDetails.licenceHolderName.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Registration Number *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.registrationNumber")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.registrationNumber &&
                            errors.contractorOrBidderDetails.registrationNumber.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Registered Address *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.registeredAddress")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.registeredAddress &&
                            errors.contractorOrBidderDetails.registeredAddress.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">City *</label>
                    <input
                        type="text"
                        name="city"
                        {...register("contractorOrBidderDetails.city")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.city && errors.contractorOrBidderDetails.city.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">State *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.state")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.state && errors.contractorOrBidderDetails.state.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Postal Code *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.postalCode")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.postalCode &&
                            errors.contractorOrBidderDetails.postalCode.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">PAN Number *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.panNumber")}
                        pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.panNumber &&
                            errors.contractorOrBidderDetails.panNumber.message}
                    </p>

                    <small className="text-gray-500">PAN number must have 10 characters. For example: AESTG2458A</small>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-3 text-red-900">Contact Details</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Title *</label>
                    <select
                        {...register("contractorOrBidderDetails.contactDetails.title")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    >
                        <option value="">-- Select --</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                    </select>
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.contactDetails?.title &&
                            errors.contractorOrBidderDetails?.contactDetails?.title.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Contact Name *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.contactDetails.contactName")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.contactDetails?.contactName &&
                            errors.contractorOrBidderDetails.contactDetails.contactName.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Date of Birth *</label>
                    <input
                        type="date"
                        {...register("contractorOrBidderDetails.contactDetails.contactDOB")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2 "
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.contactDetails?.contactDOB &&
                            errors.contractorOrBidderDetails?.contactDetails.contactDOB.message}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Phone Number *</label>
                    <input
                        type="text"
                        {...register("contractorOrBidderDetails.contactDetails.contactPhoneNumber")}
                        className="border rounded-md border-blue-500 outline-none mt-1 focus:border-green-700 w-full p-2"
                    />
                    <p className=" text-red-500 text-xs">
                        {errors.contractorOrBidderDetails?.contactDetails?.contactPhoneNumber &&
                            errors.contractorOrBidderDetails?.contactDetails.contactPhoneNumber.message}
                    </p>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 w-full py-2 rounded-md">
                    Register
                </button>
            </form>
        </div>
    );
};

export default ContractorRegister;
