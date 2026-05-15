import React, { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Container, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { useGetPerformanceReportQuery } from '../../../../redux/api/reportAPI';
import { IReportDetailsItem } from '../../../../types/apiTypes';
import { useLandscapeReportExit } from '../../../../utils/orientationLocker';
import { styles } from './styles';

type PerformanceColumn = {
  key: string;
  label: 'Std.' | 'Real';
};

type PerformanceGroup = {
  title: string;
  columns: PerformanceColumn[];
};

const performanceGroups: PerformanceGroup[] = [
  {
    title: 'Body Wt.',
    columns: [
      { key: 'stdBodyWtFemale', label: 'Std.' },
      { key: 'weight_per_chicken_in_gm', label: 'Real' },
    ],
  },
  {
    title: 'Feed Intake (g)',
    columns: [
      { key: 'stdFeedIntake', label: 'Std.' },
      { key: 'feed_Consumption_in_Kg', label: 'Real' },
    ],
  },
  {
    title: 'Total Eggs (HW%)',
    columns: [
      { key: 'stdHDpercent', label: 'Std.' },
      { key: 'hdPercent', label: 'Real' },
    ],
  },
  {
    title: 'HE%',
    columns: [
      { key: 'stdHEPercent', label: 'Std.' },
      { key: 'hEpercent', label: 'Real' },
    ],
  },
  {
    title: 'HH%',
    columns: [
      { key: 'stdHHPercent', label: 'Std.' },
      { key: 'henHousepercent', label: 'Real' },
    ],
  },
  {
    title: 'Livability (%)',
    columns: [
      { key: 'stdLiveabilityPercent', label: 'Std.' },
      { key: 'livabilityPercent', label: 'Real' },
    ],
  },
  {
    title: 'Eggs/Bird (HH)',
    columns: [
      { key: 'stdEggsBirdsWeekHH', label: 'Std.' },
      { key: 'eggsBirdsWeekHH', label: 'Real' },
    ],
  },
  {
    title: 'Eggs/Bird/Cum (HH)',
    columns: [
      { key: 'stdEggBirdCUMHH', label: 'Std.' },
      { key: 'cumulativeEggsBirdCUMHH', label: 'Real' },
    ],
  },
  {
    title: 'HE/Bird',
    columns: [
      { key: 'stdEggsBirdsWeekHE', label: 'Std.' },
      { key: 'eggsBirdsWeekHE', label: 'Real' },
    ],
  },
  {
    title: 'HE/Bird/Cum',
    columns: [
      { key: 'stdEggBirdCUMHE', label: 'Std.' },
      { key: 'cumulativeEggsBirdCUMHE', label: 'Real' },
    ],
  },
  {
    title: 'Hatchability (%)',
    columns: [
      { key: 'stdHDpercent', label: 'Std.' },
      { key: 'hatchabilityPercent', label: 'Real' },
    ],
  },
  {
    title: 'Chicks/HH',
    columns: [
      { key: 'stdChicksHHWeekly', label: 'Std.' },
      { key: 'chicksHHWeekly', label: 'Real' },
    ],
  },
  {
    title: 'Chicks/HH Cum.',
    columns: [
      { key: 'stdChicksHHCUM', label: 'Std.' },
      { key: 'cumulativeChicksHH', label: 'Real' },
    ],
  },
];

const orderedColumns = performanceGroups.flatMap(group => group.columns);

const formatValue = (
  value: string | number | boolean | null | undefined,
  fallback = '-',
) => {
  if (value == null || String(value).trim() === '') {
    return fallback;
  }

  return String(value);
};

const getNumber = (value: string | number | boolean | null | undefined) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

const getWeekLabel = (item: IReportDetailsItem) => {
  const week = formatValue(item.week ?? item.Week, '');
  return week.includes(' ') ? week.split(' ')[1] : week;
};

const calculateCumulativeValues = (rows: IReportDetailsItem[]) => {
  let cumulativeChicksHH = 0;
  let cumulativeEggsBirdCUMHH = 0;
  let cumulativeEggsBirdCUMHE = 0;

  return rows.map(item => {
    cumulativeChicksHH += getNumber(item.chicksHHWeekly);
    cumulativeEggsBirdCUMHH += getNumber(item.eggsBirdsWeekHH);
    cumulativeEggsBirdCUMHE += getNumber(item.eggsBirdsWeekHE);

    return {
      ...item,
      cumulativeChicksHH: Number(cumulativeChicksHH.toFixed(2)),
      cumulativeEggsBirdCUMHH: Number(cumulativeEggsBirdCUMHH.toFixed(2)),
      cumulativeEggsBirdCUMHE: Number(cumulativeEggsBirdCUMHE.toFixed(2)),
    };
  });
};

const PerformanceReportDetailsScreen = ({ navigation, route }: any) => {
  const { flockName } = route?.params ?? {};
  const headerScrollRef = useRef<ScrollView>(null);
  const leaveReportScreen = useLandscapeReportExit(navigation);
  const { data, isLoading, isFetching, refetch } =
    useGetPerformanceReportQuery(flockName ?? '', {
      skip: !flockName,
    });
  const rows = useMemo(
    () => calculateCumulativeValues(Array.isArray(data) ? data : []),
    [data],
  );

  const syncScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    headerScrollRef.current?.scrollTo({ x, animated: false });
  };

  const renderTableHeader = () => (
    <View style={styles.headerContainer}>
      {performanceGroups.map(group => (
        <View key={group.title} style={styles.group}>
          <View style={styles.groupTitle}>
            <Text style={styles.headerText}>{group.title}</Text>
          </View>
          <View style={styles.subHeaderRow}>
            {group.columns.map(column => (
              <View key={`${group.title}-${column.key}`} style={styles.headerCell}>
                <Text style={styles.headerText}>{column.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
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
          style={styles.dataCell}
        >
          <Text style={styles.rowText}>{formatValue(item[column.key])}</Text>
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
              <View>{rows.map((item, index) => renderDataRow(item, index))}</View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header
        title={formatValue(flockName, 'Performance Report')}
        onBackPress={() => leaveReportScreen()}
      />
      {renderContent()}
    </Container>
  );
};

export default PerformanceReportDetailsScreen;
