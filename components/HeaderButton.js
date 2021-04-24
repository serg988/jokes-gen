import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    IconSize={23}
    fontSize={44}
    color='#E8B975'
  />
)

export default CustomHeaderButton
