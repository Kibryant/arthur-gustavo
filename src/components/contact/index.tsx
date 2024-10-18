'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
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

  return {
    success: true,
  }
}

export function Contact() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
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
        title: 'Mensagem enviada com sucesso!',
        description: 'Em breve entrarei em contato com você.',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      })
    },
    onError: () => {
      toast({
        title: 'Erro ao enviar a mensagem',
        description: 'Por favor, tente novamente mais tarde.',
        variant: 'destructive',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      })
    },
  })

  const onSubmit = (data: ContactSchema) => {
    mutation.mutate(data)
  }

  return (
    <motion.section
      id="contato"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-primary">
        Entre em Contato
      </h2>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...register('name')} placeholder="Seu nome" />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register('email')}
            type="email"
            placeholder="Seu email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Sua mensagem"
            rows={4}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Botão de Envio */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-zinc-100"
          type="submit"
          disabled={!isValid || isSubmitting || mutation.isPending}
        >
          {mutation.isPending || isSubmitting
            ? 'Enviando...'
            : 'Enviar Mensagem'}
        </motion.button>
      </form>
    </motion.section>
  )
}
