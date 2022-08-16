import React, { useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import './selector.scss';

const SelectorMatches = ({ title, options, onPress }) => {

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onPress(title.value, event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{title.name}</InputLabel>
      <Select
        value={value}
        label={value}
        onChange={handleChange}
      >
        <MenuItem value={''}>Все</MenuItem>;
        {options.map((item, i) => {
          return <MenuItem key={i} value={item.value}>{item.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default SelectorMatches;