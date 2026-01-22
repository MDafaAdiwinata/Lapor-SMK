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
import { PageProps } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

interface Kategori {
    id_kategori: number;
    nama_kategori: string;
    keterangan: string;
}

type KategorisPageProps = PageProps<{
    kategoris: Kategori[];
}>;

export default function Index() {
    const { kategoris, flash } = usePage<KategorisPageProps>().props;
    const { delete: destroy, processing } = useForm({});
    const [search, setSearch] = useState("");

    const filteredKategori = useMemo(() => {
        return kategoris.filter((kategori: Kategori) => {
            return kategori.nama_kategori
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [kategoris, search]);

    const handleDelete = (id_kategori: number, nama_kategori: string) => {
        if (
            confirm(`Apakah yakin ingin menghapus kategori "${nama_kategori}"?`)
        ) {
            destroy(route("kategori.destroy", id_kategori));
        }
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Kelola Kategori Laporan" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">
                        Kelola Kategori Laporan
                    </h1>
                    <p className="font-italic text-md">
                        Kelola semua data Kategori Laporan dengan mudah
                    </p>
                </div>
            }
        >
            <Head title="Kelola Kategori Laporan" />

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
                        placeholder="Cari nama kategori..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 shadow-none focus:shadow-sm text-sm"
                    />
                    <Link href={route("kategoris.create")}>
                        <Button className="ms-auto w-fit rounded-xl shadow-none">
                            Tambah
                        </Button>
                    </Link>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama Kategori</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredKategori.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground pt-6"
                                    >
                                        Data tidak ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredKategori.map((kategori) => (
                                    <TableRow key={kategori.id_kategori}>
                                        <TableCell>
                                            {kategori.id_kategori}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {kategori.nama_kategori}
                                        </TableCell>
                                        <TableCell>
                                            {kategori.keterangan}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                className="rounded-xl shadow-none"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "kategori.edit",
                                                        kategori.id_kategori,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="rounded-xl shadow-none"
                                                disabled={processing}
                                                onClick={() =>
                                                    handleDelete(
                                                        kategori.id_kategori,
                                                        kategori.nama_kategori,
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
