import { useEffect, useState } from 'react'

export default function TypewriterText({
  phrases,
  text,
  typingSpeed = 75,
  deletingSpeed = 45,
  pause = 3000,
}) {
  const [visibleText, setVisibleText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const phraseList = phrases ?? [text]
  const currentPhrase = phraseList[phraseIndex]
  const isPaused = visibleText === currentPhrase && !isDeleting

  useEffect(() => {
    const isComplete = visibleText === currentPhrase
    const isCleared = visibleText === ''
    const delay = isComplete && !isDeleting ? pause : isDeleting ? deletingSpeed : typingSpeed

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (isCleared && isDeleting) {
        setIsDeleting(false)
        setPhraseIndex((currentIndex) => (currentIndex + 1) % phraseList.length)
        return
      }

      setVisibleText((currentText) =>
        isDeleting
          ? currentPhrase.slice(0, currentText.length - 1)
          : currentPhrase.slice(0, currentText.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timer)
  }, [
    currentPhrase,
    deletingSpeed,
    isDeleting,
    pause,
    phraseList.length,
    typingSpeed,
    visibleText,
  ])

  return (
    <span
      className={`typewriter-text ${isPaused ? 'typewriter-text-paused' : ''}`}
      aria-label={phraseList.join(' ')}
    >
      <span aria-hidden="true">{visibleText}</span>
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  )
}
