import { useState } from "react";
import { tenderFormSchema } from "../../utils/yupSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingEffect/LoadingSpinner";

const CreateTender = ({ projects }) => {
    const [covers, setCovers] = useState([""]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addCover = () => {
        setCovers([...covers, ""]);
    };

    const removeCover = (index) => {
        const updatedCovers = [...covers];
        updatedCovers.splice(index, 1);
        setCovers(updatedCovers);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(tenderFormSchema),
    });

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance
            .post("/tender/tender", data)
            .then((res) => {
                setLoading(false);
                toast.success("Tender created!");
                navigate("/authority");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    return (
        <div className="mx-auto p-6 sm:p-10 md:p-20 bg-white ">
            {loading && <LoadingSpinner />}
            <h1 className="text-2xl font-bold mb-4">Tender Submission Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Organisation Chain */}
                <div>
                    <label className="block text-sm font-medium">Organisation Chain</label>
                    <input
                        {...register("organisationChain")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.organisationChain && (
                        <span className="text-red-500 text-sm">{errors.organisationChain.message}</span>
                    )}
                </div>
                {/* Project */}
                <div>
                    <label className="block text-sm font-medium">Select Project</label>
                    <select {...register("project")} className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.projectScope}
                            </option>
                        ))}
                    </select>
                    {errors.project && <span className="text-red-500 text-sm">{errors.project.message}</span>}
                </div>

                {/* Tender Category */}
                <div>
                    <label className="block text-sm font-medium">Tender Category</label>
                    <select
                        {...register("tenderCategory")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Works">Works</option>
                        <option value="Goods">Goods</option>
                        <option value="Services">Services</option>
                        <option value="Consultancy">Consultancy</option>
                    </select>
                    {errors.tenderCategory && (
                        <span className="text-red-500 text-sm">{errors.tenderCategory.message}</span>
                    )}
                </div>

                {/* Tender Location */}
                <div>
                    <label className="block text-sm font-medium">Tender Location</label>
                    <input
                        {...register("tenderLocation")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.tenderLocation && (
                        <span className="text-red-500 text-sm">{errors.tenderLocation.message}</span>
                    )}
                </div>

                {/* Payment Mode */}
                <div>
                    <label className="block text-sm font-medium">Payment Mode</label>
                    <select
                        {...register("paymentMode")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                    {errors.paymentMode && <span className="text-red-500 text-sm">{errors.paymentMode.message}</span>}
                </div>

                <fieldset className="p-4 border border-gray-200 rounded-lg">
                    <legend className="text-lg font-semibold">Covers</legend>

                    {covers.map((cover, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <input
                                {...register(`covers[${index}]`)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder={`Cover ${index + 1}`}
                            />
                            {errors.covers && errors.covers[index] && (
                                <span className="text-red-500 text-sm">{errors.covers[index].message}</span>
                            )}

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeCover(index)}
                                    className=" text-red-500 p-2 rounded hover:bg-red-700"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addCover}
                        className="mt-2 bg-blue-950 text-white p-2 rounded hover:bg-green-700"
                    >
                        Add Cover
                    </button>
                </fieldset>

                <div>
                    <label className="block text-sm font-medium">Tender Fee</label>
                    <input
                        type="number"
                        {...register("tenderFee")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors?.tenderFee && <span className="text-red-500 text-sm">{errors?.tenderFee.message}</span>}
                </div>

                {/* Work Item Details */}
                <fieldset className="p-4 border border-gray-200 rounded-lg">
                    <legend className="text-lg font-semibold">Work Item Details</legend>

                    <div>
                        <label className="block text-sm font-medium">Work Title</label>
                        <input
                            {...register("workItemDetails.title")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.workItemDetails?.title && (
                            <span className="text-red-500 text-sm">{errors.workItemDetails.title.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Work Description</label>
                        <textarea
                            {...register("workItemDetails.description")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.workItemDetails?.description && (
                            <span className="text-red-500 text-sm">{errors.workItemDetails.description.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tender Value</label>
                        <input
                            type="number"
                            {...register("workItemDetails.tenderValue")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.workItemDetails?.tenderValue && (
                            <span className="text-red-500 text-sm">{errors.workItemDetails.tenderValue.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Location</label>
                        <input
                            {...register("workItemDetails.location")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.workItemDetails?.location && (
                            <span className="text-red-500 text-sm">{errors.workItemDetails.location.message}</span>
                        )}
                    </div>
                </fieldset>

                {/* Critical Dates */}
                <fieldset className="p-4 border border-gray-200 rounded-lg">
                    <legend className="text-lg font-semibold">Critical Dates</legend>

                    <div>
                        <label className="block text-sm font-medium">Bid Opening Date</label>
                        <input
                            type="date"
                            {...register("criticalDates.bidOpeningDate")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.criticalDates?.bidOpeningDate && (
                            <span className="text-red-500 text-sm">{errors.criticalDates.bidOpeningDate.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Bid Submission End Date</label>
                        <input
                            type="date"
                            {...register("criticalDates.bidSubmissionEndDate")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.criticalDates?.bidSubmissionEndDate && (
                            <span className="text-red-500 text-sm">
                                {errors.criticalDates.bidSubmissionEndDate.message}
                            </span>
                        )}
                    </div>
                </fieldset>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-700">
                    Submit Tender
                </button>
            </form>
        </div>
    );
};

export default CreateTender;
