import { useState } from "react";

const usePasswordToggle = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };
    const toggleCPasswordVisibility = () => {
        setIsCPasswordVisible((prevState) => !prevState);
    };

    const passwordType = isPasswordVisible ? "text" : "password";
    const cPasswordType = isCPasswordVisible ? "text" : "password";

    return { passwordType, cPasswordType, togglePasswordVisibility , toggleCPasswordVisibility };
};

export default usePasswordToggle;
