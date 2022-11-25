import React from 'react';
import { Avatar as AvatarComponent, AvatarProps } from 'antd';

function handleError() {
  return true;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  return <AvatarComponent {...props} onError={handleError} />;
};
