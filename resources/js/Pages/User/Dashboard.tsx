// resources/js/Pages/User/Dashboard.tsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    FileText,
    History,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            role="user"
            breadcrumbs={[{ label: "Dashboard" }]}
            header={
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Dashboard Siswa
                    </h1>
                    <p className="text-muted-foreground">
                        Selamat datang di sistem pelaporan SMK
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Siswa" />

            {/* STATS CARDS */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Laporan
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Semua laporan yang pernah dibuat
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sedang Diproses
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            Laporan dalam proses penanganan
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Selesai
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground">
                            Laporan yang sudah ditangani
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Buat Laporan Baru</CardTitle>
                        <CardDescription>
                            Laporkan sarana rusak atau keluhan layanan sekolah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/laporan/create">
                                <FileText className="mr-2 h-4 w-4" />
                                Buat Laporan
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Laporan</CardTitle>
                        <CardDescription>
                            Lihat semua laporan yang pernah Anda buat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/laporan/history">
                                <History className="mr-2 h-4 w-4" />
                                Lihat Riwayat
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* RECENT REPORTS */}
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Terbaru</CardTitle>
                    <CardDescription>
                        Laporan yang baru saja Anda buat
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>Belum ada laporan.</p>
                        <p className="text-sm">
                            Klik "Buat Laporan" untuk membuat laporan baru.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
