import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../constants/spacing';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  profileIconContainer: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(26),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    marginRight: SPACING.md,
  },
  pressablePressed: {
    opacity: 0.82,
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: verticalScale(4),
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  contentSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginTop: -verticalScale(12),
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBody: {
    paddingBottom: SPACING.xl,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  roleText: {
    color: COLORS.primary,
    fontSize: moderateScale(15),
    fontWeight: '700',
    marginLeft: SPACING.xs,
  },
  companyText: {
    color: COLORS.secondary,
    fontSize: moderateScale(17),
    fontWeight: '500',
    marginBottom: SPACING.md,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.md,
  },
  card: {
    width: '47.5%',
    minHeight: verticalScale(62),
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#F2F2F6',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    justifyContent: 'center',
  },
  darkCard: {
    backgroundColor: COLORS.primary,
  },
  darkCardTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginTop: verticalScale(8),
  },
  lightCardTitle: {
    color: '#262626',
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginTop: verticalScale(8),
  },
  stockCard: {
    backgroundColor: COLORS.secondary,
  },
  stockCount: {
    color: '#FFFFFF',
    fontSize: moderateScale(24),
    fontWeight: '800',
    marginBottom: verticalScale(2),
  },
  stockLabel: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  activeFlockSection: {
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  flockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  flockCardWrap: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  flockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  flockTitle: {
    color: '#121212',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  flockAgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flockAgeText: {
    color: '#121212',
    fontSize: moderateScale(17),
    fontWeight: '700',
    marginLeft: SPACING.xs,
  },
  flockFieldsList: {
    rowGap: SPACING.sm,
  },
  flockFieldLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  flockFieldLabel: {
    color: '#1E1E1E',
    fontSize: moderateScale(15),
    fontWeight: '700',
    lineHeight: moderateScale(22),
  },
  flockFieldValue: {
    color: COLORS.primary,
    fontSize: moderateScale(15),
    fontWeight: '700',
    flexShrink: 1,
    lineHeight: moderateScale(22),
  },
  flockFieldMeta: {
    color: '#1E1E1E',
    fontSize: moderateScale(15),
    fontWeight: '700',
    flexShrink: 1,
    lineHeight: moderateScale(22),
  },
  emptyStateCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  emptyStateText: {
    color: '#5E5E5E',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
});
