import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrower from 'expo-web-browser';

WebBrower.maybeCompleteAuthSession();

interface UserProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    signIn: () => Promise<void>
    isUserLoading: boolean
    user: UserProps
}

export const AuthContext = createContext({} as AuthContextDataProps)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '371009210580-pq5o9vbk6h44v5385olbqj90lf242p46.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync()
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(access_token: string) {
        console.log('CÓDIGO DE ACESSO ===>', access_token)
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response])

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}