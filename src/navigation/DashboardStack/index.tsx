import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  ProfileScreen,
  FlockListScreen,
  PenListScreen,
  FlockFarmListScreen,
  FlockReportScreen,
  FeedProgramScreen,
  ClosedBatchesListScreen,
  ClosedBatchesFlocksScreen,
  SalesReportListScreen,
  SalesDetailsScreen,
} from '../../screens';

export type AuthStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  FlockListScreen: undefined;
  PenListScreen: { id?: number; flockName?: string } | undefined;
  FlockFarmListScreen: undefined;
  FlockReportScreen: undefined;
  FeedProgramScreen: { id?: number | string } | undefined;
  ClosedBatchesListScreen: undefined;
  ClosedBatchesFlocksScreen: undefined;
  SalesReportListScreen: undefined;
  SalesDetailsScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const DashBoardStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="FlockListScreen" component={FlockListScreen} />
    <Stack.Screen name="PenListScreen" component={PenListScreen} />
    <Stack.Screen name="FlockFarmListScreen" component={FlockFarmListScreen} />
    <Stack.Screen name="FlockReportScreen" component={FlockReportScreen} />
    <Stack.Screen name="FeedProgramScreen" component={FeedProgramScreen} />
    <Stack.Screen
      name="ClosedBatchesListScreen"
      component={ClosedBatchesListScreen}
    />
    <Stack.Screen
      name="ClosedBatchesFlocksScreen"
      component={ClosedBatchesFlocksScreen}
    />
    <Stack.Screen
      name="SalesReportListScreen"
      component={SalesReportListScreen}
    />
    <Stack.Screen name="SalesDetailsScreen" component={SalesDetailsScreen} />
  </Stack.Navigator>
);

export default DashBoardStack;
