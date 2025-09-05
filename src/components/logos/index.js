import React from 'react'
import {  appIcons ,appImages,appSvgs, responsiveWidth} from '../../services';
import * as Icons  from '../icons';

export const Primary = ({ size }) => {
  return (
    <Icons.Custom
    icon={appImages.mainlogo}
    size={size||responsiveWidth(50)}
    />
  );
}

export const PrimaryWhite = ({ size }) => {
  return (
    <Icons.Custom
    icon={appImages.mainlogo}
    size={size||responsiveWidth(50)}
    />
  );
}