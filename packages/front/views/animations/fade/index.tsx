import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Animated } from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  enableAnimation?: boolean
  from?: number
  isWeb: boolean
  onEndAnimation?: () => void
  to?: number
}

export function Fade({
  children,
  duration = 1200,
  enableAnimation = true,
  from = 0,
  isWeb,
  onEndAnimation,
  to = 1,
}: Props): JSX.Element {
  if (!enableAnimation) return <>{children}</>

  if (onEndAnimation) {
    setTimeout(onEndAnimation, duration)
  }

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
