import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";


const useDarkMode = () => {
    return useContext(DarkModeContext)
}

export default useDarkMode