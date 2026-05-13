import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../../constants/spacing';

const weekColumnWidth = moderateScale(50);
const cellWidth = moderateScale(92);
const headerCellHeight = moderateScale(52);
const groupTitleHeight = moderateScale(40);
const bodyRowHeight = moderateScale(46);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tableArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  topStickyRow: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  weekHeaderColumn: {
    width: weekColumnWidth,
    backgroundColor: '#E0E0E0',
  },
  weekHeaderCell: {
    height: groupTitleHeight + headerCellHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
  },
  syncedHeaderScroll: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  categoryContainer: {
    flexDirection: 'column',
  },
  categoryDivider: {
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
  },
  borderBottom: {
    width: '100%',
    height: groupTitleHeight,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
  },
  categoryHeaderText: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#111111',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  headerCell: {
    width: cellWidth,
    height: headerCellHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
  },
  headerCellLast: {
    width: cellWidth,
    height: headerCellHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    width: cellWidth,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#111111',
  },
  verticalBodyScroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bodyWrap: {
    flexDirection: 'row',
  },
  weekColumn: {
    width: weekColumnWidth,
  },
  weekRow: {
    width: weekColumnWidth,
    height: bodyRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  weekRowText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
  },
  horizontalBodyScroll: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowEven: {
    backgroundColor: '#FFFFFF',
  },
  rowOdd: {
    backgroundColor: '#FFCCCC',
  },
  rowText: {
    width: cellWidth,
    height: bodyRowHeight,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(14),
    color: '#111111',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingVertical: moderateScale(5),
  },
  positiveText: {
    color: 'green',
  },
  negativeText: {
    color: 'red',
  },
  noData: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  noDataText: {
    fontSize: moderateScale(16),
    color: '#111111',
  },
});
