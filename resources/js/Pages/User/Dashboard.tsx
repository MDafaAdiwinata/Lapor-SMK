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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    FileText,
    History,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Link } from "@inertiajs/react";

interface Laporan {
    id_laporan: number;
    judul_laporan: string;
    tgl_laporan: string;
    image?: string | null;
    kategori: {
        nama_kategori: string;
    };
}

export default function Dashboard({
    laporanTerbaru = [],
    stats,
}: {
    laporanTerbaru: Laporan[];
    stats: {
        total: number;
        pending: number;
        proses: number;
        selesai: number;
    };
}) {
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
                <Card className="shadow-none px-1.5 hover:shadow-md transition duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Laporan
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">
                            Semua laporan yang pernah dibuat
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-none px-1.5 hover:shadow-md transition duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sedang Diproses
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.proses}</div>
                        <p className="text-xs text-muted-foreground">
                            Laporan dalam proses penanganan
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-none px-1.5 hover:shadow-md transition duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Selesai
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.selesai}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Laporan yang sudah ditangani
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="shadow-none p-1.5 hover:shadow-md transition duration-300">
                    <CardHeader>
                        <CardTitle>Buat Laporan Baru</CardTitle>
                        <CardDescription>
                            Laporkan sarana rusak atau keluhan layanan sekolah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href={route("laporans.create")}>
                                <FileText className="mr-2 h-4 w-4" />
                                Buat Laporan
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-none p-1.5 hover:shadow-md transition duration-300">
                    <CardHeader>
                        <CardTitle>Riwayat Laporan</CardTitle>
                        <CardDescription>
                            Lihat semua laporan yang pernah Anda buat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <Link href={route("laporans.histori")}>
                                <History className="mr-2 h-4 w-4" />
                                Lihat Riwayat
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* RECENT REPORTS */}
            <Card className="shadow-none px-1.5">
                <CardHeader>
                    <CardTitle>Laporan Terbaru</CardTitle>
                    <CardDescription>
                        laporan terakhir yang Anda buat
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {laporanTerbaru.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            <FileText className="mx-auto h-10 w-10 mb-3 opacity-50" />
                            <p>Belum ada laporan.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="text-center">
                                            Gambar
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {laporanTerbaru.map((laporan) => (
                                        <TableRow
                                            key={laporan.id_laporan}
                                            className="hover:bg-muted/50 transition"
                                        >
                                            <TableCell className="font-medium">
                                                {laporan.judul_laporan}
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    laporan.kategori
                                                        ?.nama_kategori
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {laporan.tgl_laporan}
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <img
                                                    src={
                                                        laporan.image
                                                            ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${laporan.image}`
                                                            : "/images/noimage.png"
                                                    }
                                                    alt={laporan.judul_laporan}
                                                    className="w-14 h-14 md:w-24 md:h-24 rounded-lg object-cover mx-auto border"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
