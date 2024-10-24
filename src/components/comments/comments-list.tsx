import { FetchCommentsData } from "@/db/queries/comments";
import { CommentShow } from "./comment-show";

export const CommentsList = async ({
    fetchData,
}: {
    fetchData: () => Promise<FetchCommentsData[]>;
}) => {
    const comments = await fetchData();

    const topLevelComments = comments.filter((comment) => !comment.parentId);

    const renderedComments = topLevelComments.map((comment) => {
        return (
            <CommentShow
                key={comment.id}
                commentId={comment.id}
                comments={comments}
            />
        );
    });
    return (
        <div>
            <h2 className="font-semibold text-lg">
                All {comments.length} comments
            </h2>
            {renderedComments}
        </div>
    );
};
