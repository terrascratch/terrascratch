import Select from 'react-select';
import { useEffect } from 'react';
import { InputProps } from '.';


export function SelectInput({ options, onChange }: InputProps) {
  if (!options) {
    throw new Error('Select input must have options');
  }

  useEffect(() => {
    onChange(options[0].value);
  }, [])

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
          backgroundColor: '#212121',
          color: 'white',
          opacity: 0.75
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? '#212121' : 'white',
          color: state.isFocused ? 'white' : '#212121',
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white'
        })
      }}
    />
  )
}
