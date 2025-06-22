import {z} from "zod";

export const UserSchema = z.object({
    name : z.string().optional(),
    email : z.string().email().min(5),
    password : z.string().min(8),
});

export const AuthSchema = z.object({
    email : z.string().email(),
    password : z.string().min(5).max(20),
})

export const room = z.object({
    id : z.string().optional(),
    name : z.string(),
    adminId : z.string()
});



