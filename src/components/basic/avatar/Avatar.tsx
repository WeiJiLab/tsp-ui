import React from "react";
import { Avatar as AvatarComponent } from "antd";

import { AvatarProps } from 'antd/lib/avatar'

function handleError() {
  return true
}

export const Avatar: React.FC<AvatarProps> = props => {
  return (
      <AvatarComponent {...props} onError={handleError}/>
  )
}
