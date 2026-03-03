import { supabase } from './supabase.js'

/**
 * Sign in a user with email and password.
 * @param {string} email 
 * @param {string} password 
 */
export async function signIn(email, password) {
    console.log('Attempting sign in for:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Sign in error:', error.message)
        throw error
    }

    console.log('Sign in successful, user ID:', data.user.id)

    // Fetch the user's role from the profiles table
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

    if (profileError) {
        console.error('Profile fetch error:', profileError.message)
        throw profileError
    }

    console.log('Profile found, role:', profile.role)
    return { user: data.user, role: profile.role }
}

/**
 * Sign out the current user.
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    window.location.href = 'index.html'
}

/**
 * Check if a user is logged in. Redirect to login if not.
 */
export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        window.location.href = 'index.html'
    }

    // Optionally: Verify the role again or fetch profile details
    return session
}
