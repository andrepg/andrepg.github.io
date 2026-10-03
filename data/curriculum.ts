import type { ITimelineEntry, ITimelineItem } from '@/interfaces'
import type { MessageResolver } from '@/types'

import { TechnologyId } from './experience'

/**
 * Every valid timeline identifier.
 *
 * Adding a member here without adding the matching entry to `timeline`
 * (or vice-versa) is a type error, so the two stay in sync by construction.
 *
 * The id doubles as the key under which the entry's texts live, under `items`,
 * in `locale/<locale>/curriculum.json`. A closed union is also what lets
 * `getTimeline` build its message key as a template literal instead of a
 * concatenation done by hand.
 */
export enum TimelineId {
  startap = 'startap',
  xtreed = 'xtreed',
  siagri = 'siagri',
  abilityNegocios = 'abilityNegocios',
  santri = 'santri',
  infoMais = 'infoMais',
  artLens = 'artLens',
  abilityContabil = 'abilityContabil'
}

/**
 * Career entries, as the catalog: who worked where, and with what.
 *
 * `date`, `title` and `description` are translated text and live in
 * `locale/<locale>/curriculum.json` — see `getTimeline`. Two entries have no
 * description at all, which is why the message for those is an empty string
 * rather than a missing key.
 */
export const timeline: ITimelineEntry[] = [
  {
    id: TimelineId.startap,
    company: 'Startap Desenvolvimento Digital',
    stack: [
      TechnologyId.laravel,
      TechnologyId.wordpress,
      TechnologyId.linux,
      TechnologyId.nuxt,
      TechnologyId.typescript
    ]
  },
  {
    id: TimelineId.xtreed,
    company: 'Xtreed',
    stack: [
      TechnologyId.laravel,
      TechnologyId.react,
      TechnologyId.typescript,
      TechnologyId.aws,
      TechnologyId.gcp
    ]
  },
  {
    id: TimelineId.siagri,
    company: 'SIAGRI',
    stack: [TechnologyId.git, TechnologyId.windows]
  },
  {
    id: TimelineId.abilityNegocios,
    company: 'ABILITY Centro de Negócios',
    stack: [TechnologyId.windows, TechnologyId.linux]
  },
  {
    id: TimelineId.santri,
    company: 'Santri Sistemas',
    stack: []
  },
  {
    id: TimelineId.infoMais,
    company: 'InfoMais Sistemas',
    stack: [TechnologyId.windows, TechnologyId.linux]
  },
  {
    id: TimelineId.artLens,
    company: 'ART LENS Laboratório',
    stack: [TechnologyId.windows, TechnologyId.linux]
  },
  {
    id: TimelineId.abilityContabil,
    company: 'ABILITY Gestão Contábil',
    stack: [TechnologyId.windows, TechnologyId.linux]
  }
]

/**
 * Career entries with their translated text, ready to display.
 *
 * The message key is assembled here and nowhere else: the catalog is the only
 * place that knows how many entries exist and what each one is called. Callers
 * receive plain strings, which is why no view and no JSON-LD builder has to know
 * that a timeline entry is translated at all.
 *
 * `current` is interpolated into whichever date mentions it — only the entry
 * still running does — and ignored by the ones that are plain year ranges.
 *
 * @param t - Resolver of the active locale, handed over instead of imported so
 *   this module keeps no dependency on Vue and stays loadable by Node.
 */
export const getTimeline = (t: MessageResolver): ITimelineItem[] =>
  timeline.map((entry) => ({
    ...entry,
    date: t(`curriculum.items.${entry.id}.date`, { current: t('general.time.current') }),
    title: t(`curriculum.items.${entry.id}.title`),
    description: t(`curriculum.items.${entry.id}.description`)
  }))
