import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { loginSchema } from "../../utils/yupSchema";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { togglePasswordVisibility, passwordType } = usePasswordToggle();

    const dispatch = useDispatch();

    const handleLogin = (data) => {
        toast.promise(axios.post("/auth/login", data), {
            loading: "Loading...",
            success: (res) => {
                localStorage.setItem("accessToken", res.data.token);
                dispatch(addUser(res.data.user));
                // setTimeout(() => {
                    if (res.data.role === "Government Authority") {
                        window.location.replace("/authority");
                    }  else if (res.data.role === "Contractor") {
                        window.location.replace("/contractor");
                    } else {
                        window.location.replace("/");
                    }
                // }, 1000);
                return <b>Login success</b>;
            },
            error: (err) => <b>{err.response.data.message}</b>,
        });
    };

    return (
        <div className=" flex justify-center items-center h-screen">
            <form
                className=" flex flex-col gap-[10px] md:gap-2 p-[30px] md:p-[10px] w-[450px] "
                onSubmit={handleSubmit((data) => handleLogin(data))}
            >
                <div className="text-[#151717] font-semibold">
                    <label htmlFor="email">Email </label>
                </div>
                <div className=" flex items-center focus-within:border-[#2d79f3] pl-[10px] transition-all duration-[.2s] ease-in-out  border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px]  ">
                    <svg height="15" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                        <g id="Layer_3" data-name="Layer 3">
                            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                        </g>
                    </svg>
                    <input
                        type="text"
                        {...register("email")}
                        id="email"
                        className="ml-[10px] rounded-md py-1 px-3 border-none w-[80%] outline-none"
                        placeholder="Enter your Email"
                    />
                </div>
                <div className=" h-3 w-full ">
                    {errors.email && <p className=" text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                <div className=" text-[#151717] font-semibold">
                    <label htmlFor="password">Password </label>
                </div>
                <div className="flex items-center focus-within:border-[#2d79f3] pl-[10px] transition-all duration-[.2s] ease-in-out  border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px]   relative">
                    <svg height="15" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                    </svg>
                    <input
                        type={passwordType}
                        {...register("password")}
                        id="cpassword"
                        className=" ml-[10px] rounded-md py-1 px-3 border-none w-[80%] outline-none"
                        placeholder="Enter your Password"
                        autoComplete="password"
                    />
                    <svg
                        onMouseDown={togglePasswordVisibility}
                        onMouseUp={togglePasswordVisibility}
                        className=" absolute right-5 cursor-pointer"
                        viewBox="0 0 576 512"
                        height=".8rem"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                </div>
                <div className=" h-3 w-full ">
                    {errors.password && <p className=" text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                <div className=" text-end">
                    <span className="text-[14px] font-extralight text-blue-500">Forgot password?</span>
                </div>
                <button className=" bg-black text-white rounded-md py-2">Sign In</button>
                <p className=" text-center text-[14px] font-extralight">
                    Don't have an account?{" "}
                    <Link to={"/register"}>
                        <span className="text-blue-500">Sign Up</span>
                    </Link>
                </p>
                <p className=" text-center text-xs font-bold">Or</p>

                <div className=" w-full border rounded-md py-2">
                    <button className=" w-full flex justify-center items-center font-bold gap-3 ">
                        <img width={20} className="auth-icon" src="/assets/google.svg" alt="" />
                        Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
