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
    ChartBarStacked
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
            url: route('laporans.create'),
            icon: FileText,
            isActive: true,
        },
        {
            title: "Riwayat Laporan",
            url: route('laporans.histori'),
            icon: History,
            isActive: true,
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
            title: "Kelola User",
            url: route('admin.users.index'),
            icon: Users,
            isActive: true,
        },
        {
            title: "Kelola Kategori",
            url: "/admin/kategoris",
            icon: ChartBarStacked,
            isActive: true,
        },
        {
            title: "Kelola Laporan",
            url: "/admin/laporans",
            icon: FileText,
            isActive: true,
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
