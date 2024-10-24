"use server";

import { db } from "@/db";
import { User } from "@prisma/client";
import { z } from "zod";

interface SignUpState {
    error: {
        username?: string[];
        password?: string[];
        fullname?: string[];
        _form?: string[];
    };
    success?: boolean;
    user?: User;
}

interface RegisterProps {
    username: string;
    password: string;
    fullname: string;
}

const signUpUserSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username should have at least 4 characters" }),
    password: z
        .string()
        .min(6, { message: "Password should have at least 6 characters" }),
    fullname: z
        .string()
        .min(3, { message: "Full Name should have at least 3 characters" }),
});

export const Register = async ({
    username,
    password,
    fullname
}: RegisterProps): Promise<SignUpState> => {
    const result = signUpUserSchema.safeParse({
        username,
        password,
        fullname
    });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors, success: false };
    }

    const isExist = await db.user.findFirst({
        where: {
            username: result.data.username,
        },
    });

    if (isExist) {
        return {
            error: { username: ["username is already exists"] },
            success: false,
        };
    }
    let user;
    try {
        user = await db.user.create({
            data: {
                username: result.data.username,
                name: result.data.fullname,
                hashedPassword: result.data.password,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { error: { _form: [e.message] } };
        }
    }

    return { error: {}, success: true, user };
};
