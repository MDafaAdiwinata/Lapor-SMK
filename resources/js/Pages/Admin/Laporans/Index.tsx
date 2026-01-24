import { useState, useMemo } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { PageProps } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

interface Laporan {
    id_laporan: number;
    judul_laporan: string;
    isi_laporan: string;
    tgl_laporan: string;
    status: string;
    image?: string | null;
    id_user: number;
    id_kategori: number;

    user?: {
        id_user: number;
        nama_user: string;
    };

    kategori?: {
        id_kategori: number;
        nama_kategori: string;
    };
}

interface Kategori {
    id_kategori: number;
    nama_kategori: string;
}

type LaporansPageProps = PageProps<{
    laporans: Laporan[];
    kategoris: Kategori[];
}>;

export default function Index() {
    const { laporans, kategoris, flash } = usePage<LaporansPageProps>().props;
    const { delete: destroy, processing } = useForm({});
    const [search, setSearch] = useState("");
    const [kategori, setKategori] = useState<string>("all");
    const [status, setStatus] = useState<string>("all");
    const [tanggal, setTanggal] = useState<Date | undefined>();
    const [pelapor, setPelapor] = useState<string>("all");

    const pelaporList = useMemo(() => {
        const map = new Map<number, string>();

        laporans.forEach((laporan) => {
            if (laporan.user) {
                map.set(laporan.user.id_user, laporan.user.nama_user);
            }
        });

        return Array.from(map.entries()).map(([id, nama]) => ({
            id,
            nama,
        }));
    }, [laporans]);

    const filteredLaporans = useMemo(() => {
        return laporans.filter((laporan) => {
            const keyword = search.toLowerCase();

            const matchSearch =
                laporan.judul_laporan.toLowerCase().includes(keyword) ||
                laporan.isi_laporan.toLowerCase().includes(keyword) ||
                laporan.user?.nama_user?.toLowerCase().includes(keyword) ||
                laporan.kategori?.nama_kategori
                    ?.toLowerCase()
                    .includes(keyword);

            const matchKategori =
                kategori === "all" || String(laporan.id_kategori) === kategori;

            const matchTanggal =
                !tanggal ||
                laporan.tgl_laporan === format(tanggal, "yyyy-MM-dd");

            const matchPelapor =
                pelapor === "all" || String(laporan.user?.id_user) === pelapor;

            const matchStatus = status === "all" || laporan.status === status;

            return (
                matchSearch &&
                matchKategori &&
                matchTanggal &&
                matchPelapor &&
                matchStatus
            );
        });
    }, [laporans, search, kategori, tanggal, pelapor, status]);

    const truncate = (text: string, max = 80) =>
        text.length > max ? text.slice(0, max) + "…" : text;

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const handleDelete = (id_laporan: number, judul_laporan: string) => {
        if (
            confirm(
                `Apakah yakin ingin menghapus data laporan = ${id_laporan} ${judul_laporan}?`,
            )
        ) {
            destroy(route("admin.laporans.destroy", id_laporan));
        }
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Kelola Laporan" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">
                        Kelola Laporan
                    </h1>
                    <p className="font-italic text-md">
                        Kelola semua data Laporan dengan mudah
                    </p>
                </div>
            }
        >
            <Head title="Kelola Laporan" />

            {/* Flash Message */}
            {flash?.message && (
                <Alert className="space-x-2 rounded-xl">
                    <CheckCircle2Icon />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{flash.message}</AlertDescription>
                </Alert>
            )}

            <Card className="shadow-sm">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 border-b">
                    <Input
                        placeholder="Cari laporan atau nama user..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 shadow-none focus:shadow-sm text-sm"
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                        {/* Filter Tanggal */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full md:w-48 justify-start text-left font-normal shadow-none rounded-xl",
                                        !tanggal && "text-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {tanggal
                                        ? format(tanggal, "dd MMM yyyy")
                                        : "Pilih Tanggal"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={tanggal}
                                    onSelect={setTanggal}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {/* Filter Status */}
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full md:w-40 shadow-none">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Status
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="proses">Proses</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Filter Laporan */}
                        <Select value={pelapor} onValueChange={setPelapor}>
                            <SelectTrigger className="w-full md:w-48 shadow-none">
                                <SelectValue placeholder="Filter Pelapor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Pelapor
                                </SelectItem>

                                {pelaporList.map((user) => (
                                    <SelectItem
                                        key={user.id}
                                        value={String(user.id)}
                                    >
                                        {user.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Filter Kategori */}
                        <Select value={kategori} onValueChange={setKategori}>
                            <SelectTrigger className="w-full md:w-48 shadow-none">
                                <SelectValue placeholder="Filter Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Kategori
                                </SelectItem>

                                {kategoris.map((kategori) => (
                                    <SelectItem
                                        key={kategori.id_kategori}
                                        value={String(kategori.id_kategori)}
                                    >
                                        {kategori.nama_kategori}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            className="rounded-xl ms-4"
                            onClick={() => {
                                setSearch("");
                                setKategori("all");
                                setPelapor("all");
                                setStatus("all");
                                setTanggal(undefined);
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            asChild
                            className="rounded-xl shadow-none w-fit"
                            disabled={processing}
                        >
                            <Link href={route("admin.laporans.create")}>
                                Tambah
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">
                                    No
                                </TableHead>
                                <TableHead className="w-32 text-center">
                                    Gambar
                                </TableHead>
                                <TableHead className="text-center">
                                    Judul
                                </TableHead>
                                <TableHead>Pelapor</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Isi</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLaporans.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-6 text-center text-muted-foreground"
                                    >
                                        Data laporan tidak ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLaporans.map((laporan, index) => (
                                    <TableRow key={laporan.id_laporan}>
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>

                                        {/* Gambar */}
                                        <TableCell className="text-center">
                                            <img
                                                src={
                                                    laporan.image
                                                        ? `/storage/${laporan.image}`
                                                        : "/storage/noimage.png"
                                                }
                                                alt={laporan.judul_laporan}
                                                className="h-20 w-20 rounded-lg object-cover mx-auto border"
                                            />
                                        </TableCell>

                                        <TableCell className="font-medium text-center">
                                            {laporan.judul_laporan}
                                        </TableCell>

                                        {/* Pelapor */}
                                        <TableCell>
                                            {laporan.user?.nama_user ?? "-"}
                                        </TableCell>

                                        {/* Kategori */}
                                        <TableCell>
                                            <Badge variant="outline">
                                                {laporan.kategori
                                                    ?.nama_kategori ?? "-"}
                                            </Badge>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    laporan.status ===
                                                        "pending" &&
                                                        "border-yellow-500 text-yellow-600",
                                                    laporan.status ===
                                                        "proses" &&
                                                        "border-blue-500 text-blue-600",
                                                    laporan.status ===
                                                        "selesai" &&
                                                        "border-green-500 text-green-600",
                                                )}
                                            >
                                                {laporan.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            {formatDate(laporan.tgl_laporan)}
                                        </TableCell>

                                        <TableCell className="max-w-xs text-sm text-muted-foreground">
                                            {truncate(laporan.isi_laporan)}
                                        </TableCell>

                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="md"
                                                className="rounded-xl"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.laporans.edit",
                                                        laporan.id_laporan,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="md"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(
                                                        laporan.id_laporan,
                                                        laporan.judul_laporan,
                                                    )
                                                }
                                            >
                                                Hapus
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
