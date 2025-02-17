"use client";

import { motion } from "framer-motion";
import { HomeIcon, SearchXIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Header } from "@/components/header";
import { MobileMenu } from "@/components/mobile-menu";

const menuItems: string[] = [];

export default function NotFound() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-secondary">
			<Header
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				menuItems={menuItems}
				activeSection={activeSection}
				setActiveSection={setActiveSection}
			/>

			<MobileMenu
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				menuItems={menuItems}
				activeSection={activeSection}
				setActiveSection={setActiveSection}
			/>
			<div className="relative flex min-h-screen flex-col items-center justify-center">
				<div className="absolute inset-0 bg-grid-white/10" />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="relative z-10 w-full max-w-2xl text-center"
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 100,
							delay: 0.1,
						}}
					>
						<SearchXIcon className="mx-auto h-24 w-24 text-primary" />
					</motion.div>

					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="mt-8 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl"
					>
						404
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="mt-4 text-3xl font-semibold tracking-tight"
					>
						Página não encontrada
					</motion.p>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="mt-4 text-muted-foreground"
					>
						Desculpe, não conseguimos encontrar a página que você está
						procurando.
					</motion.p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="mt-8"
					>
						<Button asChild size="lg">
							<Link href="/">
								<HomeIcon className="mr-2 h-4 w-4" />
								Voltar ao início
							</Link>
						</Button>
					</motion.div>

					<div className="mt-8 text-sm text-muted-foreground">
						<p>
							Se você acredita que isso é um erro, por favor{" "}
							<Link
								href="/contato"
								className="underline underline-offset-4 hover:text-primary transition-colors"
							>
								entre em contato
							</Link>{" "}
							com nossa equipe.
						</p>
					</div>
				</motion.div>

				{/* Elementos decorativos animados */}
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: [0.1, 0.3, 0.1],
							scale: [0.8, 1.1, 0.8],
						}}
						transition={{
							duration: 8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
						className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: [0.1, 0.2, 0.1],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 6,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
							delay: 1,
						}}
						className="absolute -bottom-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl"
					/>
				</div>
			</div>
		</div>
	);
}
