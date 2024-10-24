"use server";

import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { Post } from "@prisma/client";

// const MAX_FILE_SIZE = 1024 * 1024 * 5;
// const ACCEPTED_IMAGE_MIME_TYPES = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
// ];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

interface CreatePostFormState {
    error: {
        title?: string[];
        content?: string[];
        image?: string[];
        category?: string[];
        _form?: string[];
    };
}

const CreatePostSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    // category: z.string().min(3),
    // image: z
    //     .any()
    //     .refine((files) => {
    //         return files?.[0]?.size <= MAX_FILE_SIZE;
    //     }, `Max image size is 5MB.`)
    //     .refine(
    //         (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
    //         "Only .jpg, .jpeg, .png and .webp formats are supported."
    //     ),
});

export const CreatePost = async (
    user: { id: string; username: string },
    formData: FormData
): Promise<CreatePostFormState> => {
    const result = CreatePostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        // category: formData.get("category"),
        // image: formData.get("image"),
    });

    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors,
        };
    }


    if (!user) {
        return { error: { _form: ["You should login to do this action"] } };
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                slug: slugify(result.data.title, { lower: true }),
                author: { connect: { id: user.id } },
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { error: { _form: [e.message] } };
        }
        return {
            error: { _form: ["Something went wrong... please try later"] },
        };
    }

    revalidatePath(paths.postsShow());
    revalidatePath(paths.home());
    redirect(paths.postDetail(post.slug));
};
