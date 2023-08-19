import { Pressable, Text, StyleSheet } from 'react-native'

type Props = {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({ number, isCurrent = false, onPageChange }: Props) {
  if (isCurrent) {
    return (
      <Pressable style={[s.button, s.current]} disabled>
        <Text style={s.text}>{number}</Text>
      </Pressable>
    )
  }

  return (
    <Pressable style={s.button} onPress={() => onPageChange(number)}>
      <Text style={s.text}>{number}</Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  current: {
    backgroundColor: 'orange',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
})
