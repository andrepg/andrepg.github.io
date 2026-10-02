import type { ITimelineItem } from '@/interfaces';

import { TechnologyId } from './experience'

export const timeline: ITimelineItem[] = [
  {
    date: '2019 - atualmente',
    title: 'Founder (Freelancer/Part-Time)',
    company: 'Startap Desenvolvimento Digital',
    description:
      'Engenharia de uma plataforma SaaS de e-commerce educacional com mais de 5 mil vendas ' +
      'e uma receita global de seis dígitos, com foco em evolução da aplicação, modernização ' +
      'arquitetural e implantação de infraestrutura.',
    stack: [
      TechnologyId.laravel,
      TechnologyId.wordpress,
      TechnologyId.linux,
      TechnologyId.nuxt,
      TechnologyId.typescript
    ]
  },
  {
    date: '2023-2026',
    title: 'Software Engineer',
    company: 'Xtreed',
    description:
      'Construção de aplicações open & closed source, sob medida, otimização de páginas de ' +
      'captura digital com tratamento de milhares de leads e consultoria técnica estratégica na ' +
      'implementação de ERP para empresas com centenas de transações mensais.',
    stack: [
      TechnologyId.laravel,
      TechnologyId.react,
      TechnologyId.typescript,
      TechnologyId.aws,
      TechnologyId.gcp
    ]
  },
  {
    date: '2020-2021',
    title: 'Software Developer',
    description:
      'Manutenção e expansão de um ERP corporativo do setor agrícola desenvolvido em Delphi 7 ' +
      'e Microsoft SQL Server, atendendo a centenas de clientes corporativos de agronegócio em ' +
      'todo o país',
    company: 'SIAGRI',
    stack: []
  },
  {
    date: '2017-2019',
    title: 'Gestor Financeiro',
    description:
      'Gestão da administração financeira de um escritório de contabilidade e de clientes ' +
      'externos, conectando controles financeiros a processos fiscais para uma carteira de 80 ' +
      'clientes corporativos.',
    company: 'ABILITY Centro de Negócios',
    stack: []
  },
  {
    date: '2017',
    title: 'Software Developer',
    description:
      'Desenvolvimento de uma aplicação ERP corporativa desktop utilizada por centenas de ' +
      'negócios varejistas, com gestão de catálogos de estoque superiores a 1.500 itens ' +
      'cadastrados.',
    company: 'Santri Sistemas',
    stack: []
  },
  {
    date: '2017',
    title: 'Software Developer / P & D / Automação',
    description:
      'Construção de ferramentas de software internas e externas, com assistência técnica ' +
      'avançada a mais de 40 contas corporativas que gerenciam centenas de transações ' +
      'semanais de venda.',
    company: 'InfoMais Sistemas',
    stack: []
  },
  {
    date: '2009-2010',
    title: 'Administrador de Sistemas e Redes',
    description: '',
    company: 'ART LENS Laboratório',
    stack: []
  },
  {
    date: '2007-2009',
    title: 'Administrador de Sistemas e Redes',
    description: '',
    company: 'ABILITY Gestão Contábil',
    stack: []
  }
]
