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

interface User {
    id_user: number;
    nama_user: string;
    email: string;
    password: string;
    role: string;
}

type UsersPageProps = PageProps<{
    users: User[];
}>;

export default function Index() {
    const { users, flash } = usePage<UsersPageProps>().props;
    const { delete: destroy, processing } = useForm({});
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");

    const filteredUsers = useMemo(() => {
        return users.filter((user: User) => {
            const matchSearch =
                user.nama_user.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            const matchRole = role === "all" ? true : user.role === role;

            return matchSearch && matchRole;
        });
    }, [users, search, role]);

    const handleDelete = (id_user: number, nama_user: string) => {
        if (
            confirm(
                `Apakah yakin ingin menghapus data user = ${id_user} . ${nama_user}?`,
            )
        ) {
            destroy(route("users.destroy", id_user));
        }
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Kelola User" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">
                        Kelola User
                    </h1>
                    <p className="font-italic text-md">
                        Kelola semua data user dengan mudah
                    </p>
                </div>
            }
        >
            <Head title="Kelola User" />

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
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 shadow-none focus:shadow-sm text-sm"
                    />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-full md:w-40 shadow-none">
                                <SelectValue placeholder="Filter Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link href={route("users.create")}>
                            <Button className="ms-auto w-fit rounded-xl shadow-none">
                                Tambah
                            </Button>
                        </Link>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground"
                                    >
                                        Data tidak ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user: any) => (
                                    <TableRow key={user.id_user}>
                                        <TableCell>
                                            {user.id_user ?? user.id}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.nama_user}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    user.role === "admin"
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                                }
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-y-2 sm:space-x-2 md:space-x-2">
                                            <Button
                                                className="rounded-xl shadow-none"
                                                variant="outline"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "users.edit",
                                                        user.id_user,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                className="rounded- shadow-none rounded-xl"
                                                variant="destructive"
                                                disabled={processing}
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id_user,
                                                        user.nama_user,
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
