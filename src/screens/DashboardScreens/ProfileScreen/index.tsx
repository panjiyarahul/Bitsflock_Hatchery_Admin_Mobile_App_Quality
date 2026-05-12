import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Container, Header } from '../../../components';
import { COLORS } from '../../../constants';
import { dashboardAPI } from '../../../redux/api/dashboardAPI';
import { profileAPI, useGetProfileQuery } from '../../../redux/api/profileAPI';
import { clearUser } from '../../../redux/reducer/userReducer';
import { clearUserDetail } from '../../../utils/helper';
import { styles } from './styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetProfileQuery();

  const profileFields = [
    { label: 'Name', value: data?.name },
    { label: 'Email', value: data?.email },
    { label: 'Phone Number 1', value: data?.phone_number_1 },
    { label: 'Phone Number 2', value: data?.phone_number_2 },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearUserDetail();
          dispatch(clearUser());
          dispatch(dashboardAPI.util.resetApiState());
          dispatch(profileAPI.util.resetApiState());
        },
      },
    ]);
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Profile" />

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileIntro}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={42} color={COLORS.primary} />
              </View>
            </View>

            <Text style={styles.profileName}>
              {data?.name?.trim() || 'User'}
            </Text>
            <Text style={styles.profileRole}>
              {data?.role?.trim() || 'Admin'}
            </Text>
          </View>

          <View style={styles.card}>
            {profileFields.map(field => (
              <View key={field.label} style={styles.fieldBlock}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.value}>{field.value?.trim() || '-'}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            backgroundColor={COLORS.primary}
            isLoading={isLoading || isFetching}
            onPress={handleLogout}
            title="Logout"
          />
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
