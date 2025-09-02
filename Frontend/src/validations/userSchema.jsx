import { object, string } from "yup";

export const loginSchema = object({
    email: string().email("Invalid email format").required("Email is required"),
    password: string().required("Password is required"),
});

export const resetPasswordSchema = object({
    email: string().email("Invalid email format").required("Email is required"),
})

export const registerSchema = object({
    name: string().required("Name is required"),
    surname: string().required("Surname is required"),
    email: string().email("Invalid email format").required("Email is required"),
    password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: string().oneOf(["Admin", "It", "Employee"], "Invalid role").required("Role is required"),
})