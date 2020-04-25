import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signed, signIn, user } = useAuth();

  console.log(signed);
  console.log(user);

  function handleSignIn() {
    signIn();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="SignIn" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
