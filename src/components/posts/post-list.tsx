import PostItem from "./post-item";
import { FetchPostsData } from "@/db/queries/posts";

export const PostList = async ({
    fetchData,
}: {
    fetchData: () => Promise<FetchPostsData[]>;
}) => {
    const posts = await fetchData();

    const postListRenderer = posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
    });

    return postListRenderer;
};
