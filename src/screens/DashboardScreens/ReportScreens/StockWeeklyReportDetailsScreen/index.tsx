import React, { useRef } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Container, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { useGetStockWeeklyReportQuery } from '../../../../redux/api/reportAPI';
import { IReportDetailsItem } from '../../../../types/apiTypes';
import { useLandscapeReportExit } from '../../../../utils/orientationLocker';
import { cellWidth, medicineWidth, styles } from './styles';

type StockColumn = {
  key: string;
  label: string;
  width?: number;
  fallback?: string | number;
};

type StockHeaderGroup = {
  title: string;
  columns: StockColumn[];
};

const groupedColumns: StockHeaderGroup[] = [
  {
    title: 'Hen House',
    columns: [
      { key: 'houseMaleNumber', label: 'Male' },
      { key: 'houseFemaleNumber', label: 'Female' },
    ],
  },
  {
    title: 'No. of Birds House',
    columns: [
      { key: 'openingMaleNumber', label: 'Male' },
      { key: 'openingFemaleNumber', label: 'Female' },
    ],
  },
  {
    title: 'Received',
    columns: [
      { key: 'receivedMaleTotal', label: 'Male' },
      { key: 'femaleFemaleTotal', label: 'Female' },
    ],
  },
  {
    title: 'Transfer',
    columns: [
      { key: 'transMaleTotal', label: 'Male' },
      { key: 'transferFemaleTotal', label: 'Female' },
    ],
  },
  {
    title: 'Mortality',
    columns: [
      { key: 'maleMortalityNumber', label: 'Male' },
      { key: 'femaleMortalityNumber', label: 'Female' },
    ],
  },
  {
    title: 'Cull/Sales',
    columns: [
      { key: 'maleCullSales', label: 'Male' },
      { key: 'femaleCullSales', label: 'Female' },
    ],
  },
  {
    title: 'Egg Production',
    columns: [
      { key: 'he', label: 'He' },
      { key: 'cull', label: 'Cull' },
      { key: 'cr', label: 'Cr' },
      { key: 'le', label: 'Le' },
      { key: 'totalEgg', label: 'Total' },
    ],
  },
  {
    title: 'Egg Production',
    columns: [
      { key: 'hePercent', label: 'He%' },
      { key: 'cullPercent', label: 'Cull%' },
      { key: 'crPercent', label: 'Cr%' },
      { key: 'lePercent', label: 'Le%' },
      { key: 'hdPercent', label: 'HD%' },
    ],
  },
  {
    title: 'Closing Birds',
    columns: [
      { key: 'closingMaleBird', label: 'Male' },
      { key: 'closingFemaleBird', label: 'Female' },
    ],
  },
  {
    title: 'Feed Req.',
    columns: [
      { key: 'feed_consumption_req_Male_gm', label: 'Male' },
      { key: 'feed_consumption_req_gm', label: 'Female' },
    ],
  },
  {
    title: 'Feed Cons.',
    columns: [
      { key: 'feed_con_male_kg', label: 'Male' },
      { key: 'feed_con_female_kg', label: 'Female' },
    ],
  },
  {
    title: 'Feed/Day(Kg)',
    columns: [
      { key: 'feedConsuptionForMale', label: 'Male' },
      { key: 'feedConsuptionForFemale', label: 'Female' },
    ],
  },
  {
    title: 'F/B/D(Gm)',
    columns: [
      { key: 'feedMalePerDay', label: 'Male' },
      { key: 'feedFemalePerDay', label: 'Female' },
    ],
  },
  {
    title: 'Body Weight (Gm)',
    columns: [
      { key: 'maleBodyWeight', label: 'Male' },
      { key: 'femaleBodyWeight', label: 'Female' },
    ],
  },
];

const singleColumns: StockColumn[] = [
  { key: 'cummulativeTotalEgg', label: 'Cum. Total Egg' },
  { key: 'cummulativeHatchingEgg', label: 'Cum. Hatch Egg' },
  { key: 'avgEggWeight', label: 'Avg Egg WT.', fallback: 0 },
  { key: 'totalFeedTypeForMaleFemale', label: 'Feed Type' },
  { key: 'totalMedicine', label: 'Medicine', width: medicineWidth },
];

const orderedColumns = [
  ...groupedColumns.slice(0, 7).flatMap(group => group.columns),
  singleColumns[0],
  singleColumns[1],
  ...groupedColumns.slice(7, 11).flatMap(group => group.columns),
  singleColumns[2],
  ...groupedColumns.slice(11, 13).flatMap(group => group.columns),
  singleColumns[3],
  ...groupedColumns.slice(13).flatMap(group => group.columns),
  singleColumns[4],
];

const formatValue = (
  value: string | number | boolean | null | undefined,
  fallback: string | number = '-',
) => {
  if (value == null || String(value).trim() === '') {
    return String(fallback);
  }

  return String(value);
};

const getWeekLabel = (item: IReportDetailsItem) => {
  const week = formatValue(item.week ?? item.Week, '');
  return week.includes(' ') ? week.split(' ')[1] : week;
};

const StockWeeklyReportDetailsScreen = ({ navigation, route }: any) => {
  const { flockName, penId, penName } = route?.params ?? {};
  const headerScrollRef = useRef<ScrollView>(null);
  const leaveReportScreen = useLandscapeReportExit(navigation);
  const { data, isLoading, isFetching, refetch } = useGetStockWeeklyReportQuery(
    { flockName: flockName ?? '', penId: penId ?? '' },
    {
      skip: !flockName || penId == null,
    },
  );
  const rows = Array.isArray(data) ? data : [];

  const syncScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    headerScrollRef.current?.scrollTo({ x, animated: false });
  };

  const renderGroupedHeader = (group: StockHeaderGroup, index: number) => (
    <View
      key={`${group.title}-${index}`}
      style={[styles.group, { width: group.columns.length * cellWidth }]}
    >
      <View style={styles.groupTitle}>
        <Text style={styles.headerText}>{group.title}</Text>
      </View>
      <View style={styles.subHeaderRow}>
        {group.columns.map(column => (
          <View key={column.key} style={styles.headerCell}>
            <Text style={styles.headerText}>{column.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSingleHeader = (column: StockColumn) => (
    <View
      key={column.key}
      style={[styles.singleHeader, { width: column.width ?? cellWidth }]}
    >
      <Text style={styles.headerText}>{column.label}</Text>
    </View>
  );

  const renderTableHeader = () => (
    <View style={styles.headerContainer}>
      {groupedColumns.slice(0, 7).map(renderGroupedHeader)}
      {renderSingleHeader(singleColumns[0])}
      {renderSingleHeader(singleColumns[1])}
      {groupedColumns.slice(7, 11).map(renderGroupedHeader)}
      {renderSingleHeader(singleColumns[2])}
      {groupedColumns.slice(11, 13).map(renderGroupedHeader)}
      {renderSingleHeader(singleColumns[3])}
      {groupedColumns.slice(13).map(renderGroupedHeader)}
      {renderSingleHeader(singleColumns[4])}
    </View>
  );

  const renderDataRow = (item: IReportDetailsItem, index: number) => (
    <View
      key={`row-${index}`}
      style={[
        styles.tableRow,
        index % 2 === 0 ? styles.rowEven : styles.rowOdd,
      ]}
    >
      {orderedColumns.map((column, columnIndex) => (
        <View
          key={`${column.key}-${columnIndex}-${index}`}
          style={[
            styles.dataCell,
            { width: column.width ?? cellWidth },
            column.width === medicineWidth ? styles.medicineText : null,
          ]}
        >
          <Text style={styles.rowText}>
            {formatValue(item[column.key], column.fallback ?? '-')}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      );
    }

    if (rows.length === 0) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableArea}>
        <View style={styles.topRow}>
          <View style={styles.weekHeaderCell}>
            <Text style={styles.headerText}>Wks</Text>
          </View>
          <ScrollView
            ref={headerScrollRef}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={styles.headerScroll}
          >
            {renderTableHeader()}
          </ScrollView>
        </View>

        <ScrollView
          style={styles.bodyScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary]}
              onRefresh={refetch}
              refreshing={isFetching}
              tintColor={COLORS.primary}
            />
          }
        >
          <View style={styles.bodyWrap}>
            <View style={styles.weekColumn}>
              {rows.map((item, index) => (
                <View
                  key={`week-${index}`}
                  style={[
                    styles.weekCell,
                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                  ]}
                >
                  <Text style={styles.headerText}>{getWeekLabel(item)}</Text>
                </View>
              ))}
            </View>

            <ScrollView
              horizontal
              onScroll={syncScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              style={styles.dataScroll}
            >
              <View>
                {rows.map((item, index) => renderDataRow(item, index))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header
        title={`${formatValue(flockName)} | ${formatValue(penName)}`}
        onBackPress={() => leaveReportScreen()}
      />
      {renderContent()}
    </Container>
  );
};

export default StockWeeklyReportDetailsScreen;
