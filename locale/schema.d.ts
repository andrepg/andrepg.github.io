/**
 * Declara o formato das mensagens do site para o vue-i18n.
 *
 * Isto é uma DECLARAÇÃO, não uma garantia de compilação. Uma chave errada em
 * `t()` ou `$t()` não falha o `yarn typecheck`: ela aparece em produção
 * renderizada como o próprio caminho. O motivo está na biblioteca —
 * `DefineLocaleMessage` estende `LocaleMessage<VueMessageType>`, que já carrega
 * um índice `[key: string]`, e o `RemoveIndexSignature` que o vue-i18n aplica
 * antes de derivar as chaves válidas leva o índice e os campos nomeados juntos.
 * Verificado nesta base com a augmentação daqui e com
 * `useI18n<[typeof messages], 'pt'>()`: nenhuma das duas formas estreita as
 * chaves.
 *
 * O arquivo fica pelo que ele é útil: um lugar único que descreve o formato e
 * que precisa ser atualizado quando um domínio novo entrar. Para pegar erro de
 * digitação, hoje quem avisa é o próprio vue-i18n no console durante o build —
 * vale rodar o `yarn build` depois de mexer nas chaves.
 */
import type blog from './pt/blog.json'
import type curriculum from './pt/curriculum.json'
import type general from './pt/general.json'
import type profile from './pt/profile.json'
import type projects from './pt/projects.json'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    blog: typeof blog
    curriculum: typeof curriculum
    general: typeof general
    profile: typeof profile
    projects: typeof projects
  }
}
