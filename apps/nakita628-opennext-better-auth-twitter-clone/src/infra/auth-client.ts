/**
 * Better Auth Client (Frontend)
 *
 * Handles authentication on the client side (sign in, sign out, sign up).
 * This client talks directly to Better Auth endpoints at `/api/auth/*`.
 *
 * Used by:
 *   - LoginModal   → authClient.signIn.email({ email, password })
 *   - RegisterModal → authClient.signIn.email() (auto-login after register)
 *   - Sidebar       → authClient.signOut()
 *   - ChangePasswordModal → authClient.changePassword()
 *
 * Note: Registration itself goes through our custom `/api/register` endpoint
 *       (via usePostRegister hook), then auto-signs in via Better Auth.
 */
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  basePath: '/api/auth',
})
