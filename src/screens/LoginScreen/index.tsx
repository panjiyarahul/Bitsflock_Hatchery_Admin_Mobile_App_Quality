import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { getAppLogo } from '../../assets';
import { Button, Container, InputField } from '../../components';
import { COLORS } from '../../constants';
import { useLoginMutation } from '../../redux/api/userAPI';
import { errorMessage } from '../../utils/helper';
import Toast from 'react-native-simple-toast';
import { styles } from './styles';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();

  const isLoginDisabled = !userName.trim() || !password.trim();

  const handleLogin = async () => {
    if (isLoginDisabled || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const session = await login({
        userName: userName,
        password,
      }).unwrap();

      if (session?.accessToken) {
        Toast.show('Login successful', Toast.SHORT);
      }
    } catch (error) {
      Toast.show(errorMessage(error), Toast.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container barStyle="dark-content">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
        style={styles.keyboardContainer}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.keyboardContent}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.keyboardContainer}
        >
          <View style={styles.centerContent}>
            <View style={styles.logoContainer}>
              <Image
                source={getAppLogo()}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formContainer}>
              <InputField
                autoCapitalize="none"
                keyboardType="default"
                label="Phone number / User Name"
                onChangeText={setUserName}
                returnKeyType="next"
                value={userName}
              />

              <InputField
                autoCapitalize="none"
                label="Password"
                onChangeText={setPassword}
                returnKeyType="done"
                secureTextEntry
                value={password}
              />

              <Button
                backgroundColor={COLORS.primary}
                disabled={isLoginDisabled}
                isLoading={isLoading}
                onPress={handleLogin}
                title="Login"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;
