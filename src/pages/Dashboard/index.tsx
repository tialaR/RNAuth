import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user && user.name}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default Dashboard;
