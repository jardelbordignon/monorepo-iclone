import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import { Animated } from 'react-native'

import { isWeb } from 'front/router'

type Props = {
  children: ReactNode
  duration?: number
  from?: number
  to?: number
}

export function Fade({
  children,
  duration = 1200,
  from = 0,
  to = 1,
}: Props): JSX.Element {
  const [animationApplied, setAnimationApplied] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimationApplied(true), duration)
  }, [])

  if (animationApplied) return <>{children}</>

  if (isWeb) {
    const id = Math.floor(Math.random() * 100000)

    const style = `
    @keyframes fade-${id} {
      from { opacity: ${from}; }
      to { opacity: ${to}; }
    }
    .with-fade-${id} { 
      animation: fade-${id} ${duration}ms;
    }`

    return (
      <>
        <style>{style}</style>
        <div className={`with-fade-${id}`}>{children}</div>
      </>
    )
  }

  const animatedValue = useRef(new Animated.Value(from)).current

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      duration,
      toValue: to,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={{ flex: 1, opacity: animatedValue }}
      onLayout={startAnimation}>
      {children}
    </Animated.View>
  )
}
