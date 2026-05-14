import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import images from '../../../assets';
import { Button, Container, Header, InputField } from '../../../components';
import { COLORS } from '../../../constants';
import type { AuthStackParamList } from '../../../navigation/AuthStack';
import { useRegisterMutation } from '../../../redux/api/userAPI';
import { errorMessage } from '../../../utils/helper';
import Toast from 'react-native-simple-toast';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const RegisterScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, 'RegisterScreen'>>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const isRegisterDisabled =
    !firstName.trim() ||
    !lastName.trim() ||
    !address.trim() ||
    !phoneNumber.trim() ||
    !password.trim() ||
    !confirmPassword.trim();

  const handleRegister = async () => {
    if (isRegisterDisabled || isLoading) {
      return;
    }

    if (password !== confirmPassword) {
      Toast.show('Password and confirm password do not match', Toast.SHORT);
      return;
    }

    try {
      const response = await register({
        firstName,
        lastName,
        address,
        phoneNumber1: phoneNumber,
        designation: 'tester',
        password,
        confirmPassword,
      }).unwrap();

      Toast.show(response?.message || 'Registration successful', Toast.SHORT);
      navigation.navigate('LoginScreen');
    } catch (error) {
      Toast.show(errorMessage(error), Toast.SHORT);
    }
  };

  return (
    <Container barStyle="dark-content" style={styles.container}>
      <Header title="Register" whiteBg />
      <KeyboardAwareScrollView
        bottomOffset={24}
        bounces={false}
        contentContainerStyle={styles.keyboardContent}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        mode="layout"
        showsVerticalScrollIndicator={false}
        style={styles.keyboardContainer}
      >
        <View style={styles.centerContent}>
          <View style={styles.logoContainer}>
            <Image
              source={images.qualitypoultry}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <InputField
              autoCapitalize="words"
              keyboardType="default"
              label="First Name"
              onChangeText={setFirstName}
              returnKeyType="next"
              value={firstName}
            />

            <InputField
              autoCapitalize="words"
              keyboardType="default"
              label="Last Name"
              onChangeText={setLastName}
              returnKeyType="next"
              value={lastName}
            />

            <InputField
              autoCapitalize="words"
              keyboardType="default"
              label="Address"
              onChangeText={setAddress}
              returnKeyType="next"
              value={address}
            />

            <InputField
              autoCapitalize="none"
              keyboardType="phone-pad"
              label="Phone Number"
              onChangeText={setPhoneNumber}
              returnKeyType="next"
              value={phoneNumber}
            />

            <InputField
              autoCapitalize="none"
              label="Password"
              onChangeText={setPassword}
              returnKeyType="done"
              secureTextEntry
              value={password}
            />

            <InputField
              autoCapitalize="none"
              label="Confirm Password"
              onChangeText={setConfirmPassword}
              returnKeyType="done"
              secureTextEntry
              value={confirmPassword}
            />

            <Button
              backgroundColor={COLORS.primary}
              disabled={isRegisterDisabled}
              isLoading={isLoading}
              onPress={handleRegister}
              title="Register"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RegisterScreen;
