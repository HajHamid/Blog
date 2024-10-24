import { fetchPosts } from "@/db/queries/posts";
import { PostList } from "@/components/posts/post-list";

export default function Home() {
    return (
        <div>
            Home Page
            <div className="grid grid-cols-4 gap-2">
                <PostList fetchData={fetchPosts} />
            </div>
        </div>
    );
}
