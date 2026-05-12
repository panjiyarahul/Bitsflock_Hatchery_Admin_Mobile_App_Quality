import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  keyboardContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: verticalScale(24),
    paddingBottom: verticalScale(40),
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(28),
  },
  logo: {
    width: moderateScale(280),
    height: verticalScale(130),
  },
  formContainer: {
    width: '100%',
  },
});
