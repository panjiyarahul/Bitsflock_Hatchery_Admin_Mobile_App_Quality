import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../constants/dimensions';
import { COLORS } from '../../../constants';
import { SPACING } from '../../../constants/spacing';

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
  registerPromptContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  registerPromptText: {
    color: '#6B7280',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  registerPressed: {
    opacity: 0.72,
  },
});
