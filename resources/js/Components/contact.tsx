import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/components/ui/label";
interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
  className?: string;
}

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
                    <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-xl border p-6">
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="firstname">Nama Depan: </Label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    placeholder="Nama Depan "
                                />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="lastname">Nama Belakang: </Label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    placeholder="Nama Belakang"
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email">Email: </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="subject">Subjek: </Label>
                            <Input
                                type="text"
                                id="subject"
                                placeholder="Subjek"
                            />
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="message">Pesan: </Label>
                            <Textarea
                                placeholder="Tuliskan pesan kamu disini yaa"
                                id="message"
                                className="rounded-xl"
                            />
                        </div>
                        <Button className="w-full rounded-xl">
                          Kirim Pesan
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Contact };
