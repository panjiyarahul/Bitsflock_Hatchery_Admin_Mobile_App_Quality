import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../constants/spacing';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  profileIntro: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarOuter: {
    width: moderateScale(112),
    height: moderateScale(112),
    borderRadius: moderateScale(56),
    backgroundColor: 'rgba(45, 97, 180, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarInner: {
    width: moderateScale(82),
    height: moderateScale(82),
    borderRadius: moderateScale(41),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  profileName: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },
  profileRole: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: 'rgba(45, 97, 180, 0.12)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: moderateScale(999),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(24),
    padding: SPACING.lg,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 5,
  },
  fieldBlock: {
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#F9FAFB',
  },
  label: {
    color: COLORS.secondary,
    fontSize: moderateScale(13),
    opacity: 0.58,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: COLORS.secondary,
    fontSize: moderateScale(17),
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: verticalScale(24),
  },
});
