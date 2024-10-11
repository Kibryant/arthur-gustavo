'use client'

import { motion } from 'framer-motion'
import { RocketIcon } from 'lucide-react'
import { Icons } from '@/components/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, type SignInSchema, signInSchema } from '@/functions/sign-in'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { Header } from '@/components/header'
import Link from 'next/link'
import { useState } from 'react'
import { MobileMenu } from '@/components/mobile-menu'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const { toast } = useToast()

  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const mutation = useMutation({
    mutationKey: ['admin-sign-in'],
    mutationFn: signIn,
    onSuccess: () => {
      router.push('/admin?activeTab=overview')
    },
    onError: () => {
      toast({
        title: 'Erro ao autenticar',
        description: 'Verifique suas credenciais e tente novamente.',
      })
    },
  })

  function onSubmit(data: SignInSchema) {
    mutation.mutate(data)
  }

  return (
    <>
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

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-lg w-full max-w-7xl flex flex-col lg:flex-row border border-zinc-600 lg:h-screen max-h-[1000px]"
        >
          <div className="hidden sm:w-full sm:flex sm:flex-col lg:w-1/2 p-8 lg:p-12 sm:justify-between rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
            <div>
              <RocketIcon className="text-blue-500 size-10" />
            </div>
            <p className="italic mt-4 lg:mt-0">
              “Esta biblioteca me salvou inúmeras horas de trabalho e me ajudou
              a entregar designs incríveis aos meus clientes mais rápido do que
              nunca.”
            </p>
          </div>

          <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-secondary rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none">
            <div className="text-right mb-4">
              <Link href="/" className="text-muted-foreground hover:underline">
                Sai fora enxerido
              </Link>
            </div>
            <h2 className="text-xl font-bold mb-6">
              Acesse o painel administrativo
            </h2>
            <p className="text-zinc-400 mb-6">
              Insira suas credenciais para acessar o painel administrativo.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu-email@exemplo.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Insira o email utilizado no cadastro.
                      </FormDescription>
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
                        <Input
                          type="password"
                          placeholder="Sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Insira sua senha de cadastro.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" />
                    <FormLabel htmlFor="rememberMe" className="text-sm">
                      Lembrar-me
                    </FormLabel>
                  </div>
                  <a href="/" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full mt-4 disabled:bg-secondary"
                >
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-500">
                  OU CONTINUE COM
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">
              <Icons.gitHub className="mr-2 h-6 w-6" />
              GitHub
            </Button>

            <p className="text-zinc-500 text-sm text-center mt-6">
              Ao clicar em continuar, você concorda com os nossos{' '}
              <a href="/" className="underline">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="/" className="underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}
