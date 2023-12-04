import Select from 'react-select';

interface Option {
  label: string
  value: string
}

interface InputProps {
  options: Option[]
  onChange: (value: any) => void
}

export function SelectInput({ options, onChange }: InputProps) {
  return (
    <>
      <Select
        className='basic-single'
        onChange={(e) => onChange(e?.value)}
        defaultValue={options[0]}
        options={options}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'white',
            primary25: 'white'
          }
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'black',
            color: 'white'
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? 'white' : 'black',
            color: state.isFocused ? 'black' : 'white',
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: 'white'
          })
        }}
      />
    </>
  )
}
