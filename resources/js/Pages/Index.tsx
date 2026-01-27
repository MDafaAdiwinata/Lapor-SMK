import ContentSection from "@/Components/content";
import HeroSection from "@/Components/hero-section";
import { Head, Link } from "@inertiajs/react";

const Index = () => {
    return (
        <>
            <Head title="Landing Page" />
            <HeroSection />
            <ContentSection />
        </>
    );
};

export default Index;
