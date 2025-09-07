import { useContext } from "react";
import { LogoContext } from "../context/LogoContext";

const useLogo = () => {
    return useContext(LogoContext);
};

export default useLogo;
