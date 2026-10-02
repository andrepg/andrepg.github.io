import type { IUserConfig } from '@/interfaces'
import APP_CONFIG from '@config/app'

export const UserConfig: IUserConfig = Object.freeze({
  website: {
    name: 'André Paul Grandsire ',
    url: APP_CONFIG.ORIGIN,
    description: 'Website pessoal de André Paul Grandsire',
    image: `${APP_CONFIG.ORIGIN}/android-chrome-512x512.png`
  },
  author: {
    name: 'André Paul Grandsire',
    avatar: 'https://github.com/andrepg.png',
    role: 'Programador Full Stack',
    biography:
      'Mais de 15 anos trabalhando com tecnologia. Programador Full Stack e desenvolvedor Open Source. ' +
      '\nDou consultorias, crio sites, estratégias digitais e serviços particulares. Especialista em processos ERP.',
    shortBiography:
      'Programador desde 2014, criando soluções mobile, web e desktop. Apaixonado por novas tecnologias.'
  }
})
