import { Post } from "@prisma/client";
import { db } from "..";

export type FetchPostsData = Post & {
    _count: { comments: number };
};

export const fetchPosts = (): Promise<FetchPostsData[]> => {
    const posts = db.post.findMany({
        include: { _count: { select: { comments: true } } },
    });
    return posts;
};

export const fetchRelatedPosts = (postId: number): Promise<Post[]> => {
    const posts = db.post.findMany({
        where: {
            id: { not: postId },
        },
    });
    return posts;
};
