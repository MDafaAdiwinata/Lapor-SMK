import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import RegisterLayout from "@/Layouts/RegisterLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_user: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <RegisterLayout>
            <Head title="Register" />
            <div className="flex flex-col gap-6">
                <Card className="rounded-2xl shadow-none p-2">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            Buat Akun Baru
                        </CardTitle>
                        <CardDescription>
                            Masukkan Email untuk Mendaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel
                                        htmlFor="nama_user"
                                        className="mb-0"
                                    >
                                        Nama Lengkap
                                    </FieldLabel>
                                    <Input
                                        id="nama_user"
                                        name="nama_user"
                                        value={data.nama_user}
                                        className="block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("nama_user", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.nama_user}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <Field className="grid grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="confirm-password">
                                                Konfirmasi password
                                            </FieldLabel>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                className="block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </Field>
                                    </Field>
                                    <FieldDescription>
                                        minimal 8 karakter.
                                    </FieldDescription>
                                </Field>
                                <Field className="space-y-2">
                                    <Button
                                        type="submit"
                                        className="rounded-xl hover:scale-105 transition duration-300"
                                    >
                                        Buat Akun
                                    </Button>
                                    <FieldDescription className="text-center">
                                        Sudah Punya Akun?
                                        <Link href="/login" className="ms-1">
                                            Masuk
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
                <FieldDescription className="px-6 text-center">
                    Dengan mengklik lanjutkan, Anda menyetujui ketentuan kami.{" "}
                    <a href="#">Ketentuan Layanan</a> and{" "}
                    <a href="#">Kebijakan Privasi</a>.
                </FieldDescription>
            </div>
        </RegisterLayout>
    );
}
