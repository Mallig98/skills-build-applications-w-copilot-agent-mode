import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../api.js'

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results
  }

  throw new Error('The API returned an unsupported collection response.')
}

export default function useFetchCollection(endpoint, fetcher = fetch) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(`${apiBaseUrl}${endpoint}`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.error || `Request failed with status ${response.status}.`)
        }

        setItems(getCollection(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()

    return () => controller.abort()
  }, [endpoint, fetcher])

  return { items, error, loading }
}
