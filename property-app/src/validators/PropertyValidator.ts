import { z } from 'zod';

export const PropertyValidator = z.object({
    description: z.string()
        .min(1, { message: "Description is required." })
        .max(1000, { message: "Description should not exceed 1000 characters." }),
    price: z.number()
        .min(1, "Invalid Price")
        .max(9000000000000000, "Price is too high."),
    category: z.enum(['House', 'Apartment', 'Building', 'Storage Room', 'Land']),
    area: z.number()
        .min(1, "Invalid Area")
        .max(9000000000000000, "Area is too big."),
    bedrooms: z.number()
        .min(0, "Invalid number")
        .max(9000000000000000, "Too Many Bedrooms."),
    bathrooms: z.number()
        .min(0, "Invalid number")
        .max(9000000000000000, "Too Many Bathrooms."),
    parking: z.number()
        .min(0, "Invalid number")
        .max(9000000000000000, "Too Many Parking."),

    street: z.string()
        .min(1, { message: "Street is Required." })
        .max(100, { message: "Street should not exceed 100 characters." }),
    city: z.string()
        .min(1, { message: "City is Required." })
        .max(100, { message: "City should not exceed 100 characters." }),
    region: z.string()
        .min(1, { message: "Region or State is Required." })
        .max(100, { message: "Region or State should not exceed 100 characters." }),
    zipCode: z.number()
        .min(1, "Invalid Zip Code")
        .max(9000000000000000, "Invalid Zip Code"),
    country: z.enum(['Spain', 'Philippines'])
})