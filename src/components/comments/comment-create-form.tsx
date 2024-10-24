"use client";

import { Button, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import * as actions from "@/actions";
import Alert from "../common/alert";

interface CreataCommentState {
    content?: string[];
    _form?: string[];
}

export const CommentCreateForm = ({
    show,
    postId,
    parentId,
}: {
    show?: boolean;
    postId: number;
    parentId?: number;
}) => {
    const [showForm, setShowForm] = useState(show);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<CreataCommentState | null>(null);

    const session = useSession();
    const ref = useRef<HTMLFormElement | null>(null);

    const handleCreateComment = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        const response = await actions.CreateComment(
            formData,
            session.data?.user,
            { postId, parentId }
        );

        if (response.error) {
            setError(response.error);
        }
        if (response.success) {
            ref.current?.reset();
        }
        setIsLoading(false);
    };

    const content = (
        <div className="space-y-2">
            <Button
                size="sm"
                type="button"
                onClick={() => setShowForm(!showForm)}
            >
                Reply
            </Button>
            {showForm && (
                <form
                    className="space-y-2"
                    onSubmit={handleCreateComment}
                    ref={ref}
                >
                    <div className="flex flex-col gap-2">
                        <Textarea
                            name="content"
                            placeholder="comment"
                            isInvalid={!!error?.content}
                            errorMessage={error?.content}
                        />
                    </div>

                    {error?._form && <Alert danger>{error?._form}</Alert>}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={!session.data?.user || isLoading}
                    >
                        Send
                    </Button>
                </form>
            )}
        </div>
    );

    return content;
};
