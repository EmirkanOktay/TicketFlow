import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [openDarkMode, setOpenDarkMode] = useState(false);

    const handleDarkMode = () => {
        setOpenDarkMode(!openDarkMode);
    };
    useEffect(() => {
        document.body.className = openDarkMode ? "dark" : "light";
    }, [openDarkMode]);
    return (
        <DarkModeContext.Provider value={{ openDarkMode, handleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
