import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native'

import { themes } from 'front/themes'

export type ButtonProps = PressableProps & {
  isDisabled?: boolean
  isLoading?: boolean
  leftIcon?: string
  mb?: number
  ml?: number
  mr?: number
  mt?: number
  narrow?: boolean
  rightIcon?: string
  size?: 'sm' | 'md' | 'lg'
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({
  disabled,
  isDisabled,
  isLoading,
  leftIcon,
  mb,
  ml,
  mr,
  mt,
  narrow,
  rightIcon,
  size = 'md',
  title,
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  const colors = themes.colors['light']
  const isPrimary = variant === 'primary'

  const backgroundColors = {
    primary: colors[disabled ? 'primary-disable' : 'primary'],
    secondary: colors['background'],
  }
  const backgroundColor = backgroundColors[variant]
  const borderColor = colors[disabled ? 'primary-disable' : 'primary']
  const textColor =
    colors[disabled ? 'secondary' : isPrimary ? 'background' : 'primary']
  const rippleColor = colors[isPrimary ? 'primary' : 'secondary']
  const height = size === 'sm' ? 40 : size === 'md' ? 48 : 56
  const fontSize = size === 'sm' ? 14 : 16

  const spacer = narrow ? null : <View style={s.spacer} />

  const wrapperStyle = {
    backgroundColor,
    borderColor,
    height,
    marginBottom: mb ?? undefined,
    marginLeft: ml ?? undefined,
    marginRight: mr ?? undefined,
    marginTop: mt ?? undefined,
    opacity: !disabled && isDisabled ? 0.85 : 1,
    width: narrow ? undefined : ('100%' as never),
  }

  return (
    <View style={[s.wrapper, wrapperStyle]}>
      <Pressable
        disabled={disabled || isDisabled || isLoading}
        android_ripple={{ color: rippleColor }}
        style={({ pressed }) => [s.pressable, pressed && { opacity: 0.75 }]}
        {...rest}>
        <View style={s.container}>
          {
            //leftIcon ? <Icon name={leftIcon} color={textColor} size={20} /> : spacer
          }
          {isLoading ? (
            <ActivityIndicator
              testID="ActivityIndicator"
              color={textColor}
              size={Platform.OS === 'ios' ? height : height / 2.5}
            />
          ) : (
            <Text
              style={{
                color: textColor,
                fontFamily: 'Galano-Grotesque-SemiBold',
                fontSize,
              }}>
              {title}
            </Text>
          )}
          {
            //rightIcon ? <Icon name={rightIcon} color={textColor} size={20} /> : spacer
          }
        </View>
      </Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: {
    border: 2,
    borderRadius: 2,
    width: '100%',
  },
  pressable: {
    // h-full justify-center
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    // flex-row items-center justify-between gap-2 relative
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    pag: 8,
    position: 'relative',
  },
  spacer: {
    width: 8,
  },
})
