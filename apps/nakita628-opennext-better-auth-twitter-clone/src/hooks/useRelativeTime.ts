import { formatDistanceToNowStrict } from 'date-fns'
import { useMemo } from 'react'

export function useRelativeTime(dateString: string | undefined | null) {
  return useMemo(() => {
    if (!dateString) return null
    return formatDistanceToNowStrict(new Date(dateString))
  }, [dateString])
}
