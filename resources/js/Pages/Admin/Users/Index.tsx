import { useState, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
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

export default function Index({ users }: any) {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");

    const filteredUsers = useMemo(() => {
        return users.filter((user: any) => {
            const matchSearch =
                user.nama_user.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            const matchRole = role === "all" ? true : user.role === role;

            return matchSearch && matchRole;
        });
    }, [users, search, role]);

    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Kelola User" }]}
            header={
                <div>
                    <h1 className="text-2xl font-bold">Kelola User</h1>
                    <p className="text-sm text-muted-foreground">
                        Manajemen data user sistem
                    </p>
                </div>
            }
        >
            <Head title="Kelola User" />
            <Card className="shadow-sm">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 border-b">
                    <Input
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 shadow-none focus:shadow-sm text-xs"
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
                        <Button className="ms-auto w-fit rounded-xl shadow-none">
                            Tambah
                        </Button>
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
                                    <TableRow key={user.id}>
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
                                        <TableCell className="text-right space-y-2 md:space-x-2">
                                            <Button
                                                className="rounded-lg shadow-none"
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                className="rounded- shadow-none"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(user.id)
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
