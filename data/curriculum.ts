type TimelineItem = {
  title: string
  company: string
  date: string
  position: 'timeline-start' | 'timeline-middle' | 'timeline-end'
  description: string
  tags: string[]
}

export const timeline: Array<TimelineItem> = [
  {
    date: '01-2019 - atualmente',
    title: 'Founder (Freelancer/Part-Time)',
    company: 'Startap Desenvolvimento Digital',
    description:
      'Consultorias, criação e adaptação de processos, websites, sistemas internos e prestação de serviços de tecnologia.',
    tags: ['Laravel', 'WordPress', 'Linux', 'Nuxt'],
    position: 'timeline-start'
  },
  {
    date: '01-2023 - 06-2026',
    title: 'Software Engineer',
    company: 'Xtreed',
    description:
      'Criação de MVP para fintech de venda de produtos digitais. Usuários, produtos, vendas, checkout e integrações externas.',
    tags: ['Laravel', 'ReactJS', 'TypeScript', 'AWS', 'GCP'],
    position: 'timeline-end'
  }
]
