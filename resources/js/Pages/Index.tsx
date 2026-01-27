import CallToAction from "@/Components/call-to-action";
import ContentSection from "@/Components/content";
import FeaturesSection from "@/Components/features";
import HeroSection from "@/Components/hero-section";
import { Head, Link } from "@inertiajs/react";

const Index = () => {
    return (
        <>
            <Head title="Landing Page" />
            <HeroSection />
            <ContentSection />
            <FeaturesSection />
            <CallToAction />
        </>
    );
};

export default Index;
