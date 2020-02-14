import React, {FC} from 'react';
import {RegisterData, register} from '../../utils/users-requests';

const Example: FC<{}> = () => {
  const testData: RegisterData = {
    email: 'woah@gmail.com',
    password: 'woah1',
    username: 'woah',
  };

  return (
    <button onClick={() => register(testData)}>Click this shit boi!</button>
  );
};

export default Example;
