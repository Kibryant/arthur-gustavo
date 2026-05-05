'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
})

type ContactSchema = z.infer<typeof contactSchema>

const sendEmail = async (formData: ContactSchema) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Erro ao enviar a mensagem')
  }

  return { success: true }
}

export function Contact() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: sendEmail,
    mutationKey: ['send-email'],
    onSuccess: () => {
      toast({
        title: 'Mensagem enviada.',
        description: 'Em breve entrarei em contato.',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      })
      reset()
    },
    onError: () => {
      toast({
        title: 'Erro ao enviar.',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      })
    },
  })

  const onSubmit = (data: ContactSchema) => {
    mutation.mutate(data)
  }

  return (
    <section
      id="contato"
      className="relative py-24 lg:py-32 container mx-auto px-6 lg:px-10"
    >
      <div className="flex items-baseline gap-4 mb-12">
        <span className="meta-strong text-primary">05</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic tracking-tight">
          contato
        </h2>
        <div className="flex-1 rule mb-3" />
        <span className="meta hidden md:inline">/ vamos construir algo</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* left — pitch + direct email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <p className="text-2xl md:text-3xl font-display leading-snug text-balance">
            Tem um projeto em mente? Manda um{' '}
            <span className="italic text-primary">email</span> ou usa o
            formulário ao lado.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Respondo em até 48h em dias úteis. Topo conversar sobre freelas,
            CLT/PJ, parcerias ou só uma ideia maluca que você quer validar.
          </p>

          <div className="rule" />

          <div className="space-y-3">
            <p className="meta">/ direto</p>
            <a
              href="mailto:arthurgustavon@gmail.com"
              className="block font-display italic text-2xl md:text-3xl underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
            >
              arthurgustavon@gmail.com
            </a>
          </div>
        </motion.div>

        {/* right — form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7 lg:pl-10 lg:border-l lg:border-rule space-y-6"
        >
          <Field
            id="name"
            label="01 / nome"
            placeholder="seu nome completo"
            error={errors.name?.message}
            {...register('name')}
          />

          <Field
            id="email"
            type="email"
            label="02 / email"
            placeholder="você@dominio.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <FieldArea
            id="message"
            label="03 / mensagem"
            placeholder="me conta sobre o projeto, prazo, escopo, link do Figma…"
            error={errors.message?.message}
            {...register('message')}
          />

          <button
            type="submit"
            disabled={!isValid || isSubmitting || mutation.isPending}
            className="group relative w-full bg-foreground text-background py-4 font-mono text-sm uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-primary"
          >
            <span className="flex items-center justify-center gap-3">
              {mutation.isPending || isSubmitting ? 'enviando' : 'enviar mensagem'}
              <span className="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0">
                →
              </span>
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Field = (props: FieldProps) => {
  const { label, error, id, ...rest } = props
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="meta block">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full bg-transparent border-b border-rule focus:border-primary outline-none py-3 text-base placeholder:text-muted-foreground/60 transition-colors"
      />
      {error && <span className="meta text-destructive">! {error}</span>}
    </div>
  )
}

interface FieldAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

const FieldArea = (props: FieldAreaProps) => {
  const { label, error, id, ...rest } = props
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="meta block">
        {label}
      </label>
      <textarea
        id={id}
        rows={5}
        {...rest}
        className="w-full bg-transparent border-b border-rule focus:border-primary outline-none py-3 text-base placeholder:text-muted-foreground/60 transition-colors resize-none"
      />
      {error && <span className="meta text-destructive">! {error}</span>}
    </div>
  )
}
