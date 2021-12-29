import { useAsync } from '../index';
import Mock from 'mockjs';
import React from 'react';

const getUsername = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(Mock.mock('@name'));
      } else {
        reject(new Error('Failed to get username'));
      }
    }, 1000);
  });
};

export default () => {
  const [usernameData] = useAsync(getUsername);
  const { data, error, loading } = usernameData;

  console.log('usernameData', usernameData);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Username: {data}</div>;
};
