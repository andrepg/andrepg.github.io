const SupportedLanguages: string[] = [
  'docker',
  'dockerfile',
  'gitignore',
  'ignore',
  'json',
  'markup',
  'css',
  'html',
  'javascript',
  'jsx',
  'tsx',
  'typescript',
  'php',
  'regex',
  'sql',
  'dart',
  'git',
  'yaml',
  'bash',
  'sh',
  'shell'
];

const SupportedPlugins: string[] = [
  'show-language',
  'line-numbers',
  'match-braces'
];

export const PrismJsConfig = {
  css: true,
  theme: 'tomorrow',
  languages: SupportedLanguages,
  plugins: SupportedPlugins
}