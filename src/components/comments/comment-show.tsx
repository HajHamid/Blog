import { FetchCommentsData } from "@/db/queries/comments";
import { Image } from "@nextui-org/react";
import { CommentCreateForm } from "./comment-create-form";

interface CommentShowProps {
    commentId: number;
    comments: FetchCommentsData[];
}

export const CommentShow = ({ commentId, comments }: CommentShowProps) => {
    const comment = comments.find((comment) => comment.id === commentId);

    if (!comment) {
        return null;
    }

    const children = comments.filter(
        (comment) => comment.parentId === commentId
    );

    const renderedChildren = children.map((child) => {
        return (
            <CommentShow
                key={child.id}
                commentId={child.id}
                comments={comments}
            />
        );
    });

    return (
        <div className="p-4 border mt-2 mb-1">
            <div className="flex gap-3">
                <div>
                    <Image
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        alt="use image"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <p className="text-sm font-medium text-gray-500">
                        {comment.user.name ? comment.user.name : comment.user.username}
                    </p>
                    <p className="text-gray-900">{comment.content}</p>

                    <CommentCreateForm
                        postId={comment.postId}
                        parentId={comment.id}
                    />
                </div>
            </div>
            <div className="pl-4">{renderedChildren}</div>
        </div>
    );
};
