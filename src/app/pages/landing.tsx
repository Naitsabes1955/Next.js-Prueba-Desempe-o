"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PhoneIcon, GlobeAltIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

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
                            { href: "#services", label: "¿Quiénes Somos?" },
                            { href: "#recipes", label: "Recetas" },
                            { href: "#process", label: "Proceso" },
                            { href: "#contact", label: "Contactanos" },
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
                                <span className="text-sm font-medium text-cream">Hola {user.name}</span>
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
                            Recetas{" "}
                            <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
                            Creatividad{" "}
                            <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
                            Antojo
                        </span>

                        <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1]">
                            Te enseñamos que la comida <span></span>
                            <span className="bg-linear-to-r from-gold to-gold-light bg-clip-text text-transparent">
                                es mas sencilla de lo que parece
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-muted max-w-2xl">
                            Te enseñamos recetas famosas, unicas, divertidas, y con diferentes dificultades para cuando el momento
                            lo amerita, aqui descubrirás nuevas recetas para hacer en casa y disfrutar de ellas
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href="#recipes"
                                className="rounded-xl bg-gold px-8 py-4 font-semibold text-dark shadow-lg shadow-gold/10 transition-all hover:bg-gold-light hover:translate-y-0.5"
                            >
                                Ver Recetas
                            </a>
                            <a
                                href="#process"
                                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-cream transition-all hover:bg-white/10 hover:border-white/20"
                            >
                                Cómo Trabajamos
                            </a>
                        </div>
                        { }
                        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-lg">
                            {[
                                { value: "+50", label: "recetas" },
                                { value: "+100", label: "Personas Felices y a gusto" },
                                { value: "+5", label: "Categorias" },

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
                            La cocina está en tus manos
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted">
                            Somos una comunidad apasionada por la gastronomía, dedicada a simplificar
                            el arte de cocinar. Creamos guías paso a paso y seleccionamos las mejores
                            recetas para que dejes el miedo atrás y sorprendas a todos en casa.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "🍳",
                                title: "Paso a paso real",
                                desc: "Explicaciones claras y tiempos exactos para que tus platos queden perfectos desde el primer intento.",
                            },
                            {
                                icon: "🌱",
                                title: "Ingredientes accesibles",
                                desc: "Diseñamos menús con insumos fáciles de conseguir en tu mercado local, sin complicaciones.",
                            },
                            {
                                icon: "🔥",
                                title: "Para todo nivel",
                                desc: "Desde antojos rápidos de 15 minutos hasta retos culinarios para cuando quieras lucirte.",
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
            <section id="recipes" className="bg-dark py-24">
                
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="flex flex-col items-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                            Recetas
                        </span>
                        <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                            Nuestras Recetas
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: "Tacos al Pastor", tag: "Comida Rápida", img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=600&auto=format&fit=crop" },
                            { name: "Spaghetti Carbonara", tag: "Pasta", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop" },
                            { name: "Ensalada César con Pollo", tag: "Postres", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop" },
                            { name: "Hamburguesa Clásica con Queso", tag: "Internacional", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" },
                            { name: "Pizza Margherita", tag: "Italiana", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop" },
                            { name: "Sushi Maki de Salmón", tag: "Asiática", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop" },
                        ].map(({ name, tag, img }) => (
                            <div
                                key={name}
                                className="group overflow-hidden rounded-2xl border border-white/5 bg-surface transition-all duration-300 hover:border-white/10 hover:scale-[1.02]"
                            >
                                <div className="flex h-56 w-full items-center justify-center overflow-hidden border-b border-white/5">
                                    <img
                                        src={img}
                                        alt={name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                                        {tag}
                                    </span>
                                    <h3 className="mt-2 text-lg font-bold text-white group-hover:text-gold transition-colors">
                                        {name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold/60">
                            ¡Conoce esto y mucho más!
                        </span>
                        <Link
                            href="/recipes"
                            className="rounded-xl bg-white px-8 py-4 font-bold text-dark shadow-xl transition-all hover:bg-gold hover:scale-105"
                        >
                            Descubrir más
                        </Link>
                    </div>

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
                            ¿Cómo funciona?
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: "01",
                                title: "Elige tu antojo",
                                desc: "Explora nuestro catálogo y filtra según tu nivel, tiempo disponible o categoría favorita.",
                            },
                            {
                                step: "02",
                                title: "Revisa los ingredientes",
                                desc: "Prepara tu mesa de trabajo con las porciones exactas que calculamos para ti.",
                            },
                            {
                                step: "03",
                                title: "Sigue el paso a paso",
                                desc: "Cocina a tu propio ritmo guiado por nuestras instrucciones interactivas.",
                            },
                            {
                                step: "04",
                                title: "Guarda tus favoritas",
                                desc: "Inicia sesión para armar tu propio recetario personalizado y no perder ningún platillo.",
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
            {/*CTA */}
            <section
                id="contact"
                className="relative overflow-hidden bg-dark py-28 text-center border-t border-white/5"
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-75 w-125 opacity-10 rounded-full bg-gold blur-[120px]" />
                </div>

                <div className="relative mx-auto max-w-3xl px-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        Contacto & Comunidad
                    </span>
                    <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
                        ¿Tienes alguna duda o propuesta?
                    </h2>
                    <p className="mt-6 text-base text-muted max-w-lg mx-auto">
                        Síguenos en nuestras redes, explora el código de nuestra plataforma o escríbenos directamente para colaborar. ¡Estamos a un clic de distancia!
                    </p>

                    {/* CONTENEDOR DE ÍCONOS DE CONTACTO UTILIZANDO HEROICONS */}
                    <div className="mt-10 flex items-center justify-center gap-6">
                        {[
                            {
                                name: "WhatsApp",
                                href: "https://wa.me/+573012510533",
                                color: "hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5",
                                IconComponent: PhoneIcon
                            },
                            {
                                name: "Instagram / Web",
                                href: "https://instagram.com/naitsabes1955",
                                color: "hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5",
                                IconComponent: GlobeAltIcon
                            },
                            {
                                name: "GitHub",
                                href: "https://github.com/Naitsabes1955",
                                color: "hover:text-purple-400 hover:border-purple-400/30 hover:bg-purple-400/5",
                                IconComponent: CodeBracketIcon
                            }
                        ].map(({ name, href, color, IconComponent }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={name}
                                className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-muted transition-all duration-300 hover:scale-110 ${color}`}
                            >
                                <IconComponent className="h-6 w-6 stroke-[1.5]" />
                            </a>
                        ))}
                    </div>

                    <div className="my-8 mx-auto h-px w-16 bg-white/10" />

                    <Link
                        className="inline-block rounded-xl bg-white px-8 py-4 font-bold text-dark shadow-xl transition-all hover:bg-gold hover:scale-105"
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
                            Recetas · Creatividad · Antojos
                        </p>
                    </div>
                    <p className="text-xs text-muted/50">
                        © 2026 Nait's Recipes. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </main>
    );
}
