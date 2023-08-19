import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

import { isWeb } from 'front/router'

type Props = {
  children: ReactNode
  duration?: number
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}

export function Translate({
  children,
  duration = 1000,
  fromX,
  fromY = 50,
  toX = 0,
  toY = 0,
}: Props): JSX.Element {
  const [animationApplied, setAnimationApplied] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimationApplied(true), duration)
  }, [])

  if (animationApplied) return <>{children}</>

  const id = Math.floor(Math.random() * 100000)
  fromX = fromX ?? id % 2 ? 50 : -50

  if (isWeb) {
    const style = `
    @keyframes translate-${id} {
      from { transform: translate(${fromX}px, ${fromY}px); }
      to { transform: translate(${toX}px, ${toY}px); }
    }
    .with-translate-${id} { 
      animation: translate-${id} ${duration}ms;
    }`

    return (
      <>
        <style>{style}</style>
        <div className={`with-translate-${id}`}>{children}</div>
      </>
    )
  }

  const animatedValueX = useRef(new Animated.Value(fromX)).current
  const animatedValueY = useRef(new Animated.Value(fromY)).current

  const startAnimation = () => {
    Animated.timing(animatedValueX, {
      duration,
      toValue: toX,
      useNativeDriver: true,
    }).start()
    Animated.timing(animatedValueY, {
      duration,
      toValue: toY,
      useNativeDriver: true,
    }).start()
  }

  startAnimation()

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: animatedValueX }, { translateY: animatedValueY }],
      }}
      onLayout={startAnimation}>
      {children}
    </Animated.View>
  )
}
