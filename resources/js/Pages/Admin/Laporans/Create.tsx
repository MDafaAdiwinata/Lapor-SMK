import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputLabel from "@/Components/InputLabel";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CircleAlert } from "lucide-react";

interface User {
    id_user: number;
    nama_user: string;
}

interface Kategori {
    id_kategori: number;
    nama_kategori: string;
}

type CreateLaporanProps = {
    users: User[];
    kategoris: Kategori[];
};

export default function Create({ users, kategoris }: CreateLaporanProps) {
    const [preview, setPreview] = useState<string>("/storage/noimage.png");
    const { data, setData, post, processing, errors } = useForm({
        judul_laporan: "",
        isi_laporan: "",
        tgl_laporan: "",
        image: null as File | null,
        id_user: "",
        id_kategori: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("laporans.store"), {
            forceFormData: true,
            onSuccess: () => {
                setPreview("/storage/noimage.png");
            },
        });
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[
                { label: "Kelola Laporan", href: "/admin/laporans" },
                { label: "Tambah Laporan" },
            ]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">Tambah Laporan</h1>
                    <p className="text-md">
                        Tambah Laporan baru ke dalam sistem
                    </p>
                </div>
            }
        >
            <Head title="Tambah Laporan" />

            {/* kalo ada eror, tampilkan alert */}
            {Object.keys(errors).length > 0 && (
                <Alert
                    variant="destructive"
                    className="mb-2 space-x-2 max-w-xl rounded-xl"
                >
                    <CircleAlert />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        <ul>
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>{message as string}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}
            <form
                onSubmit={handleSubmit}
                className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12"
            >
                {/* RIGHT COLUMN */}
                <div className="space-y-2">
                    <InputLabel>Gambar (opsional)</InputLabel>

                    <div className="rounded-xl flex flex-col items-center gap-4">
                        {/* Preview */}
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full rounded-xl object-cover border"
                        />

                        {/* Input */}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData("image", file);

                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                } else {
                                    setPreview("/storage/noimage.png");
                                }
                            }}
                        />
                    </div>
                </div>

                {/* LEFT COLUMN */}
                <div className="flex flex-col space-y-4">
                    {/* Judul Laporan */}
                    <div className="space-y-1">
                        <InputLabel className="mt-1.5">
                            Judul Laporan
                        </InputLabel>
                        <Input
                            className="shadow-none"
                            value={data.judul_laporan}
                            onChange={(e) =>
                                setData("judul_laporan", e.target.value)
                            }
                            placeholder="Masukkan judul laporan"
                        />
                    </div>

                    {/* Isi Laporan */}
                    <div className="space-y-1">
                        <InputLabel>Isi Laporan</InputLabel>
                        <Textarea
                            className="shadow-none rounded-xl"
                            rows={4}
                            value={data.isi_laporan}
                            onChange={(e) =>
                                setData("isi_laporan", e.target.value)
                            }
                            placeholder="Jelaskan isi laporan"
                        />
                    </div>

                    {/* Tanggal Laporan */}
                    <div className="space-y-1">
                        <InputLabel>Tanggal Laporan</InputLabel>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal ${
                                        !data.tgl_laporan &&
                                        "text-muted-foreground"
                                    }`}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.tgl_laporan
                                        ? format(
                                              new Date(data.tgl_laporan),
                                              "dd MMM yyyy",
                                          )
                                        : "Pilih tanggal"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.tgl_laporan
                                            ? new Date(data.tgl_laporan)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        setData(
                                            "tgl_laporan",
                                            date
                                                ? format(date, "yyyy-MM-dd")
                                                : "",
                                        )
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Nama Pelapor */}
                    <div className="space-y-1">
                        <InputLabel>Pelapor</InputLabel>
                        <Select
                            value={data.id_user}
                            onValueChange={(value) => setData("id_user", value)}
                        >
                            <SelectTrigger className="shadow-none">
                                <SelectValue placeholder="Pilih pelapor" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem
                                        key={user.id_user}
                                        value={String(user.id_user)}
                                    >
                                        {user.nama_user}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Kategori */}
                    <div className="space-y-1">
                        <InputLabel>Kategori Laporan</InputLabel>
                        <Select
                            value={data.id_kategori}
                            onValueChange={(value) =>
                                setData("id_kategori", value)
                            }
                        >
                            <SelectTrigger className="shadow-none">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
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
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            asChild
                            size="md"
                            className="rounded-xl"
                        >
                            <Link href="/admin/laporans">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl"
                            size="md"
                            disabled={processing}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
