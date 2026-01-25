import { Moon, Sun } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
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

    return (
        <Button
            variant="default"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    );
}
