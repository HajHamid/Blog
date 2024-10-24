import { FetchPostsData } from "@/db/queries/posts";
import paths from "@/paths";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import Link from "next/link";

export default function PostItem({ post }: { post: FetchPostsData }) {
    return (
        <Card className="pb-4">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={270}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2 space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <Chip color="warning" size="sm" className="capitalize">category</Chip>
                        <small className="text-default-500">
                            {post._count.comments} comments
                        </small>
                    </div>
                    <Link href={paths.postDetail(post.slug)}>
                        <h4 className="font-bold text-large">{post.title}</h4>
                    </Link>
                    <p className="text-sm text-justify text-gray-700">
                        {post.content.slice(0, 100)}...
                    </p>
                </div>

                <Link
                    href={paths.postDetail(post.slug)}
                    className="p-2 bg-blue-600 text-white rounded-xl w-1/2 text-center text-sm"
                >
                    View
                </Link>
            </CardBody>
        </Card>
    );
}
