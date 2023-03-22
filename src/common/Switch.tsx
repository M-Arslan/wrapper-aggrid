import React from 'react'
import {Switch as MuiSwitch, SwitchProps} from '@mui/material'

const Switch:React.FC<SwitchProps> = (props) => {
  return (
    <MuiSwitch {...props} />
  )
}

export default Switch