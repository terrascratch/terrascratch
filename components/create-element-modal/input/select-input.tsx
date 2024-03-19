import Select from 'react-select';
import { InputProps } from '.';


export function SelectInput({ property, options, onChange }: InputProps) {
  if (!options) {
    throw new Error('Select input must have options');
  }

  return (
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
  )
}
