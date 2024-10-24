import { Post } from "@prisma/client";
import RelatedPostItem from "./related-posts-item";

export const RelatedPosts = async ({
    fetchData,
}: {
    fetchData: () => Promise<Post[]>;
}) => {
    const posts = await fetchData();

    const relatedPostsRenderer = posts.map((post) => {
        return <RelatedPostItem key={post.id} post={post} />;
    });

    return (
        <div className="flex flex-col gap-4 ">
            <div className="border rounded-lg p-2">
                <h2>Related Posts</h2>
            </div>

            {relatedPostsRenderer}
        </div>
    );
};
