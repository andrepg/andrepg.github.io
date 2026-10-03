import type { IProject, IProjectMeta } from '@/interfaces'
import type { MessageResolver } from '@/types'

/**
 * Every valid project identifier.
 *
 * Adding a member here without adding the matching entry to `projects`
 * (or vice-versa) is a type error, so the two stay in sync by construction.
 *
 * The id doubles as the key under which the project's texts live, under `items`,
 * in `locale/<locale>/projects.json`. A closed union is also what lets
 * `getProjects` build its message key as a template literal instead of a
 * concatenation done by hand.
 */
export enum ProjectId {
  superCowScripts = 'superCowScripts',
  jetbrainsFlatpakPlugin = 'jetbrainsFlatpakPlugin',
  gtkCRenderer = 'gtkCRenderer',
  doIt = 'doIt',
  httpCodes = 'httpCodes',
  dotfiles = 'dotfiles',
  githubActions = 'githubActions',
  laravelSailPodman = 'laravelSailPodman'
}

/**
 * Published projects, as the catalog: what there is, where it lives and whether
 * it is worth showing on the homepage.
 *
 * `description` is translated text and lives in
 * `locale/<locale>/projects.json` — see `getProjects`. `label` stays here
 * because a project name is a proper noun.
 *
 * The order is the display order: the same list, in the same order, feeds the
 * index, the highlighted subset and the `ItemList` schema.
 */
export const projects: IProjectMeta[] = [
  {
    id: ProjectId.superCowScripts,
    label: 'SuperCow Scripts',
    target: 'https://andrepg.github.io/supercow',
    icon: 'hugeicons:ai-programming',
    highlight: true
  },
  {
    id: ProjectId.jetbrainsFlatpakPlugin,
    label: 'JetBrains Flatpak DevTools Plugin',
    target: 'https://github.com/andrepg/jetbrains-flatpak-plugin',
    icon: 'hugeicons:puzzle',
    highlight: true
  },
  {
    id: ProjectId.gtkCRenderer,
    label: 'GTK C Renderer',
    target: 'https://github.com/andrepg/gtk-headless-renderer',
    icon: 'hugeicons:clapperboard',
    highlight: true
  },
  {
    id: ProjectId.doIt,
    label: 'Do It',
    target: 'https://github.com/andrepg/do-it',
    icon: 'hugeicons:checkmark-square-02',
    highlight: true
  },
  {
    id: ProjectId.httpCodes,
    label: 'HTTP Codes',
    target: 'https://andrepg.github.io/http-codes/',
    icon: 'hugeicons:book-01',
    highlight: false
  },
  {
    id: ProjectId.dotfiles,
    label: '.dotfiles',
    target: 'https://github.com/andrepg/dotfiles/',
    icon: 'hugeicons:computer-terminal-01',
    highlight: true
  },
  {
    id: ProjectId.githubActions,
    label: 'GitHub Actions',
    target: 'https://github.com/andrepg/github-actions',
    icon: 'hugeicons:github',
    highlight: true
  },
  {
    id: ProjectId.laravelSailPodman,
    label: 'Laravel Sail Podman',
    target: 'https://github.com/Startap/sail-podman',
    icon: 'hugeicons:3-d-view',
    highlight: false
  }
]

/**
 * Published projects with their translated text, ready to display.
 *
 * The message key is assembled here and nowhere else: the catalog is the only
 * place that knows how many projects exist and what each one is called. Callers
 * receive plain strings, which is why the card and the JSON-LD builder do not
 * have to know that a project description is translated at all.
 *
 * @param t - Resolver of the active locale, handed over instead of imported so
 *   this module keeps no dependency on Vue and stays loadable by Node.
 */
export const getProjects = (t: MessageResolver): IProject[] =>
  projects.map((project) => ({
    ...project,
    description: t(`projects.items.${project.id}.description`)
  }))
