import { Link } from "@inertiajs/react";
import { Logo, LogoIcon } from "@/Components/logo";
import { GalleryVerticalEnd, Menu, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
    { name: "Beranda", href: "#link" },
    { name: "Tentang", href: "#link" },
    { name: "Fitur Sistem", href: "#link" },
    { name: "Kontak", href: "#link" },
];

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header>
            <nav className="fixed z-20 w-full px-2">
                <div
                    className={cn(
                        "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
                        isScrolled &&
                            "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center"
                            >
                                <span className="font-bold text-lg">
                                    Lapor SMK
                                </span>
                            </Link>

                            <button
                                data-state={menuState && "active"}
                                onClick={() => setMenuState(!menuState)}
                                aria-label={
                                    menuState == true
                                        ? "Close Menu"
                                        : "Open Menu"
                                }
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            data-state={menuState ? "active" : "inactive"}
                            className="bg-background hidden data-[state=active]:block lg:flex mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
                        >
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground text-center block duration-150"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">
                                {/* Theme Toggle */}
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="px-2"
                                    asChild
                                >
                                    <ThemeToggle mode="button" />
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && "lg:hidden")}
                                >
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && "lg:hidden")}
                                >
                                    <Link href="/register">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(
                                        isScrolled
                                            ? "lg:inline-flex"
                                            : "hidden",
                                    )}
                                >
                                    <Link href="/login">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
