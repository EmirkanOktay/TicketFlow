import { createContext, useState } from "react";

export const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const drawerWidth = open ? 240 : 60;
    const logoWidth = open ? 26 : 5;

    return (
        <LogoContext.Provider value={{ open, setOpen, drawerWidth, logoWidth }}>
            {children}
        </LogoContext.Provider>
    );
};

