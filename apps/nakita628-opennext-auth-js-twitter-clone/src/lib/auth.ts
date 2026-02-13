export async function signIn(
  email: string,
  password: string,
): Promise<{ ok: boolean; error: string | undefined }> {
  try {
    const csrfRes = await fetch('/api/auth/csrf')
    const { csrfToken } = (await csrfRes.json()) as { csrfToken: string }

    const res = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        csrfToken,
        email,
        password,
      }),
      redirect: 'follow',
    })

    if (res.ok) {
      return { ok: true, error: undefined }
    }

    return { ok: false, error: 'ログインに失敗しました' }
  } catch {
    return { ok: false, error: 'ログインに失敗しました' }
  }
}
