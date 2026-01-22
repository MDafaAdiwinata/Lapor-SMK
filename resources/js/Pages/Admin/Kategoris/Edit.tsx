import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
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
import { useEffect } from "react";
import { Textarea } from "@/Components/ui/textarea";

interface Kategori {
    id_kategori: number;
    nama_kategori: string;
    keterangan: string;
}

interface Props {
    kategori: Kategori;
}

export default function Edit({ kategori }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kategori: kategori.nama_kategori ?? "",
        keterangan: kategori.keterangan ?? "",
        _method: "PUT",
    });

    useEffect(() => {
        if (kategori) {
            setData({
                nama_kategori: kategori.nama_kategori ?? "",
                keterangan: kategori.keterangan ?? "",
                _method: "PUT",
            });
        }
    }, [kategori]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("kategoris.update", kategori.id_kategori));
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[
                { label: "Kelola Kategori Laporan", href: "/admin/kategoris" },
                { label: "Edit Kategori Laporan" },
            ]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">
                        Edit Kategori Laporan
                    </h1>
                    <p className="text-md">
                        Ubah data Kategori Laporan ke dalam sistem
                    </p>
                </div>
            }
        >
            <Head title="Edit Kategori Laporan" />

            {/* kalo ada eror, tampilkan alert */}
            {Object.keys(errors).length > 0 && (
                <Alert
                    variant="destructive"
                    className="mb-2 max-w-xl rounded-xl space-x-2"
                >
                    <CircleAlert />
                    <AlertTitle>Warning</AlertTitle>
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
                className="max-w-xl flex flex-col gap-4"
            >
                {/* Nama */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="nama_kategori"
                        value="Nama Kategori Laporan"
                    >
                        Nama Kategori Laporan
                    </InputLabel>
                    <Input
                        value={data.nama_kategori}
                        onChange={(e) =>
                            setData("nama_kategori", e.target.value)
                        }
                        placeholder="Masukkan nama kategori laporan"
                    />
                </div>

                {/* Keterangan */}
                <div className="mb-4 flex flex-col gap-1.5">
                    <InputLabel htmlFor="keterangan">
                        Keterangan Kategori Laporan
                    </InputLabel>
                    <Textarea
                        className="rounded-xl"
                        value={data.keterangan}
                        placeholder="input keterangan Product"
                        onChange={(e) => setData("keterangan", e.target.value)}
                    ></Textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin/kategoris" className="rounded-xl">
                            Batal
                        </Link>
                    </Button>
                    <Button
                        type="submit"
                        className="rounded-xl"
                        disabled={processing}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
