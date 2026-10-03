/**
 * Declara o formato das mensagens do site para o vue-i18n.
 *
 * A forma vem de `pt`, o que faz `createI18n` recusar qualquer idioma que não a
 * cubra inteira. Isso é verificado: remover `nav.selectTheme` de
 * `locale/es/general.json` faz `yarn typecheck` falhar, nomeando a chave. É o
 * que impede um idioma de ficar com um buraco — que é a falha que o runtime
 * esconde melhor, já que `DEFAULT_LOCALE` é o fallback e a chave esquecida
 * simplesmente responde em português, sem aviso e sem erro.
 *
 * ## O que esta augmentação NÃO garante
 *
 * Ela não faz o typecheck pegar chave errada escrita à mão em `t()` ou `$t()`.
 * Também foi verificado: `t('general.nav.chaveQueNaoExiste')` e
 * `$t('projects.titleX')` passam. Passar o schema ao `createI18n` ou ao
 * `useI18n` como parâmetro de tipo não estreita nada — também verificado.
 *
 * O motivo é o índice. `DefineLocaleMessage` estende
 * `LocaleMessage<VueMessageType>`, que já traz `[key: string]`, e o
 * `RemoveIndexSignature` que o vue-i18n aplica preserva os campos nomeados o
 * suficiente para validar a forma de `messages` — mas o mesmo índice faz as
 * chaves de chamada aceitarem qualquer string.
 *
 * Para erro de digitação em chamada, o que avisa hoje é o console do vue-i18n
 * durante o build, quando a chave não existe em nenhum idioma. Vale rodar
 * `yarn build` depois de mexer nas chaves.
 *
 * ## Domínio novo
 *
 * É uma pasta de idioma, uma linha em `locale/pt/index.ts`, e a entrada
 * aqui. O `locale/<idioma>/` correspondente não é preciso travar contra este
 * arquivo: o próprio `createI18n` cobra.
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
