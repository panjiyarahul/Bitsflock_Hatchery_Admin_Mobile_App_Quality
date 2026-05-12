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
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  card: {
    backgroundColor: '#111418',
    borderRadius: moderateScale(24),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 6,
  },
  cardPressed: {
    opacity: 0.82,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  flockName: {
    flex: 1,
    marginRight: SPACING.sm,
    color: '#FFFFFF',
    fontSize: moderateScale(22),
    fontWeight: '800',
  },
  breedText: {
    color: '#D7DEE7',
    fontSize: moderateScale(14),
    flex: 1,
  },
  agePill: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(999),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageBadgeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
    marginLeft: SPACING.xs,
  },
  breedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  breedIconWrap: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: 'rgba(45, 97, 180, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  metricStrip: {
    backgroundColor: '#191F26',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  metricBlock: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  label: {
    color: '#8B96A3',
    fontSize: moderateScale(11),
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  valuePrimary: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  footerInfoWrap: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: SPACING.sm,
    rowGap: SPACING.xs,
  },
  footerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerInfoLabel: {
    color: '#AEB8C4',
    fontSize: moderateScale(13),
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm,
    minWidth: moderateScale(88),
  },
  footerInfoValue: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    padding: SPACING.lg,
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  emptyText: {
    color: '#5E6B7A',
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
});
