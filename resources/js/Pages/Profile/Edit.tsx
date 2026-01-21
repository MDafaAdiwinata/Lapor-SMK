import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Card } from "@/Components/ui/card";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const userRole = user.role === "admin" ? "admin" : "user";

    return (
        <AuthenticatedLayout
            role={userRole}
            breadcrumbs={[{ label: "Edit Profil" }]}
            header={
                <div>
                    <h1 className="text-2xl md:-ms-0.5 font-bold">Profile</h1>
                    <p className="font-italic text-md">
                        {userRole === "admin"
                            ? "Kelola profil administrator sistem"
                            : "Kelola informasi profil Anda"}
                    </p>
                </div>
            }
        >
            <Head title="Profile" />

            {/* Card Profile */}
            <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="p-6 h-fit">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="w-full"
                    />
                </Card>
                <Card className="p-6 h-fit">
                    <UpdatePasswordForm className="w-full" />
                </Card>
                <Card className="p-6 h-fit">
                    <DeleteUserForm className="w-full" />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
