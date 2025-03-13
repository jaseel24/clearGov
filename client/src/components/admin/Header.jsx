import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const Header = () => {

    const handleLogout = () => {
        axiosInstance
            .delete("/auth/logout")
            .then((res) => {
                toast.error(res.data.message);
                window.location.replace("/admin");
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className=" bg-gray-50 w-full h-fit">
            <div className=" flex px-2 py-2  items-center justify-between">
                <h1 className=" font-bold text-2xl">Admin Dashboard</h1>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" ">
                        <div className="avatar">
                            <div className=" w-14 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                        <li onClick={handleLogout}>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
