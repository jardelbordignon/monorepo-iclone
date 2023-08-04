import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Animated } from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  enableAnimation?: boolean
  fromX?: number
  fromY?: number
  isWeb: boolean
  onEndAnimation?: () => void
  toX?: number
  toY?: number
}

export function Translate({
  children,
  duration = 1000,
  enableAnimation = true,
  fromX,
  fromY = 50,
  isWeb,
  onEndAnimation,
  toX = 0,
  toY = 0,
}: Props): JSX.Element {
  if (!enableAnimation) return <>{children}</>

  if (onEndAnimation) {
    setTimeout(onEndAnimation, duration)
  }

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
