import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CheckCircle2Icon, CircleAlert } from "lucide-react";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
interface Contact2Props {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
    web?: { label: string; url: string };
    className?: string;
}

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

const Contact = ({
    title = "Kontak Kami",
    description = "Kami siap membantu menjawab pertanyaan, menerima masukan, maupun menjalin kerja sama. Jangan ragu untuk menghubungi kami kapan saja.",
    phone = "(+62) 857 6554 4476",
    email = "dafaadi2106@gmail.com",
    web = {
        label: "github.com",
        url: "https://github.com/mdafaadiwinata",
    },
    className,
}: Contact2Props) => {
    const { flash } = usePage<FeedbacksPageProps>().props;
    const [showAlert, setShowAlert] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_depan: "",
        nama_belakang: "",
        email: "",
        subjek: "",
        isi_feedback: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        if (flash?.message) {
            setShowAlert(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash?.message]);

    return (
        <section className="min-h-screen flex items-center justify-center py-16 md:py-32">
            <div className="container mx-auto">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex max-w-sm flex-col gap-20">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-2 text-4xl font-semibold lg:mb-1 lg:text-6xl">
                                {title}
                            </h1>
                            <p className="text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        <div className="mx-auto w-fit lg:mx-0">
                            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                                Yuk hubungi kami
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>
                                    <span className="font-bold">Phone: </span>
                                    {phone}
                                </li>
                                <li>
                                    <span className="font-bold">Email: </span>
                                    <a
                                        href={`mailto:${email}`}
                                        className="underline"
                                    >
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <span className="font-bold">Github: </span>
                                    <a
                                        href={web.url}
                                        target="_blank"
                                        className="underline"
                                    >
                                        {web.label}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <form
                        className="mx-auto flex max-w-3xl flex-col gap-6 rounded-xl border p-6"
                        onSubmit={handleSubmit}
                    >
                        {flash?.message && showAlert && (
                            <Alert className="rounded-xl">
                                <CheckCircle2Icon />
                                <AlertTitle>Berhasil! 🥳</AlertTitle>
                                <AlertDescription>
                                    {flash.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="nama_depan">Nama Depan: </Label>
                                <Input
                                    type="text"
                                    id="nama_depan"
                                    placeholder="Nama Depan "
                                    value={data.nama_depan}
                                    onChange={(e) =>
                                        setData("nama_depan", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="nama_belakang">
                                    Nama Belakang:
                                </Label>
                                <Input
                                    type="text"
                                    id="nama_belakang"
                                    placeholder="Nama Belakang"
                                    value={data.nama_belakang}
                                    onChange={(e) =>
                                        setData("nama_belakang", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email">Email: </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="subjek">Subjek: </Label>
                            <Input
                                type="text"
                                id="subjek"
                                placeholder="Subjek"
                                value={data.subjek}
                                onChange={(e) =>
                                    setData("subjek", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="isi_feedback">Pesan: </Label>
                            <Textarea
                                placeholder="Tuliskan pesan kamu disini yaa"
                                id="isi_feedback"
                                className="rounded-xl"
                                value={data.isi_feedback}
                                onChange={(e) =>
                                    setData("isi_feedback", e.target.value)
                                }
                            />
                        </div>
                        <Button
                            className="w-full rounded-xl"
                            type="submit"
                            disabled={processing}
                        >
                            Kirim Pesan
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export { Contact };
