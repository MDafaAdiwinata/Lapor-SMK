import CallToAction from "@/Components/call-to-action";
import ContentSection from "@/Components/content";
import FeaturesSection from "@/Components/features";
import FooterSection from "@/Components/footer";
import HeroSection from "@/Components/hero-section";
import { Head } from "@inertiajs/react";

const Index = () => {
    return (
        <>
            <Head title="Landing Page" />
            <HeroSection />
            <ContentSection />
            <FeaturesSection />
            <CallToAction />
            <FooterSection />
        </>
    );
};

export default Index;
