import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        plugins: [
            laravel({
                input: "resources/js/app.tsx",
                refresh: true,
            }),
            react(),
        ],
        // server: {
        //     host: env.VITE_DEV_HOST || "0.0.0.0",
        //     port: Number(env.VITE_DEV_PORT) || 5173,
        //     strictPort: true,
        //     hmr: {
        //         host: env.VITE_HMR_HOST,
        //         protocol: env.VITE_HMR_PROTOCOL || "ws",
        //     },
        // },
    });
};
