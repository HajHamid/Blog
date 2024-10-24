"use client";

import {
    NavbarItem,
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";


export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        const formData = new FormData(e.target as HTMLFormElement);

        if (!formData.get("username") || !formData.get("password")) {
            return null;
        }

        const response = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });

        if (response && !response.ok) {
            setLoginError(response?.error);
        }
        setIsLoading(false)
    };

    return (
        <NavbarItem className="hidden lg:flex">
            <Popover>
                <PopoverTrigger>
                    <Button color="default" variant="bordered">
                        Login
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4 rounded justify-center">
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-4">
                                <h2 className="font-semibold text-lg text-center">
                                    Login
                                </h2>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                />

                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    autoComplete="current password"
                                />

                                {loginError && (
                                    <div className="bg-red-200 text-red-600 border-red-600 rounded p-2">
                                        Credentials are not valid
                                    </div>
                                )}

                                <Button type="submit" isLoading={isLoading}>
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </NavbarItem>
    );
}
