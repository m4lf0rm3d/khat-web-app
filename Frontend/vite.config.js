import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Khat",
                short_name: "Khat",
                theme_color: "#E1C9B0",
                icons: [
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "/favicon-16x16.png",
                        sizes: "16x16",
                        type: "image/png",
                    },
                    {
                        src: "/favicon-32x32.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
