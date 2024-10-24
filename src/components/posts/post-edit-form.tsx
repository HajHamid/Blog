"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import Alert from "@/components/common/alert";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Post } from "@prisma/client";

interface CreatePostFormState {
    title?: string[];
    content?: string[];
    image?: string[];
    category?: string[];
    _form?: string[];
}

export default function PostEditForm({ post }: { post: Post }) {
    const session = useSession();

    const [title, setTitle] = useState(post.title || "");
    const [content, setContent] = useState(post.content || "");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<CreatePostFormState | null>(null);

    const handleEditPost = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        const response = await actions.EditPost(
            session.data?.user,
            post.id,
            formData
        );

        if (response?.error) {
            setError(response.error);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleEditPost}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-xs text-gray-500">
                        Title*
                    </label>
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!error?.title}
                        errorMessage={error?.title}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-xs text-gray-500">
                        Content*
                    </label>
                    <Textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        isInvalid={!!error?.content}
                        errorMessage={error?.content}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-xs text-gray-500">
                        Image
                    </label>
                    <Input type="file" name="image" />
                </div>
            </div>

            {error?._form && <Alert>{error?._form.join(", ")}</Alert>}

            <Button
                type="submit"
                color="primary"
                className="mt-4"
                isLoading={isLoading}
                isDisabled={!session.data?.user || isLoading}
            >
                Update
            </Button>
        </form>
    );
}
