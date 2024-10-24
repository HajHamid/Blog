"use server";

import { db } from "@/db";
import paths from "@/paths";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreataCommentState {
    error: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
}

const CreateCommentSchema = z.object({
    content: z.string().min(5),
});

export const CreateComment = async (
    formData: FormData,
    user: User,
    { postId, parentId }: { postId: number; parentId?: number }
): Promise<CreataCommentState> => {
    const result = CreateCommentSchema.safeParse({
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors,
        };
    }

    if (!user) {
        return {
            error: { _form: ["You should login to do this action"] },
        };
    }

    const post = await db.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return { error: { _form: ["Failed to find post"] } };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                userId: user.id,
                parentId: parentId,
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

    revalidatePath(paths.postDetail(post.slug));
    return { error: {}, success: true };
};
