import {z} from "zod";

export const UserSchema = z.object({
    name : z.string(),
    email : z.string().email().min(5).max(10),
    password : z.string().min(10).max(20),
});

export const AuthSchema = z.object({
    email : z.string().email().min(5).max(10),
    password : z.string().min(10).max(20),
})

export const room = z.object({
    name : z.string(),
    adminId : z.string()
});



