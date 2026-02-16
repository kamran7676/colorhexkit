"use client";

import { motion, Variants } from "framer-motion";

const pillColors = [
    { color: "bg-[#292D32]", name: "Black" },   // Dark Gray/Black
    { color: "bg-[#6B4E38]", name: "Brown" },   // Brown
    { color: "bg-[#FF3B30]", name: "Red" },     // Bright Red
    { color: "bg-[#FF885B]", name: "Coral" },   // Coral/Orange
    { color: "bg-[#FFCC99]", name: "Peach" },   // Peach/Light Orange
    { color: "bg-[#8BC34A]", name: "Green" },   // Lime Green
    { color: "bg-[#4DB6AC]", name: "Teal" },    // Teal
    { color: "bg-[#7E57C2]", name: "Purple" },  // Deep Purple
];

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const pillVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: "100%",
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export function ColorPaletteShowcase() {
    return (
        <section className="w-full py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                    {/* Left Side: Color Design */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="w-full md:w-1/2 flex items-center justify-center"
                    >
                        <div className="bg-[#FFF5EB] dark:bg-neutral-900 rounded-[3rem] p-8 md:p-12 w-full max-w-[500px] aspect-[4/3] flex items-center justify-center shadow-lg relative overflow-hidden">
                            {/* Decorative background circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 dark:bg-white/5 rounded-full blur-3xl" />

                            <div className="flex items-center justify-center h-[200px] md:h-[240px] relative z-10 w-full px-4">
                                {pillColors.map((pill, index) => (
                                    <motion.div
                                        key={index}
                                        variants={pillVariants}
                                        className={`w-12 md:w-14 h-full ${pill.color} rounded-full shadow-lg relative flex-shrink-0 transition-transform hover:-translate-y-2 hover:z-20 duration-300`}
                                        style={{
                                            marginLeft: index === 0 ? 0 : "-24px", // Negative margin for overlap
                                            zIndex: index + 1 // Stacking order
                                        }}
                                        title={pill.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Description */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="w-full md:w-1/2 space-y-6 text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-clash-grotesk tracking-tight text-foreground">
                            Designed for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                Creative Freedom.
                            </span>
                        </h2>
                        <div className="space-y-4 text-neutral-600 dark:text-neutral-400 font-satoshi font-semibold text-lg leading-relaxed">
                            <p>
                                Experience a seamless color selection process that brings your ideas to life. Our intuitive tools let you extract, generate, and fine-tune palettes with precision.
                            </p>
                            <p>
                                Whether you are designing a brand identity or a user interface, find the perfect harmony in every shade. Overlap, mix, and match colors to create depth and emotion in your designs.
                            </p>
                        </div>

                        <div className="pt-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Interactive Color Pills
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
