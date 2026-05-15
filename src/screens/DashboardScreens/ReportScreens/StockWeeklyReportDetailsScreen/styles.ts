import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../../../constants/spacing';

export const weekColumnWidth = moderateScale(50);
export const cellWidth = moderateScale(74);
export const medicineWidth = moderateScale(104);
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
  weekHeaderCell: {
    width: weekColumnWidth,
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  headerScroll: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  group: {
    height: headerHeight,
  },
  groupTitle: {
    height: groupTitleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingHorizontal: moderateScale(4),
  },
  subHeaderRow: {
    height: subHeaderHeight,
    flexDirection: 'row',
  },
  headerCell: {
    width: cellWidth,
    height: subHeaderHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingHorizontal: moderateScale(4),
  },
  medicineHeaderCell: {
    width: medicineWidth,
  },
  singleHeader: {
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingHorizontal: moderateScale(4),
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
  weekColumn: {
    width: weekColumnWidth,
  },
  weekCell: {
    width: weekColumnWidth,
    height: rowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
  },
  dataScroll: {
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
  dataCell: {
    width: cellWidth,
    height: rowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingHorizontal: moderateScale(4),
  },
  rowText: {
    color: '#111111',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  medicineText: {
    width: medicineWidth,
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
