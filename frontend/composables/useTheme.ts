// composables/useTheme.ts
import { useState } from '#app'

export function useTheme() {
    const theme = useState<'light' | 'dark'>('theme', () => 'light')

    const applyTheme = (value: 'light' | 'dark') => {
        const root = document.documentElement
        if (value === 'dark') {
            root.classList.add('my-app-dark')
        } else {
            root.classList.remove('my-app-dark')
        }
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        applyTheme(theme.value)
        localStorage.setItem('theme', theme.value)
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (savedTheme) {
            theme.value = savedTheme
        } else {
            // Можно добавить автоопределение темы по prefers-color-scheme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            theme.value = prefersDark ? 'dark' : 'light'
        }
        applyTheme(theme.value)
    })

    return { theme, toggleTheme }
}
