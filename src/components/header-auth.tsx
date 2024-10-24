"use client";

import {
    NavbarItem,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Divider,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Link from "next/link";
import paths from "@/paths";
import { BiPlus } from "react-icons/bi";

export default function HeaderAuth() {
    const session = useSession();

    let content;
    if (session.status === "loading") {
        content = null;
    } else if (session.data?.user) {
        content = (
            <>
                <NavbarItem>
                    <Link
                        href={paths.postCreate()}
                        className="bg-blue-600 px-2 py-1 text-sm border border-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                        <BiPlus />
                        Create Post
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Popover>
                        <PopoverTrigger>
                            <div className="cursor-pointer">
                                Hello{" "}
                                <b>
                                    {session.data.user.username.toUpperCase()}
                                </b>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="p-2 rounded">
                                <div className="flex flex-col">
                                    <Link
                                        href="/profile"
                                        className="flex items-center"
                                    >
                                        Profile
                                    </Link>
                                    <Divider className="my-2" />
                                    <Button
                                        onClick={() => signOut()}
                                        color="danger"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </>
        );
    } else {
        content = (
            <>
                <LoginForm />
                <RegisterForm />
            </>
        );
    }

    return content;
}
