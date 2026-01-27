import { Cpu, Zap } from "lucide-react";
import { motion, type Variants } from "motion/react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const imageZoom: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 1,
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

export default function ContentSection() {
    return (
        <section className="py-16 md:py-[200px]">
            <motion.div
                className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Title */}
                <motion.h2
                    variants={fadeUp}
                    className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl"
                >
                    Ekosistem Digital untuk Pelaporan Sekolah
                </motion.h2>

                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    {/* Text */}
                    <motion.div
                        variants={containerVariants}
                        className="relative space-y-4"
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-muted-foreground"
                        >
                            Satu platform terintegrasi untuk mengelola laporan
                            sekolah, memantau tindak lanjut, serta memastikan
                            setiap laporan tercatat secara sistematis dan
                            transparan.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <motion.div variants={fadeUp} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="size-4" />
                                    <h3 className="text-sm font-medium">
                                        Pelaporan Cepat
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Laporkan permasalahan sekolah dengan mudah
                                    dan efisien.
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
                                    Semua laporan terkumpul dalam satu
                                    dashboard.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        variants={imageZoom}
                        className="relative mt-6 sm:mt-0"
                    >
                        <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700 dark:border dark:border-white/20">
                            <img
                                src="/storage/aboutdark.png"
                                className="hidden rounded-[15px] dark:block"
                                alt="about dark"
                            />
                            <img
                                src="/storage/about.png"
                                className="rounded-[15px] shadow dark:hidden"
                                alt="about light"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

