import { Button } from '@/Components/ui/button'
import { Link } from "@inertiajs/react";

export default function CallToAction() {
    return (
        <section className="py-16 md:py-32 border">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-3xl font-semibold lg:text-5xl">
                        Mulai Buat Laporan 💨
                    </h2>
                    <p className="mt-2 md:text-lg">
                        Proses mudah, data aman, dan tindak lanjut jelas.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        <Button
                            asChild
                            size="md"
                            className="rounded-xl"
                            variant="outline"
                        >
                            <a href="#feature">
                                <span>Lihat Fitur dulu</span>
                            </a>
                        </Button>
                        <Button asChild className="rounded-xl" size="md">
                            <Link href="/login">
                                <span>Mulai Sekarang!</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
