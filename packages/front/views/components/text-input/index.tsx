import { Ref, forwardRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native'
import MaskInput, { MaskInputProps, Masks } from 'react-native-mask-input'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { themes } from 'front/themes'

export type TextInputProps = Omit<MaskInputProps, 'mask'> & {
  error?: string
  helper?: string
  icon?: string
  iconsSize?: number
  isRequired?: boolean
  label?: string
  mask?: keyof typeof Masks
  mb?: number
  ml?: number
  mr?: number
  mt?: number
  narrow?: boolean
  noErrorMessage?: boolean
  onClearPress?: () => void
  onlySecureEntry?: boolean
  secureEntry?: boolean
}

const colors = themes.colors['light']

const TextInputBase = (
  {
    error,
    helper,
    icon,
    iconsSize = 24,
    isRequired,
    label,
    mask,
    mb,
    ml,
    mr,
    mt,
    narrow,
    noErrorMessage,
    onBlur,
    onClearPress,
    onFocus,
    onlySecureEntry,
    secureEntry,
    value = '',
    ...rest
  }: TextInputProps,
  ref?: Ref<RNTextInput>
) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secureEntry || onlySecureEntry)
  const [isFocused, setIsFocused] = useState(false)

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry)
  const iconsColor = colors.text

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    if (onFocus) onFocus(event)
  }

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    if (onBlur) onBlur(event)
  }

  const defineBorderColor = isFocused
    ? styles.borderOk
    : error
    ? styles.borderError
    : value
    ? styles.borderOk
    : null

  const wrapperStyle = {
    flex: 1,
    marginBottom: mb ?? undefined,
    marginLeft: ml ?? undefined,
    marginRight: mr ?? undefined,
    marginTop: mt ?? undefined,
    width: narrow ? undefined : ('100%' as any),
  }

  return (
    <View style={wrapperStyle}>
      {label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text>*</Text>}
        </Text>
      )}

      <View
        style={[
          styles.input,
          defineBorderColor,
          isFocused && styles.shadow,
          //{ paddingHorizontal: narrow ? (isIos ? 20 : 8) : 12 },
        ]}>
        {icon && (
          <View>
            {/* <Icon name={icon} color={iconsColor} size={iconsSize} /> */}
          </View>
        )}

        <MaskInput
          style={[styles.maskInput, { marginLeft: narrow ? 0 : 14 }]}
          textAlign={narrow ? 'center' : 'left'}
          placeholderTextColor={colors.secondary}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={value}
          secureTextEntry={isSecureEntry}
          mask={mask ? Masks[mask] : undefined}
          ref={ref}
          {...rest}
        />

        <View>
          {onClearPress && (
            <Pressable onPress={onClearPress}>
              {/* <Icon name="close" color="#CCCAC9" size={iconsSize} /> */}
            </Pressable>
          )}

          {secureEntry && (
            <Pressable onPress={toggleSecureEntry}>
              {/* <Icon
                name={isSecureEntry ? 'eye-off' : 'eye'}
                color={iconsColor}
                size={iconsSize}
              /> */}
            </Pressable>
          )}
        </View>
      </View>

      {error && !noErrorMessage ? (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorIcon}>
            {/* <Icon name="alert-circle" size={iconsSize} /> */}
          </Text>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : helper ? (
        <Text style={styles.helperMsg}>{helper}</Text>
      ) : null}
    </View>
  )
}

export const TextInput = forwardRef(TextInputBase)

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 8,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#222',
    height: 48,
  },
  maskInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    lineHeight: 20,
    marginRight: 8,
  },
  borderError: {
    borderBottomColor: colors.feedback.error,
    borderLeftColor: colors.feedback.error,
    borderRightColor: colors.feedback.error,
    borderTopColor: colors.feedback.error,
  },
  borderOk: {
    borderBottomColor: colors.primary,
    borderLeftColor: colors.primary,
    borderRightColor: colors.primary,
    borderTopColor: colors.primary,
  },
  shadow: {
    elevation: 6,
    boxShadowColor: colors.shadow,
    boxShadowOffset: {
      height: 0,
      width: 0,
    },
    boxShadowOpacity: 1,
    boxShadowRadius: 8,
  },
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorIcon: {
    color: colors.feedback.error,
    marginRight: 2,
  },
  errorMsg: {
    color: colors.feedback.error,
    fontSize: 14,
  },
  helperMsg: {
    color: colors.text,
    fontSize: 14,
  },
})
