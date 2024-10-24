import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
} from "@nextui-org/react";
import HeaderAuth from "./header-auth";

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <Link href="/">
                    <p className="font-bold text-inherit">Logo</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Input type="search" placeholder="search" />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    );
}
