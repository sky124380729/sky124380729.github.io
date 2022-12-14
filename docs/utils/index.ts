export const dynamicImport = (module?: string) => {
  if (module) {
    const modules = import.meta.glob('../snippets/**/*.{ts,js}', { import: 'default' })
    const keys = Object.keys(modules)
    const matchKeys = keys.filter((key) => {
      const k = key.replace('../snippets', '')
      return k.startsWith(`${module}`) || k.startsWith(`/${module}`)
    })
    // specify exact file path
    if (matchKeys?.length === 1) {
      const matchKey = matchKeys[0]
      return modules[matchKey]
    }
    // specify a directory to extract index.js or index.ts
    // extract the first directory matched
    if (matchKeys?.length > 1) {
      const matchKey = matchKeys.sort((a, b) => a.length - b.length)[0]
      return modules[matchKey]
    }
  }
  return () => Promise.reject(`can't find ${module}`)
}
