import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import DashBoardStack from './DashboardStack';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/reducer/userReducer';

export type RootStackParamList = {
  AuthStack: undefined;
  DashBoardStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const userInfo = useSelector(selectUserInfo);
  const isLoggedIn = userInfo?.isLoggedIn;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="DashBoardStack" component={DashBoardStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
