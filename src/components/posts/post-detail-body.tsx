import { Image } from "@nextui-org/react";
import { BiCalendar, BiUser } from "react-icons/bi";
import WordPress from "@/assets/wordpress.png";
import { Post } from "@prisma/client";

type PostDetailBodyProps = Post & {
    author: {
        username: string;
        name: string | null;
    };
};

export const PostDetailBody = ({ post }: { post: PostDetailBodyProps }) => {
    const author = !post.author.name ? post.author.username : post.author.name;
    return (
        <div className="flex flex-col gap-4">
            <Image
                src={WordPress.src}
                alt="post cover image"
                radius="md"
                removeWrapper={true}
            />
            <div className="flex items-center justify-between gap-2 text-sm border rounded-lg p-2">
                <div className="flex items-center gap-2">
                    <BiUser />
                    <span className="capitalize font-semibold text-sm">
                        {author}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <BiCalendar />
                    <span>{post.updatedAt.toLocaleDateString()}</span>
                </div>
            </div>
            <div className="p-4 rounded-lg border">
                <p>{post.content}</p>
            </div>
        </div>
    );
};
