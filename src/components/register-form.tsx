"use client";

import {
    NavbarItem,
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

interface RegisterErrorProps {
    username?: string[];
    password?: string[];
    fullname?: string[];
    _form?: string[];
}

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    const [registerError, setRegisterError] =
        useState<RegisterErrorProps | null>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        const response = await actions.Register({
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            fullname: formData.get("fullname") as string,
        });

        if (response.error) {
            setRegisterError(response.error);
        }

        if (response.success && response.user) {
            await signIn("credentials", {
                username: response.user.username,
                password: response.user.hashedPassword,
                redirect: false,
            });
        }

        setIsLoading(false);
    };

    return (
        <NavbarItem>
            <Popover>
                <PopoverTrigger>
                    <Button color="primary" variant="bordered">
                        Register
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4 rounded justify-center">
                        <form onSubmit={handleRegister}>
                            <div className="flex flex-col gap-4">
                                <h2 className="font-semibold text-lg text-center">
                                    Register
                                </h2>
                                <Input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    isInvalid={!!registerError?.fullname}
                                    errorMessage={registerError?.fullname?.join(
                                        ", "
                                    )}
                                />
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    isInvalid={!!registerError?.username}
                                    errorMessage={registerError?.username?.join(
                                        ", "
                                    )}
                                />

                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current password"
                                    isInvalid={!!registerError?.password}
                                    errorMessage={registerError?.password?.join(
                                        ", "
                                    )}
                                />

                                <Button
                                    type="submit"
                                    color="primary"
                                    isLoading={isLoading}
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </NavbarItem>
    );
}
