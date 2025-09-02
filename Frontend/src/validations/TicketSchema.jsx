import { object, string } from "yup";

export const createTicketSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    priorty: string().oneOf(["Low", "Medium", "High"], "Invalid Priorty"),
    category: string().oneOf(["Hardware", "Software", "Network", "Other"], "Invalid Category")
})