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

    // Fetch the user's role: Try profiles table first, fallback to user_metadata
    let role = null

    try {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle() // Use maybeSingle instead of single so it doesn't throw a fatal error if row is missing

        if (!profileError && profile) {
            role = profile.role
        }
    } catch (err) {
        console.warn('Could not fetch from profiles table (might not exist):', err.message)
    }

    // Fallback to the role we saved in raw_user_meta_data during account creation
    if (!role && data.user.user_metadata && data.user.user_metadata.role) {
        console.log('Using role from user_metadata')
        role = data.user.user_metadata.role
    }

    if (!role) {
        // Default role if nothing else works so they don't get stuck
        console.warn('No role found, defaulting to student')
        role = 'student'
    }

    console.log('Final determined role:', role)
    return { user: data.user, role: role }
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
