import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function CruTextField(props) {
  const {
    displayName,
    pattern,
    maxLength,
    margin = "normal",
    ...remainingProps
  } = props;

  const textfieldProps = {
    fullWidth: true,
    margin,
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      "data-display-name": displayName,
      pattern,
      maxLength
    },
    ...remainingProps
  };
  return <TextField {...textfieldProps} />
}
