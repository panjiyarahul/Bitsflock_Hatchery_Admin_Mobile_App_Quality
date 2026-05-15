import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../../constants/spacing';

export const fixedLeftWidth = moderateScale(365);
export const dateWidth = moderateScale(90);
export const ageCellWidth = moderateScale(45);
export const standardCellWidth = moderateScale(60);
export const penCellWidth = moderateScale(70);
export const rowHeight = moderateScale(46);
export const headerHeight = moderateScale(96);
export const groupTitleHeight = moderateScale(44);
export const subHeaderHeight = moderateScale(52);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  topRow: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  fixedHeader: {
    width: fixedLeftWidth,
    height: headerHeight,
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  dateHeader: {
    width: dateWidth,
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  ageHeader: {
    width: ageCellWidth * 2,
    height: headerHeight,
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  standardHeader: {
    width: standardCellWidth * 3,
    height: headerHeight,
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  groupTitle: {
    height: groupTitleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingHorizontal: moderateScale(4),
  },
  subHeaderRow: {
    height: subHeaderHeight,
    flexDirection: 'row',
  },
  ageHeaderCell: {
    width: ageCellWidth,
    height: subHeaderHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  standardHeaderCell: {
    width: standardCellWidth,
    height: subHeaderHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  headerScroll: {
    flex: 1,
  },
  penHeaderContainer: {
    flexDirection: 'row',
  },
  penHeader: {
    height: headerHeight,
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  penTitle: {
    height: groupTitleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingHorizontal: moderateScale(4),
  },
  penSubHeaderCell: {
    width: penCellWidth,
    height: subHeaderHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    paddingHorizontal: moderateScale(4),
  },
  cumulativeHeader: {
    height: headerHeight,
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#F2F2F2',
  },
  cumulativeTitle: {
    height: groupTitleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
  },
  headerText: {
    color: '#111111',
    fontSize: moderateScale(12),
    fontWeight: '700',
    textAlign: 'center',
  },
  bodyScroll: {
    flex: 1,
  },
  bodyWrap: {
    flexDirection: 'row',
  },
  fixedBody: {
    width: fixedLeftWidth,
  },
  fixedRow: {
    width: fixedLeftWidth,
    height: rowHeight,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  dataScroll: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    height: rowHeight,
  },
  rowCell: {
    width: penCellWidth,
    height: rowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingHorizontal: moderateScale(4),
  },
  dateCell: {
    width: dateWidth,
  },
  ageCell: {
    width: ageCellWidth,
  },
  standardCell: {
    width: standardCellWidth,
  },
  weekCell: {
    borderBottomWidth: 0,
  },
  rowText: {
    color: '#111111',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  penEven: {
    backgroundColor: '#FFF3F0',
  },
  penOdd: {
    backgroundColor: '#FFFFFF',
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  noDataText: {
    color: '#111111',
    fontSize: moderateScale(16),
  },
});
