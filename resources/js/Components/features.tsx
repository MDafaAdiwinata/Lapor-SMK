import { Cpu, Lock, Sparkles, Zap, LayoutDashboard } from "lucide-react";

import { motion, type Variants } from "motion/react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};
export default function FeaturesSection() {
    return (
        <section className="overflow-hidden py-16 md:py-32" id="feature">
            <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative z-10 max-w-2xl"
                >
                    <h2 className="text-4xl font-semibold lg:text-5xl">
                        Dibangun untuk Lingkungan Sekolah yang Terorganisir
                    </h2>
                    <p className="mt-6 text-lg">
                        Berdayakan sekolah dengan sistem pelaporan digital yang
                        mudah digunakan, terstruktur, dan siap mendukung
                        pengelolaan laporan secara berkelanjutan.
                    </p>
                </motion.div>
                <div className="mask-b-from-75% mask-l-from-75% mask-b-to-95% mask-l-to-95% relative pr-3 pt-3">
                    <div className="perspective-midrange">
                        <div className="rotate-x-6 -skew-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut",
                                    delay: 1,
                                }}
                                viewport={{ once: true }}
                                className="mask-b-from-75% mask-l-from-75% mask-b-to-95% mask-l-to-95% relative pr-3 pt-3"
                            >
                                <img
                                    src="/storage/featuredark.png"
                                    className="hidden dark:block w-full h-auto object-contain border border-white/20 rounded-2xl shadow-md"
                                    alt="feature dark"
                                />
                                <img
                                    src="/storage/feature.png"
                                    className="dark:hidden w-full h-auto object-contain border border-black/10 rounded-2xl shadow-md"
                                    alt="feature light"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4"
                >
                    <motion.div variants={fadeUp} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">
                                Pelaporan Cepat
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Laporkan permasalahan sekolah secara ringkas dan
                            efisien.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">
                                Sistem Terpusat
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Semua laporan dikelola dalam satu dashboard terpadu.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">
                                Keamanan Data
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Akses data laporan aman dan terbatas untuk pihak
                            berwenang.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard className="size-4" />

                            <h3 className="text-sm font-medium">
                                Dashboard Informatif
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Pantau status dan tindak lanjut laporan secara
                            real-time.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
