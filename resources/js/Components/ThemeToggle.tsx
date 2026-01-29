import { Moon, Sun } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
    mode?: "button" | "icon";
};

export default function ThemeToggle({ mode = "icon" }: ThemeToggleProps) {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle(
                "dark",
                savedTheme === "dark",
            );
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
    };

    const Icon = theme === "dark" ? Sun : Moon;

    if (mode === "icon") {
        return (
            <Button
                variant="default"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 rounded-xl items-center justify-center transition duration-300"
            >
                <Icon className="h-4 w-4" />
            </Button>
        );
    }
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="rounded-2xl px-2"
        >
            <Icon className="h-4 w-4" />
        </Button>
    );
}
