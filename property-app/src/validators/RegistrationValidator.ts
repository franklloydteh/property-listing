import { z } from 'zod';

export const RegistrationValidator = z.object({
    username: z.string()
        .max(64, { message: "Username should not exceed 64 characters." }),
    email: z.string()
        .email()
        .max(64, { message: "Email should not exceed 64 characters." }),
    password: z.string()
        .min(12, { message: "Password should be at least 12 characters." })
        .max(32, { message: "Password should not exceed 32 characters." }),
    repeat_password: z.string(),
    firstName: z.string()
        .max(32, { message: "First Name should not exceed 32 characters." }),
    lastName: z.string()
        .max(32, { message: "Last Name should not exceed 32 characters." }),
    confirm: z.boolean()
}).refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["repeat_password"]
})
