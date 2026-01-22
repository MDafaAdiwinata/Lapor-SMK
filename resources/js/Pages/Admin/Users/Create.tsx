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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_user: "",
        email: "",
        password: "",
        role: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[
                { label: "Kelola User", href: "/admin/users" },
                { label: "Tambah User" },
            ]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">Tambah User</h1>
                    <p className="text-md">
                        Tambahkan user baru ke dalam sistem
                    </p>
                </div>
            }
        >
            <Head title="Tambah User" />

            {/* kalo ada eror, tampilkan alert */}
            {Object.keys(errors).length > 0 && (
                <Alert variant="destructive" className="mb-2">
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
                    <InputLabel htmlFor="nama_user" value="nama_user">
                        Nama User
                    </InputLabel>
                    <Input
                        value={data.nama_user}
                        onChange={(e) => setData("nama_user", e.target.value)}
                        placeholder="Masukkan nama user"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <InputLabel htmlFor="email" value="email">
                        Email
                    </InputLabel>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="user@email.com"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <InputLabel htmlFor="password" value="password">
                        Password
                    </InputLabel>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                {/* Role */}
                <div className="space-y-1">
                    <InputLabel htmlFor="role">Role</InputLabel>
                    <Select
                        value={data.role}
                        onValueChange={(value) =>
                            setData({ ...data, role: value })
                        }
                    >
                        <SelectTrigger className="shadow-none">
                            <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" asChild>
                        <Link
                            href="/admin/users"
                            className="rounded-xl"
                        >
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
