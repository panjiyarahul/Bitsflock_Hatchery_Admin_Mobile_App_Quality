import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../../constants/spacing';
import { COLORS } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  heroCard: {
    backgroundColor: '#111418',
    borderRadius: moderateScale(24),
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(24),
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    color: '#D7DEE7',
    fontSize: moderateScale(14),
    marginBottom: SPACING.md,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191F26',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroStatLabel: {
    color: '#8B96A3',
    fontSize: moderateScale(11),
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroStatValue: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(22),
    padding: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.sm,
  },
  gridItem: {
    width: '48%',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#F9FAFB',
  },
  label: {
    color: COLORS.secondary,
    fontSize: moderateScale(12),
    opacity: 0.6,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: COLORS.secondary,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
