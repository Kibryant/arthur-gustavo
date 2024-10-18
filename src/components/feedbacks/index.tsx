'use client'

import FeedbacksSwiper from './feedbacks-swiper'

const feedbacks = [
  {
    id: 1,
    name: 'Ana Clara',
    role: 'Nutricionista',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'Oie Arthur, boa noite! Queria agradecer pelo seu trabalho excepcional na criação do meu site 🥹 Eu sempre achei que site não funcionaria, mas o formato que você fez e na velocidade que é, fez toda a diferença pra mim, porque meu público tá acessando com mais facilidade ❤️ obrigada mesmoooo, vou te indicar pra todo mundo',
    rating: 5,
  },
  {
    id: 2,
    name: 'João Navarro',
    role: 'Treinador',
    avatar: '/placeholder.svg?height=100&width=100',
    content:
      'Faaaaala Arthurzeira!! Irmão, passando aqui pra te falar que seu trabalho é simplesmente sensacional… sério! Você me surpreendeu com os dois serviços que fez pra mim, conseguindo entregar além do que eu imaginava… você foi fantástico! Estou extremamente satisfeito com os resultados! Você é realmente um profissional diferenciado, sempre procura dar todo o suporte necessário, super paciente e solícito, de bom coração, com princípios e valores nobres! Continue assim, você tem tudo pra fazer muito sucesso na vida! Que mais pessoas tenham a oportunidade de ter os seus desejos atendidos de forma tão eficaz, como o que você fez nos meus dois sites! Deus te abençoe! Muito obrigado! 🙏🏻',
    rating: 5,
  },
]

export function Feedbacks() {
  return (
    <div className="w-full py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-primary">
        O que os meus clientes dizem
      </h2>
      <div className="relative">
        <FeedbacksSwiper feedbacks={feedbacks} />
      </div>
    </div>
  )
}
