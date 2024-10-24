"use client";

import paths from "@/paths";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Post } from "@prisma/client";
import { BiCheckCircle, BiCommentDetail, BiEditAlt } from "react-icons/bi";

type PostDetailHeaderProps = Post & {
    author: {
        username: string;
        name: string | null;
    };
};

export default function PostDetailHeader({
    post,
}: {
    post: PostDetailHeaderProps;
}) {
    const session = useSession();

    return (
        <div className="flex items-center justify-between border rounded-lg p-2 ">
            <h1 className="font-semibold">{post.title}</h1>
            <div className="flex items-center gap-2">
                {session.data?.user &&
                    session.data.user.id === post.authorId && (
                        <Link
                            className="flex items-center gap-1 text-sm text-center border border-gray-600 py-[4px] px-2 rounded"
                            href={paths.postEdit(post.slug)}
                        >
                            <BiEditAlt />
                            Edit Post
                        </Link>
                    )}
                <BiCommentDetail className="size-6 cursor-pointer" />
                <BiCheckCircle className="size-6 cursor-pointer" />
            </div>
        </div>
    );
}
