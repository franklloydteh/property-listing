import { z } from 'zod';

const phoneRegex = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
);

export const ProfileValidator = z.object({
    firstName: z.string()
        .min(1, { message: "First Name is required." })
        .max(32, { message: "First Name should not exceed 32 characters." }),
    lastName: z.string()
        .max(32, { message: "Last Name should not exceed 32 characters." }),
    introduction: z.string()
        .max(1000, { message: "Introduction is limited to 1000 characters." })
        .optional(),
    mobile: z.string()
        .regex(phoneRegex, { message: "Invalid Mobile Number" })
        .nullish(),
    city: z.string()
        .min(1, { message: "City is required." })
        .max(32, { message: "City can only contain a maximum of 32 characters." })
        .nullish(),
    country: z.string()
        .min(1, { message: "Country is required." })
        .max(32, { message: "Country can only contain a maximum of 32 characters." })
        .nullish(),
})