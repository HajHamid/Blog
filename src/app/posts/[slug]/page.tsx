import { db } from "@/db";
import { notFound } from "next/navigation";
import PostDetailHeader from "@/components/posts/post-detail-header";
import { RelatedPosts } from "@/components/posts/related-posts";
import { fetchRelatedPosts } from "@/db/queries/posts";
import { PostDetailBody } from "@/components/posts/post-detail-body";
import { CommentCreateForm } from "@/components/comments/comment-create-form";
import { CommentsList } from "@/components/comments/comments-list";
import { fetchCommentsByPostId } from "@/db/queries/comments";

export default async function PostDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params.slug;

    const post = await db.post.findUnique({
        where: { slug },
        include: { author: { select: { name: true, username: true } } },
    });

    if (!post) {
        return notFound();
    }

    return (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3 space-y-4 ">
                <PostDetailHeader post={post} />
                <PostDetailBody post={post} />

                <CommentCreateForm postId={post.id} />
                <CommentsList fetchData={() => fetchCommentsByPostId(post.id)} />
            </div>

            <div className="col-span-2">
                <RelatedPosts fetchData={() => fetchRelatedPosts(post.id)} />
            </div>
        </div>
    );
}
