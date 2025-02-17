"use client"

import { motion } from "framer-motion"
import { RocketIcon } from "lucide-react"
import { Icons } from "@/components/icons"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, type SignInSchema, signInSchema } from "@/functions/sign-in"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import Link from "next/link"
import { useState } from "react"
import { MobileMenu } from "@/components/mobile-menu"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"

export default function SignIn() {
  const { toast } = useToast()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const mutation = useMutation({
    mutationKey: ["admin-sign-in"],
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para o painel administrativo...",
      })
      router.push("/admin?activeTab=overview")
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao autenticar",
        description: "Verifique suas credenciais e tente novamente.",
      })
    },
  })

  function onSubmit(data: SignInSchema) {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={[]}
        activeSection=""
        setActiveSection={() => {}}
        isLogin
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={[]}
        activeSection=""
        setActiveSection={() => {}}
        isLogin
      />

      <main className="flex items-center justify-center px-4 py-20 sm:py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <Card className="grid overflow-hidden rounded-lg md:grid-cols-2">
            <div className="relative hidden bg-primary/5 p-10 md:block">
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="relative z-20 flex h-full flex-col justify-between">
                <RocketIcon className="h-12 w-12 text-primary" />
                <div className="space-y-6">
                  <blockquote className="text-lg font-medium leading-relaxed text-foreground">
                    "Esta plataforma revolucionou nossa forma de trabalhar. A interface intuitiva e as ferramentas
                    poderosas nos permitem criar soluções excepcionais em tempo recorde."
                  </blockquote>
                  <footer className="text-sm text-muted-foreground">
                    <cite className="font-medium">Maria Silva</cite>
                    {" — "}
                    <span>Diretora de Produto, TechCorp</span>
                  </footer>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Área Administrativa</h1>
                  <p className="text-sm text-muted-foreground mt-2">Faça login para acessar o painel de controle</p>
                </div>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Voltar ao site
                </Link>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu.email@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    <Button variant="link" className="px-0 font-normal" asChild>
                      <Link href="/recuperar-senha">Esqueceu a senha?</Link>
                    </Button>
                  </div>

                  <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">OU CONTINUE COM</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" disabled={mutation.isPending}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Continuar com GitHub
              </Button>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Ao fazer login, você concorda com nossos{" "}
                <Link href="/termos" className="underline underline-offset-4 hover:text-primary">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="underline underline-offset-4 hover:text-primary">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

