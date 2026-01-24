import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

interface Laporan {
    id_laporan: number;
    judul_laporan: string;
    isi_laporan: string;
    tgl_laporan: string;
    status: "pending" | "proses" | "selesai";
    image?: string | null;
    id_user: number;
    id_kategori: number;
}

interface User {
    id_user: number;
    nama_user: string;
}

interface Kategori {
    id_kategori: number;
    nama_kategori: string;
}

type EditLaporanProps = {
    laporan: Laporan;
    users: User[];
    kategoris: Kategori[];
};


export default function Edit({ laporan, users, kategoris }: EditLaporanProps) {
    const [preview, setPreview] = useState<string>(
        laporan.image ? `/storage/${laporan.image}` : "/storage/noimage.png",
    );

    const { data, setData, put, processing, errors } = useForm({
        judul_laporan: laporan.judul_laporan,
        isi_laporan: laporan.isi_laporan,
        tgl_laporan: laporan.tgl_laporan,
        image: null as File | null,
        status: String(laporan.status),
        id_user: String(laporan.id_user),
        id_kategori: String(laporan.id_kategori),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.laporans.update", laporan.id_laporan), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[
                { label: "Kelola Laporan", href: "/admin/laporans" },
                { label: "Edit Laporan" },
            ]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">Edit Laporan</h1>
                    <p className="text-md">Perbarui data laporan</p>
                </div>
            }
        >
            <Head title="Edit Laporan" />

            <form
                onSubmit={handleSubmit}
                className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12"
            >
                {/* RIGHT */}
                <div className="space-y-2">
                    <InputLabel>Gambar</InputLabel>

                    <div className="flex flex-col gap-4">
                        <img
                            src={preview}
                            className="w-full rounded-xl border object-cover"
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData("image", file);

                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>
                </div>

                {/* LEFT */}
                <div className="space-y-4">
                    <div>
                        <InputLabel className="mt-2">Judul Laporan</InputLabel>
                        <Input
                            value={data.judul_laporan}
                            onChange={(e) =>
                                setData("judul_laporan", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <InputLabel>Isi Laporan</InputLabel>
                        <Textarea
                            rows={4}
                            value={data.isi_laporan}
                            onChange={(e) =>
                                setData("isi_laporan", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <InputLabel>Tanggal</InputLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(
                                        new Date(data.tgl_laporan),
                                        "dd MMM yyyy",
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date(data.tgl_laporan)}
                                    onSelect={(date) =>
                                        setData(
                                            "tgl_laporan",
                                            date
                                                ? format(date, "yyyy-MM-dd")
                                                : "",
                                        )
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <InputLabel>Pelapor</InputLabel>
                        <Select
                            value={data.id_user}
                            onValueChange={(v) => setData("id_user", v)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((u) => (
                                    <SelectItem
                                        key={u.id_user}
                                        value={String(u.id_user)}
                                    >
                                        {u.nama_user}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <InputLabel>Kategori</InputLabel>
                        <Select
                            value={data.id_kategori}
                            onValueChange={(v) => setData("id_kategori", v)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {kategoris.map((k) => (
                                    <SelectItem
                                        key={k.id_kategori}
                                        value={String(k.id_kategori)}
                                    >
                                        {k.nama_kategori}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <InputLabel>Status Laporan</InputLabel>
                        <Select
                            value={data.status}
                            onValueChange={(v) => setData("status", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="proses">Proses</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

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
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
