import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import InputLabel from "@/Components/InputLabel";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CircleAlert } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_depan: "",
        nama_belakang: "",
        email: "",
        subjek: "",
        isi_feedback: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.feedbacks.store"));
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[
                { label: "Kelola Feedback", href: "/admin/feedbacks" },
                { label: "Tambah Feedback" },
            ]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">Tambah Feedback</h1>
                    <p className="text-md">
                        Tambahkan Feedback baru ke dalam sistem
                    </p>
                </div>
            }
        >
            <Head title="Tambah Feedback" />

            {/* kalo ada eror, tampilkan alert */}
            {Object.keys(errors).length > 0 && (
                <Alert
                    variant="default"
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
                className="max-w-xl flex flex-col gap-4 md:gap-6"
            >
                {/* Nama Depan */}
                <div className="flex flex-col gap-1.5">
                    <InputLabel htmlFor="nama_depan" value="Nama Depan">
                        Nama Depan
                    </InputLabel>
                    <Input
                        value={data.nama_depan}
                        onChange={(e) => setData("nama_depan", e.target.value)}
                        placeholder="Masukkan nama depan"
                    />
                </div>

                {/* Nama Belakang */}
                <div className="flex flex-col gap-1.5">
                    <InputLabel htmlFor="nama_belakang" value="Nama Belakang">
                        Nama Belakang
                    </InputLabel>
                    <Input
                        value={data.nama_belakang}
                        onChange={(e) =>
                            setData("nama_belakang", e.target.value)
                        }
                        placeholder="Masukkan nama belakang"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <InputLabel htmlFor="email" value="Email">
                        Email
                    </InputLabel>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Masukkan email"
                    />
                </div>

                {/* Subjek */}
                <div className="flex flex-col gap-1.5">
                    <InputLabel htmlFor="subjek" value="Subjek">
                        Subjek
                    </InputLabel>
                    <Input
                        value={data.subjek}
                        onChange={(e) => setData("subjek", e.target.value)}
                        placeholder="Masukkan subjek"
                    />
                </div>

                {/* Isi Feedback */}
                <div className="flex flex-col gap-1.5">
                    <InputLabel htmlFor="isi_feedback" value="Isi Feedback">
                        Isi Feedback
                    </InputLabel>
                    <Textarea
                        className="rounded-xl min-h-[100px]"
                        value={data.isi_feedback}
                        onChange={(e) =>
                            setData("isi_feedback", e.target.value)
                        }
                        placeholder="Masukkan isi feedback"
                    />
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