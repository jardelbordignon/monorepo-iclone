import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { TextInput, TextInputProps } from '../text-input'

type InputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, string>
  name: Path<T>
}

export function Input<T extends FieldValues>({
  control,
  name,
  ...rest
}: InputProps<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, ref, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={!value ? undefined : value}
          onBlur={onBlur}
          ref={ref}
          id={name}
          {...rest}
        />
      )}
    />
  )
}
