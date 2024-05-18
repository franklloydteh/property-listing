import { z } from 'zod';

export const LoginValidator = z.object({
    identifier: z.string()
        .min(1, { message: "Required." })
        .max(64, { message: "Username or Email should not exceed 64 characters." }),
    password: z.string()
        .min(1, { message: "Required." })
        .max(32, { message: "Password should not exceed 32 characters." })
});
