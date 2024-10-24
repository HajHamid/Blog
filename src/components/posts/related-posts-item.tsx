import React from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Post } from "@prisma/client";
import { BiCheckCircle } from "react-icons/bi";
// import { HeartIcon } from "./HeartIcon";
// import { PauseCircleIcon } from "./PauseCircleIcon";
// import { NextIcon } from "./NextIcon";
// import { PreviousIcon } from "./PreviousIcon";
// import { RepeatOneIcon } from "./RepeatOneIcon";
// import { ShuffleIcon } from "./ShuffleIcon";

export default function RelatedPostItem({ post }: { post: Post }) {
    return (
        <Card
            isBlurred
            className="border bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            shadow="md"
                            src="https://nextui.org/images/album-cover.png"
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">
                                    category
                                </h3>
                                <p className="text-small text-foreground/80">
                                    12 comments
                                </p>
                                <h1 className="text-large font-medium mt-2">
                                    {post.title}
                                </h1>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                            >
                                <BiCheckCircle size={24} />
                                {/* <HeartIcon
                                    className={
                                        liked
                                            ? "[&>path]:stroke-transparent"
                                            : ""
                                    }
                                    fill={liked ? "currentColor" : "none"}
                                /> */}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
