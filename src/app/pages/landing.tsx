"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user, signOut } = useAuth();

    return (
        <main className="text-cream bg-dark antialiased">
            <header className="sticky top-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold tracking-tight">
                        <span className="text-gold font-extrabold">Nait's</span>
                        <span className="text-cream font-light"> Recipes</span>
                    </h1>
                    <nav className="hidden gap-8 md:flex">
                        {[
                            { href: "#services", label: "Quiénes Somos" },
                            { href: "#products", label: "Productos" },
                            { href: "#process", label: "Proceso" },
                            { href: "#contact", label: "Contacto" },
                        ].map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className="text-sm font-medium text-muted transition-colors hover:text-cream"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-cream">Hola, {user.name}</span>
                                <button
                                    type="button"
                                    onClick={signOut}
                                    className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-full bg-cream px-5 py-2 text-sm font-semibold text-dark transition-all hover:bg-gold hover:scale-105"
                            >
                                Inicia con nosotros
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            {/* HERO */}
            <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-36">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-100 w-150 opacity-20 rounded-full bg-linear-to-r from-gold to-purple-600 blur-[140px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-gold uppercase">
                            <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
                            Diseño{" "}
                            <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
                            Sublimación{" "}
                            <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
                            Personalización
                        </span>

                        <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                            Convertimos tus ideas en <span></span>
                            <span className="bg-linear-to-r from-gold to-gold-light bg-clip-text text-transparent">
                                productos únicos
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-muted max-w-2xl">
                            Diseñamos y personalizamos productos para emprendedores, personas,
                            negocios y empresas que quieren destacar su marca con calidad
                            profesional.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href="#products"
                                className="rounded-xl bg-gold px-8 py-4 font-semibold text-dark shadow-lg shadow-gold/10 transition-all hover:bg-gold-light hover:translate-y-0.5"
                            >
                                Ver Catálogo
                            </a>
                            <a
                                href="#process"
                                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-cream transition-all hover:bg-white/10 hover:border-white/20"
                            >
                                Cómo Trabajamos
                            </a>
                        </div>

                        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-lg">
                            {[
                                { value: "+500", label: "Pedidos realizados" },
                                { value: "+100", label: "Clientes felices" },
                                { value: "24h", label: "Tiempo de respuesta" },
                            ].map(({ value, label }) => (
                                <div key={label}>
                                    <p className="text-3xl font-extrabold text-white tracking-tight">
                                        {value}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* QUIÉNES SOMOS */}
            <section
                id="services"
                className="bg-surface relative border-y border-white/5 py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                            ¿Quiénes Somos?
                        </span>
                        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                            Tu marca merece destacar
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted">
                            Somos una empresa creativa especializada en transformar ideas en
                            productos con identidad propia. Trabajamos con emprendedores,
                            marcas y personas que buscan calidad y diferenciación.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "✦",
                                title: "Diseño a medida",
                                desc: "Cada producto es pensado desde cero según tu visión y necesidades.",
                            },
                            {
                                icon: "◈",
                                title: "Calidad garantizada",
                                desc: "Usamos materiales premium y procesos de sublimación de alta resolución.",
                            },
                            {
                                icon: "◎",
                                title: "Atención cercana",
                                desc: "Te acompañamos desde la idea hasta la entrega con comunicación directa.",
                            },
                        ].map(({ icon, title, desc }) => (
                            <div
                                key={title}
                                className="group rounded-2xl border border-white/5 bg-dark p-8 transition-all duration-300 hover:border-white/10 hover:bg-surface-hover"
                            >
                                <span className="inline-block text-2xl text-gold transition-transform group-hover:scale-110">
                                    {icon}
                                </span>
                                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTOS */}
            <section id="products" className="bg-dark py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center  content-center">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                            Catálogo
                        </span>
                        
                        <h2 className="mt-3 text-4xl font-extrabold  text-white sm:text-5xl">
                            Nuestros Productos
                        </h2>


                    </div>

                    <Link href={"/recipes"} className="mt-10 inline-block  rounded-xl bg-white px-8 py-4 font-bold text-dark shadow-xl transition-all hover:bg-gold hover:scale-105">
                        Conoce Todo lo que tenemos para ti
                    </Link>
                    {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                        { name: "Camisetas Personalizadas", tag: "Sublimación" },
                        { name: "Tazas y Mugs", tag: "Cerámica" },
                        { name: "Gorras y Accesorios", tag: "Bordado" },
                        { name: "Bolsas Ecológicas", tag: "Serigrafía" },
                        { name: "Stickers y Etiquetas", tag: "Corte digital" },
                        { name: "Pines y Botones", tag: "Metal" },
                        ].map(({ name, tag }) => (
                        <div
                            key={name}
                            className="group overflow-hidden rounded-2xl border border-white/5 bg-surface transition-all duration-300 hover:border-white/10 hover:scale-[1.02]"
                        >
                            {/* Placeholder imagen 
                            <div className="flex h-56 w-full items-center justify-center bg-linear-to-b from-white/2 to-transparent border-b border-white/5">
                            <span className="text-3xl opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-40">◈</span>
                            </div>
                            <div className="p-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                                {tag}
                            </span>
                            <h3 className="mt-2 text-lg font-bold text-white group-hover:text-gold transition-colors">{name}</h3>
                            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-cream transition-all hover:bg-white/5 hover:border-white/20">
                                Ver Detalles
                            </button>
                            </div>
                        </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* PROCESO */}
            <section
                id="process"
                className="bg-surface border-t border-white/5 py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                            Proceso
                        </span>
                        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                            ¿Cómo Trabajamos?
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: "01",
                                title: "Cuéntanos tu idea",
                                desc: "Nos describes qué necesitas y tu visión.",
                            },
                            {
                                step: "02",
                                title: "Creamos el diseño",
                                desc: "Nuestro equipo desarrolla una propuesta visual.",
                            },
                            {
                                step: "03",
                                title: "Apruebas el proyecto",
                                desc: "Revisas y confirmas cada detalle antes de producir.",
                            },
                            {
                                step: "04",
                                title: "Producción y entrega",
                                desc: "Fabricamos con calidad y te lo enviamos a tiempo.",
                            },
                        ].map(({ step, title, desc }) => (
                            <div
                                key={step}
                                className="relative rounded-2xl bg-dark/50 border border-white/5 p-8 transition-all hover:border-white/10"
                            >
                                <p className="text-5xl font-black bg-linear-to-b from-white to-transparent bg-clip-text text-transparent">
                                    {step}
                                </p>
                                <h3 className="mt-4 font-bold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                id="contact"
                className="relative overflow-hidden bg-dark py-28 text-center border-t border-white/5"
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-75 w-125 opacity-10 rounded-full bg-gold blur-[120px]" />
                </div>
                <div className="relative mx-auto max-w-3xl px-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        Empecemos
                    </span>
                    <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
                        ¿Listo para destacar tu marca?
                    </h2>
                    <p className="mt-6 text-base text-muted max-w-lg mx-auto">
                        Creamos productos personalizados que generan impacto y hacen crecer
                        tu negocio. Cuéntanos tu idea hoy.
                    </p>
                    <Link
                        className="mt-10 inline-block rounded-xl bg-white px-8 py-4 font-bold text-dark shadow-xl transition-all hover:bg-gold hover:scale-105"
                        href="/login"
                    >
                        Inicia Con Nosotros
                    </Link>
                </div>
            </section>
            <footer className="border-t border-white/5 bg-dark py-12">
                <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-muted text-sm">
                    <div className="text-center md:text-left">
                        <p className="text-lg font-bold text-white">
                            Ecommerce<span className="text-gold font-light"> <span></span>Publicidad</span>
                        </p>
                        <p className="mt-1 text-xs text-muted">
                            Diseño gráfico · Sublimación · Personalización profesional
                        </p>
                    </div>
                    <p className="text-xs text-muted/50">
                        © 2026 Ecommerce. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </main>
    );
}
