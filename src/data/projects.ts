export type Project = {
  label: string
  target: string
  icon: string
  highlight: boolean
  description: string
}

export const Projects: Array<Project> = [
  {
    label: 'SuperCow Scripts',
    target: 'https://andrepg.github.io/supercow',
    icon: 'hugeicons:ai-programming',
    highlight: true,
    description: 'Uma coletânea de scripts para o desenvolvedor e administrador de sistemas'
  },
  {
    label: 'JetBrains Flatpak DevTools Plugin',
    target: 'https://github.com/andrepg/jetbrains-flatpak-plugin',
    icon: 'hugeicons:puzzle',
    highlight: true,
    description: 'Um plugin para integrar o SDK Flatpak e GNOME nas IDEs da JetBrains'
  },
  {
    label: 'GTK C Renderer',
    target: 'https://github.com/andrepg/gtk-headless-renderer',
    icon: 'hugeicons:puzzle',
    highlight: true,
    description: 'Um renderizador GTK para o plugin Flatpak DevTools'
  },
  {
    label: 'Do It',
    target: 'https://github.com/andrepg/do-it',
    icon: 'hugeicons:checkmark-square-02',
    highlight: true,
    description: 'Um To-Do extremamente simples para GNOME/Adwaita'
  },
  {
    label: 'HTTP Codes',
    target: 'https://andrepg.github.io/http-codes/',
    icon: 'hugeicons:book-01',
    highlight: false,
    description: 'App Flatpak com códigos HTTP com suas descrições e usos'
  },
  {
    label: '.dotfiles',
    target: 'https://github.com/andrepg/dotfiles/',
    icon: 'hugeicons:computer-terminal-01',
    highlight: true,
    description: 'Meus arquivos de configuração pessoais e personalizações de sistema'
  },
  {
    label: 'GitHub Actions',
    target: 'https://github.com/andrepg/github-actions',
    icon: 'hugeicons:github',
    highlight: true,
    description: 'Repositório com actions e workflows para o GitHub Actions'
  },
  {
    label: 'Laravel Sail Podman',
    target: 'https://github.com/Startap/sail-podman',
    icon: 'hugeicons:archive-03',
    highlight: false,
    description: 'Uma biblioteca PHP de compatibilidade entre o Laravel Sail e o Podman'
  }
]
