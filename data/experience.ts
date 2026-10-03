import type { ITechnology } from '@/interfaces';

/**
 * Every valid technology identifier.
 *
 * Adding a member here without adding the matching entry to `Technologies`
 * (or vice-versa) is a type error, so the two stay in sync by construction.
 */
export enum TechnologyId {
  laravel = 'laravel',
  html = 'html',
  css = 'css',
  php = 'php',
  wordpress = 'wordpress',
  react = 'react',
  nextjs = 'nextjs',
  vuejs = 'vuejs',
  nodejs = 'nodejs',
  nestjs = 'nestjs',
  typescript = 'typescript',
  git = 'git',
  github = 'github',
  aws = 'aws',
  gcp = 'gcp',
  docker = 'docker',
  linux = 'linux',
  windows = 'windows',
  nuxt = 'nuxt'
}

export const Technologies: ITechnology[] = [
  {
    id: TechnologyId.laravel,
    label: 'Laravel',
    target: 'https://laravel.com/',
    icon: 'simple-icons:laravel',
    recommended: true
  },
  {
    id: TechnologyId.html,
    label: 'HTML',
    target: 'https://www.w3.org/html/',
    icon: 'mdi:language-html5',
    recommended: false
  },
  {
    id: TechnologyId.css,
    label: 'CSS',
    target: 'https://www.w3.org/Style/CSS/',
    icon: 'mdi:language-css3',
    recommended: false
  },
  {
    id: TechnologyId.php,
    label: 'PHP',
    target: 'https://php.net/',
    icon: 'ri:php-line',
    recommended: false
  },
  {
    id: TechnologyId.wordpress,
    label: 'WordPress',
    target: 'https://wordpress.org/',
    icon: 'mdi:wordpress',
    recommended: true
  },
  {
    id: TechnologyId.react,
    label: 'React',
    target: 'https://reactjs.org/',
    icon: 'simple-icons:react',
    recommended: true
  },
  {
    id: TechnologyId.nextjs,
    label: 'Next.js',
    target: 'https://nextjs.org/',
    icon: 'simple-icons:nextdotjs',
    recommended: true
  },
  {
    id: TechnologyId.vuejs,
    label: 'VueJS',
    target: 'https://vuejs.org',
    icon: 'simple-icons:vuedotjs',
    recommended: true
  },
  {
    id: TechnologyId.nodejs,
    label: 'Node.js',
    target: 'https://nodejs.org/',
    icon: 'simple-icons:nodedotjs',
    recommended: false
  },
  {
    id: TechnologyId.nestjs,
    label: 'Nest.js',
    target: 'https://nestjs.com/',
    icon: 'simple-icons:nestjs',
    recommended: false
  },

  {
    id: TechnologyId.typescript,
    label: 'TypeScript',
    target: 'https://www.typescriptlang.org/',
    icon: 'mdi:language-typescript',
    recommended: true
  },
  {
    id: TechnologyId.git,
    label: 'Git',
    target: 'https://git-scm.com/',
    icon: 'mdi:git',
    recommended: true
  },
  {
    id: TechnologyId.github,
    label: 'GitHub',
    target: 'https://github.com/',
    icon: 'mdi:github',
    recommended: false
  },
  {
    id: TechnologyId.aws,
    label: 'AWS',
    target: 'https://aws.amazon.com/',
    icon: 'mdi:aws',
    recommended: true
  },
  {
    id: TechnologyId.gcp,
    label: 'GCP',
    target: 'https://cloud.google.com/',
    icon: 'simple-icons:googlecloud',
    recommended: false
  },
  {
    id: TechnologyId.docker,
    label: 'Docker',
    target: 'https://www.docker.com/',
    icon: 'mdi:docker',
    recommended: false
  },
  {
    id: TechnologyId.linux,
    label: 'Linux',
    target: 'https://www.linux.org/',
    icon: 'simple-icons:linux',
    recommended: true
  },
  {
    id: TechnologyId.windows,
    label: 'Windows',
    target: 'https://www.microsoft.com/',
    icon: 'mdi:microsoft-windows',
    recommended: false
  },
  {
    id: TechnologyId.nuxt,
    label: 'Nuxt',
    target: 'https://nuxt.com/',
    icon: 'simple-icons:nuxt',
    recommended: false
  }
]

const tecnologiasById = new Map(Technologies.map((tecnologia) => [tecnologia.id, tecnologia]))

/**
 * Resolves technology ids into their full definitions, so consumers get the
 * icon and label straight from `Technologies` instead of hardcoding strings.
 */
export const getTecnologias = (ids: TechnologyId[]): ITechnology[] =>
  ids.map((id) => {
    const tecnologia = tecnologiasById.get(id)

    if (!tecnologia) {
      throw new Error(`Tecnologia não encontrada em Technologies: "${id}"`)
    }

    return tecnologia
  })

/** The subset flagged as `recommended`, rendered in the profile card. */
export const getRecommendedTecnologias = (): ITechnology[] =>
  Technologies.filter((tecnologia) => tecnologia.recommended)