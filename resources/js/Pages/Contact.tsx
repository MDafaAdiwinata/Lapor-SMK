import { Contact } from "@/Components/contact";
import { HeroHeader } from "@/Components/header";
import { Head } from "@inertiajs/react";

const Index = () => {
    return (
        <>
            <Head title="Landing Page" />
            <HeroHeader />
            <Contact />
        </>
    );
};

export default Index;
