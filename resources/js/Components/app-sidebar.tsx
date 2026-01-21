import * as React from "react";
import {
    FileText,
    Home,
    History,
    User,
    Users,
    CheckCircle,
    Settings2,
    PieChart,
    GalleryVerticalEnd,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";

// Data untuk User/Siswa
const userNavData = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Buat Laporan",
            url: "/laporan/create",
            icon: FileText,
            items: [
                {
                    title: "Form Laporan",
                    url: "/laporan/create",
                },
                {
                    title: "Draft Laporan",
                    url: "/laporan/draft",
                },
            ],
        },
        {
            title: "Riwayat Laporan",
            url: "/laporan/history",
            icon: History,
            items: [
                {
                    title: "Semua Laporan",
                    url: "/laporan/history",
                },
                {
                    title: "Menunggu",
                    url: "/laporan/history?status=pending",
                },
                {
                    title: "Diproses",
                    url: "/laporan/history?status=processing",
                },
                {
                    title: "Selesai",
                    url: "/laporan/history?status=completed",
                },
            ],
        },
    ],
};

// Data untuk Admin
const adminNavData = {
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Kelola Laporan",
            url: "/admin/laporan",
            icon: FileText,
            items: [
                {
                    title: "Semua Laporan",
                    url: "/admin/laporan",
                },
                {
                    title: "Menunggu Verifikasi",
                    url: "/admin/laporan?status=pending",
                },
                {
                    title: "Sedang Diproses",
                    url: "/admin/laporan?status=processing",
                },
                {
                    title: "Selesai",
                    url: "/admin/laporan?status=completed",
                },
                {
                    title: "Ditolak",
                    url: "/admin/laporan?status=rejected",
                },
            ],
        },
        {
            title: "Manajemen User",
            url: "/admin/users",
            icon: Users,
            items: [
                {
                    title: "Semua User",
                    url: "/admin/users",
                },
                {
                    title: "Siswa",
                    url: "/admin/users?role=student",
                },
                {
                    title: "Admin",
                    url: "/admin/users?role=admin",
                },
            ],
        },
    ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    role?: "user" | "admin";
}

// Komponen Header yang menggunakan useSidebar hook
function SidebarHeaderContent({ role }: { role: "user" | "admin" }) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <div
            className={`flex items-center gap-2 py-3 transition-all duration-200 ${
                isCollapsed ? "px-0 justify-center" : "px-4"
            }`}
        >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
            </div>
            {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold">Lapor SMK</span>
                    <span className="truncate text-xs text-muted-foreground">
                        {role === "admin" ? "Admin Panel" : "Portal Siswa"}
                    </span>
                </div>
            )}
        </div>
    );
}

export function AppSidebar({ role = "user", ...props }: AppSidebarProps) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    // Pilih data berdasarkan role
    const data = role === "admin" ? adminNavData : userNavData;

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* Header, Logo Web */}
            <SidebarHeader>
                <SidebarHeaderContent role={role} />
            </SidebarHeader>

            {/* NAVIGATION MENU */}
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>

            {/* USER INFO & DROPDOWN */}
            <SidebarFooter>
                <NavUser
                    user={{
                        nama_user: user.nama_user,
                        email: user.email,
                        avatar: `/avatars/${user.id}.jpg`,
                    }}
                />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
