import PostCreateForm from "@/components/posts/post-create-form";
import { Divider } from "@nextui-org/react";

export default function PostCreatePage() {
    return (
        <div className="">
            <h1 className="font-bold text-xl">Create Post</h1>
            <Divider className="my-4" />
            <PostCreateForm />
        </div>
    );
}
