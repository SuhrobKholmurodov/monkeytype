import { useEffect, useState } from 'react'
export const useDarkSide = () => {
  const [theme, setTheme] = useState<string>(localStorage.theme || 'light')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, colorTheme])

  return [colorTheme, setTheme] as const
}
