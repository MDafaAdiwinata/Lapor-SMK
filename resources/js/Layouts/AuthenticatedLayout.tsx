import { PropsWithChildren, ReactNode } from "react";
import { AppSidebar } from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { RefreshCcw } from "lucide-react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface AuthenticatedLayoutProps {
    header?: ReactNode;
    role?: "user" | "admin";
    breadcrumbs?: { label: string; href?: string }[];
    children: ReactNode;
}

export default function AuthenticatedLayout({
    header,
    role = "user",
    breadcrumbs = [],
    children,
}: PropsWithChildren<AuthenticatedLayoutProps>) {
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <SidebarInset>
                {/* Sidebar breadcumb */}
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 m-2 md:m-4">
                    {/* Kiri: Sidebar + Breadcrumb */}
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />

                        {breadcrumbs.length > 0 && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((crumb, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <BreadcrumbItem className="hidden md:block">
                                                {crumb.href ? (
                                                    <BreadcrumbLink
                                                        href={crumb.href}
                                                    >
                                                        {crumb.label}
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {crumb.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>

                                            {index < breadcrumbs.length - 1 && (
                                                <BreadcrumbSeparator className="hidden md:block" />
                                            )}
                                        </div>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>

                    {/* Kanan: Refresh Button */}
                    <div className="pr-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl w-full px-4 flex items-center justify-center"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCcw className="h-4 w-4 transition-transform hover:rotate-180" />
                            <span>Refresh</span>
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 m-2 md:m-4">
                    {header && <div className="mb-4">{header}</div>}
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
