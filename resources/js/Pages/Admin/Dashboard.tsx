import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    FileText,
    Clock,
    AlertCircle,
    CheckCircle,
    TrendingUp,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

export default function Dashboard() {
    const { stats, latestLaporans } = usePage().props as any;
    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Dashboard" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">
                        Dashboard Admin
                    </h1>
                    <p className="font-italic text-md">
                        Kelola semua laporan dan user sistem
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Admin" />

            {/* Stats Card */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Laporan
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {stats.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Semua laporan masuk
                        </p>
                    </CardContent>
                </Card>

                {/* Pending */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {stats.pending}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Menunggu ditangani
                        </p>
                    </CardContent>
                </Card>

                {/* Proses */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Diproses
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {stats.proses}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Sedang ditangani
                        </p>
                    </CardContent>
                </Card>

                {/* Selesai */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Selesai
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {stats.selesai}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Laporan selesai
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabel laporan terbaru */}
            <Card className="mt-2 p-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Laporan Terbaru</CardTitle>
                        <CardDescription>
                            Laporan yang perlu diverifikasi segera
                        </CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('admin.laporans.index')}>Lihat Semua</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {latestLaporans.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-muted-foreground py-6"
                                    >
                                        Belum ada laporan terbaru
                                    </TableCell>
                                </TableRow>
                            ) : (
                                latestLaporans.map((laporan: any) => (
                                    <TableRow key={laporan.id_laporan}>
                                        {/* No Laporan */}
                                        <TableCell className="font-medium">
                                            {laporan.id_laporan}
                                        </TableCell>

                                        {/* Pelapor */}
                                        <TableCell>
                                            {laporan.user?.nama_user ?? "-"}
                                        </TableCell>

                                        {/* Kategori */}
                                        <TableCell>
                                            {laporan.kategori?.nama_kategori ??
                                                "-"}
                                        </TableCell>

                                        {/* Tanggal */}
                                        <TableCell>
                                            {new Date(
                                                laporan.tgl_laporan,
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    laporan.status === "pending"
                                                        ? "border-yellow-500 text-yellow-600"
                                                        : laporan.status ===
                                                            "proses"
                                                          ? "border-blue-500 text-blue-600"
                                                          : "border-green-500 text-green-600"
                                                }
                                            >
                                                {laporan.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Aksi */}
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.laporans.edit",
                                                        laporan.id_laporan,
                                                    )}
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
