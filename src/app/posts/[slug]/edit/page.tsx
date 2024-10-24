import { db } from "@/db";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import PostEditForm from "@/components/posts/post-edit-form";

export default async function PostCreatePage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

    const post = await db.post.findUnique({
        where: { slug },
    });

    if (!post) {
        return notFound()
    }



    return (
        <div className="">
            <h1 className="font-bold text-xl">Edit Post - {post.title}</h1>
            <Divider className="my-4" />
            <PostEditForm post={post} />
        </div>
    );
}
