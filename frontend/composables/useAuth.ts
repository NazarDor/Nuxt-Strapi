export const useAuth = () => {
    const token = useState('auth_token', () => null)
    const user = useState('auth_user', () => null)

    const login = async (identifier, password) => {
        const res = await $fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            body: { identifier, password },
        })
        token.value = res.jwt
        user.value = res.user
        if (import.meta.client) {
            localStorage.setItem('token', res.jwt)
        }
    }

    const fetchUser = async () => {
        if (!process.client) return
        const savedToken = localStorage.getItem('token')
        if (!savedToken) return

        token.value = savedToken
        try {
            user.value = await $fetch('http://localhost:1337/api/users/me', {
                headers: { Authorization: `Bearer ${savedToken}` }
            })
        } catch {
            logout()
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        if (import.meta.client) {
            localStorage.removeItem('token')
        }
    }

    return { token, user, login, fetchUser, logout }
}
