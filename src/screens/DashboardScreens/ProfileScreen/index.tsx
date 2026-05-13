import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { Button, Container, Header } from '../../../components';
import { COLORS } from '../../../constants';
import { dashboardAPI } from '../../../redux/api/dashboardAPI';
import {
  profileAPI,
  useDeleteBreederFarmerMutation,
  useGetProfileQuery,
} from '../../../redux/api/profileAPI';
import { clearUser } from '../../../redux/reducer/userReducer';
import { clearUserDetail, errorMessage } from '../../../utils/helper';
import { styles } from './styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetProfileQuery();
  const [deleteBreederFarmer, { isLoading: isDeletingAccount }] =
    useDeleteBreederFarmerMutation();
  const [showAccountSecurity, setShowAccountSecurity] = useState(false);

  const profileFields = [
    { label: 'Name', value: data?.name },
    { label: 'Email', value: data?.email },
    { label: 'Phone Number 1', value: data?.phone_number_1 },
    { label: 'Phone Number 2', value: data?.phone_number_2 },
  ];

  const clearSession = async () => {
    await clearUserDetail();
    dispatch(clearUser());
    dispatch(dashboardAPI.util.resetApiState());
    dispatch(profileAPI.util.resetApiState());
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: clearSession,
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Do you want to delete account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const phonenumber =
            data?.phone_number_1?.trim() || data?.phone_number_2?.trim() || '';

          if (!phonenumber) {
            Toast.show('Phone number not found', Toast.SHORT);
            return;
          }

          try {
            const response = await deleteBreederFarmer(phonenumber).unwrap();
            Toast.show(
              response?.message || 'Account deleted successfully',
              Toast.SHORT,
            );
            await clearSession();
          } catch (error) {
            Toast.show(errorMessage(error), Toast.SHORT);
          }
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

          <Pressable
            accessibilityRole="button"
            onPress={() => setShowAccountSecurity(current => !current)}
            style={({ pressed }) => [
              styles.securityTab,
              pressed && styles.securityTabPressed,
            ]}
          >
            <Text style={styles.securityTabText}>Account Security</Text>
            <Ionicons
              name={
                showAccountSecurity
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={22}
              color={COLORS.secondary}
            />
          </Pressable>

          {showAccountSecurity ? (
            <View style={styles.securityCard}>
              <Pressable
                accessibilityRole="button"
                disabled={isDeletingAccount}
                onPress={handleDeleteAccount}
                style={({ pressed }) => [
                  styles.deleteAccountButton,
                  pressed && styles.securityTabPressed,
                  isDeletingAccount && styles.deleteAccountDisabled,
                ]}
              >
                <Text style={styles.deleteAccountText}>Delete Account</Text>
              </Pressable>
            </View>
          ) : null}
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
