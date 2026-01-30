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

interface Feedback {
    id_feedback: number;
    nama_depan: string;
    nama_belakang: string;
    email: string;
    subjek: string;
    isi_feedback: string;
}

type FeedbacksPageProps = PageProps<{
    feedbacks: Feedback[];
}>;

export default function Index() {
    const { feedbacks, flash } = usePage<FeedbacksPageProps>().props;
    const { delete: destroy, processing } = useForm({});
    const [search, setSearch] = useState("");

    const filteredFeedbacks = useMemo(() => {
        return feedbacks.filter((feedback: Feedback) => {
            return feedback.nama_depan
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [feedbacks, search]);

    const handleDelete = (id_feedback: number, subjek: string) => {
        if (confirm(`Apakah yakin ingin menghapus feedback "${subjek}"?`)) {
            destroy(route("admin.feedbacks.destroy", id_feedback));
        }
    };

    return (
        <AuthenticatedLayout
            role="admin"
            breadcrumbs={[{ label: "Kelola Feedback" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">
                        Kelola Feedback
                    </h1>
                    <p className="font-italic text-md">
                        Kelola semua data Feedback dengan mudah
                    </p>
                </div>
            }
        >
            <Head title="Kelola Feedback" />

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
                        placeholder="Cari feedback..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 shadow-none focus:shadow-sm text-sm"
                    />
                    <Link href={route("admin.feedbacks.create")}>
                        <Button className="float-right w-fit rounded-xl shadow-none">
                            Tambah
                        </Button>
                    </Link>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama Depan</TableHead>
                                <TableHead>Nama Belakang</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subjek</TableHead>
                                <TableHead>Isi Feedback</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredFeedbacks.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground pt-6"
                                    >
                                        Data tidak ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredFeedbacks.map((feedback) => (
                                    <TableRow key={feedback.id_feedback}>
                                        <TableCell>
                                            {feedback.id_feedback}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {feedback.nama_depan}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.nama_belakang}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.email}
                                        </TableCell>
                                        <TableCell>{feedback.subjek}</TableCell>
                                        <TableCell>
                                            {feedback.isi_feedback}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                className="rounded-xl shadow-none"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.feedbacks.edit",
                                                        feedback.id_feedback,
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
                                                        feedback.id_feedback,
                                                        feedback.subjek,
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
