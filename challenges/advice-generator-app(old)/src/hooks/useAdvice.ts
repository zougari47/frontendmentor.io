import { useState, useEffect } from 'react'

interface IAdvice {
  slip: { id: number; advice: string }
}

const useAdvice = () => {
  const [advice, setAdvice] = useState<IAdvice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getNewAdvice = () => {
    setLoading(true)

    fetch('https://api.adviceslip.com/advice', {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .then((res) => setAdvice(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => getNewAdvice(), [])

  return { advice, loading, error, getNewAdvice }
}

export default useAdvice
