import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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
    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Dashboard" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">Dashboard Admin</h1>
                    <p className="font-italic text-md">
                        Kelola semua laporan dan user sistem
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Admin" />

            {/* Stats Card */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Laporan
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            +12% dari bulan lalu
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Menunggu Verifikasi
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">
                            Memerlukan perhatian
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sedang Diproses
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">
                            Dalam penanganan
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Selesai Bulan Ini
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">88</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            +19% dari bulan lalu
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabel laporan terbaru */}
            <Card className="mt-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Laporan Terbaru</CardTitle>
                        <CardDescription>
                            Laporan yang perlu diverifikasi segera
                        </CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/admin/laporan">Lihat Semua</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No. Laporan</TableHead>
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
                            <TableRow>
                                <TableCell className="font-medium">
                                    LPR2026001
                                </TableCell>
                                <TableCell>Ahmad Ridwan</TableCell>
                                <TableCell>Sarana Rusak</TableCell>
                                <TableCell>21 Jan 2026</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                                    >
                                        Menunggu
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/admin/laporan/1">
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    LPR2026002
                                </TableCell>
                                <TableCell>Siti Nurhaliza</TableCell>
                                <TableCell>Keluhan Layanan</TableCell>
                                <TableCell>21 Jan 2026</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                                    >
                                        Menunggu
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/admin/laporan/2">
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    LPR2026003
                                </TableCell>
                                <TableCell>Budi Santoso</TableCell>
                                <TableCell>Sarana Rusak</TableCell>
                                <TableCell>20 Jan 2026</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                        Diproses
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/admin/laporan/3">
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
