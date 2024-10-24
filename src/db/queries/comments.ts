import { db } from "..";
import { Comment } from "@prisma/client";

export type FetchCommentsData = Comment & {
    user: { name: string | null; username: string };
};

export const fetchCommentsByPostId = (
    postId: number
): Promise<FetchCommentsData[]> => {
    return db.comment.findMany({
        where: { postId },
        include: { user: { select: { name: true, username: true } } },
    });
};
