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
import { useGetFlockBookReportQuery } from '../../../../redux/api/reportAPI';
import { IReportDetailsItem } from '../../../../types/apiTypes';
import { useLandscapeReportExit } from '../../../../utils/orientationLocker';
import { penCellWidth, styles } from './styles';

type StandardValue = Record<string, string | number | undefined>;
type BookKeepingData = Record<string, string | number | undefined>;
type PenRecord = {
  PenName?: string;
  BookKeepingData?: BookKeepingData[] | string;
};
type DailyRecord = {
  date?: string;
  day?: string | number;
  week?: string;
  showWeek?: boolean;
  isLastOfWeek?: boolean;
  pens: PenRecord[];
  standard?: StandardValue | null;
};
type CumulativeRecord = {
  totalBirds: number;
  avgBodyWeight: string;
  totalEggs: number;
  overallEggProduction: string;
};

const penColumns = [
  { key: 'FlockSize', label: 'Number of Birds' },
  { key: 'Mortality_Number', label: 'Mortality' },
  { key: 'TransferBirds', label: 'Transfer Birds(+/-)' },
  { key: 'BodyWeight', label: 'Body Wt' },
  { key: 'TotalEgg', label: 'Daily Eggs' },
  { key: 'EggWeight', label: 'Egg Wt(g)' },
  { key: 'eggProduction', label: '% egg prod' },
];

const cumulativeColumns: { key: keyof CumulativeRecord; label: string }[] = [
  { key: 'totalBirds', label: 'Total no. of birds' },
  { key: 'avgBodyWeight', label: 'Avg Body Wt' },
  { key: 'totalEggs', label: 'Total eggs' },
  { key: 'overallEggProduction', label: 'Overall%egg prod' },
];

const formatValue = (
  value: string | number | boolean | null | undefined,
  fallback = '-',
) => {
  if (value == null || String(value).trim() === '') {
    return fallback;
  }

  return String(value);
};

const parseMaybeJson = <T,>(value: unknown, fallback: T): T => {
  if (typeof value !== 'string') {
    return (value as T) ?? fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const getNumber = (value: string | number | undefined) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

const getBookKeepingData = (pen?: PenRecord) => {
  const data = parseMaybeJson<BookKeepingData[]>(pen?.BookKeepingData, []);
  return Array.isArray(data) ? data[0] ?? {} : {};
};

const buildDailyRecords = (reportData: IReportDetailsItem[]) => {
  const standardsByWeek: Record<string, StandardValue | null> = {};

  reportData.forEach(item => {
    const week = formatValue(item.week, '');
    standardsByWeek[week] = parseMaybeJson<StandardValue | null>(
      item.standard,
      null,
    );
  });

  const records = reportData.flatMap(item => {
    const week = formatValue(item.week, '');
    const ageDateList = parseMaybeJson<Record<string, unknown>[]>(
      item.ageDateList,
      [],
    );

    return ageDateList.map(day => ({
      date: formatValue(day.Date as string | undefined, ''),
      day: day.Age_in_day as string | number | undefined,
      week,
      pens: parseMaybeJson<PenRecord[]>(day.Flockbookkeeping, []),
      standard: standardsByWeek[week] ?? null,
    }));
  });

  const groups = records.reduce<Record<string, DailyRecord[]>>(
    (acc, record) => {
      if (!acc[record.week]) {
        acc[record.week] = [];
      }

      acc[record.week].push(record);
      return acc;
    },
    {},
  );

  return Object.values(groups).flatMap(group => {
    const midIndex = Math.floor(group.length / 2);
    const lastIndex = group.length - 1;

    return group.map((item, index) => ({
      ...item,
      showWeek: index === midIndex,
      isLastOfWeek: index === lastIndex,
    }));
  });
};

const getPenNames = (records: DailyRecord[]) => {
  const names = records.flatMap(record =>
    record.pens.map(pen => formatValue(pen.PenName, '')),
  );
  return Array.from(new Set(names.filter(Boolean)));
};

const calculateCumulativeData = (records: DailyRecord[]) => {
  return records.map(record => {
    let totalBirds = 0;
    let totalEggs = 0;
    const bodyWeights: number[] = [];

    record.pens.forEach(pen => {
      const data = getBookKeepingData(pen);
      const flockSize = getNumber(data.FlockSize);
      const totalEgg = getNumber(data.TotalEgg);
      const bodyWeight = getNumber(data.BodyWeight);

      totalBirds += flockSize;
      totalEggs += totalEgg;

      if (bodyWeight > 0) {
        bodyWeights.push(bodyWeight);
      }
    });

    const avgBodyWeight = bodyWeights.length
      ? (
          bodyWeights.reduce((sum, value) => sum + value, 0) /
          bodyWeights.length
        ).toFixed(2)
      : '0';
    const overallEggProduction =
      totalBirds > 0 ? ((totalEggs / totalBirds) * 100).toFixed(2) : '0';

    return {
      totalBirds,
      avgBodyWeight,
      totalEggs,
      overallEggProduction,
    };
  });
};

const getEggProduction = (data: BookKeepingData) => {
  const flockSize = getNumber(data.FlockSize);
  const totalEgg = getNumber(data.TotalEgg);
  return flockSize > 0 ? ((totalEgg / flockSize) * 100).toFixed(2) : '0';
};

const FlockBookReportDetailsScreen = ({ navigation, route }: any) => {
  const { flockName } = route?.params ?? {};
  const headerScrollRef = useRef<ScrollView>(null);
  const dataScrollRef = useRef<ScrollView>(null);
  const isSyncingRef = useRef(false);
  const leaveReportScreen = useLandscapeReportExit(navigation);
  const { data, isLoading, isFetching, refetch } = useGetFlockBookReportQuery(
    flockName ?? '',
    {
      skip: !flockName,
    },
  );
  const reportData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const dailyRecords = useMemo(
    () => buildDailyRecords(reportData),
    [reportData],
  );
  const penNames = useMemo(() => getPenNames(dailyRecords), [dailyRecords]);
  const cumulativeData = useMemo(
    () => calculateCumulativeData(dailyRecords),
    [dailyRecords],
  );

  const syncScroll = (target: 'header' | 'data', event: any) => {
    if (isSyncingRef.current) {
      return;
    }

    const x = event.nativeEvent.contentOffset.x;
    isSyncingRef.current = true;

    if (target === 'header') {
      dataScrollRef.current?.scrollTo({ x, animated: false });
    } else {
      headerScrollRef.current?.scrollTo({ x, animated: false });
    }

    setTimeout(() => {
      isSyncingRef.current = false;
    }, 10);
  };

  const renderFixedHeader = () => (
    <View style={styles.fixedHeader}>
      <View style={styles.dateHeader}>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <View style={styles.ageHeader}>
        <View style={styles.groupTitle}>
          <Text style={styles.headerText}>Age</Text>
        </View>
        <View style={styles.subHeaderRow}>
          <View style={styles.ageHeaderCell}>
            <Text style={styles.headerText}>Day</Text>
          </View>
          <View style={styles.ageHeaderCell}>
            <Text style={styles.headerText}>Week</Text>
          </View>
        </View>
      </View>
      <View style={styles.standardHeader}>
        <View style={styles.groupTitle}>
          <Text style={styles.headerText}>
            Standard Values{'\n'}for {formatValue(flockName)}
          </Text>
        </View>
        <View style={styles.subHeaderRow}>
          {['Body\nWt(g)', 'Egg\nWt(g)', 'Egg\nProd(%)'].map(label => (
            <View key={label} style={styles.standardHeaderCell}>
              <Text style={styles.headerText}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderScrollableHeader = () => (
    <View style={styles.penHeaderContainer}>
      {penNames.map((penName, index) => (
        <View
          key={penName}
          style={[
            styles.penHeader,
            { width: penColumns.length * penCellWidth },
            index % 2 === 0 ? styles.penEven : styles.penOdd,
          ]}
        >
          <View style={styles.penTitle}>
            <Text style={styles.headerText}>{penName}</Text>
          </View>
          <View style={styles.subHeaderRow}>
            {penColumns.map(column => (
              <View
                key={`${penName}-${column.key}`}
                style={styles.penSubHeaderCell}
              >
                <Text style={styles.headerText}>{column.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      <View
        style={[
          styles.cumulativeHeader,
          { width: cumulativeColumns.length * penCellWidth },
        ]}
      >
        <View style={styles.cumulativeTitle}>
          <Text style={styles.headerText}>Cumulative data</Text>
        </View>
        <View style={styles.subHeaderRow}>
          {cumulativeColumns.map(column => (
            <View key={column.key} style={styles.penSubHeaderCell}>
              <Text style={styles.headerText}>{column.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderFixedRow = (item: DailyRecord, index: number) => (
    <View key={`fixed-${index}`} style={styles.fixedRow}>
      <View style={[styles.rowCell, styles.dateCell]}>
        <Text style={styles.rowText}>{formatValue(item.date)}</Text>
      </View>
      <View style={[styles.rowCell, styles.ageCell]}>
        <Text style={styles.rowText}>{formatValue(item.day)}</Text>
      </View>
      <View
        style={[
          styles.rowCell,
          styles.ageCell,
          item.isLastOfWeek ? null : styles.weekCell,
        ]}
      >
        <Text style={styles.rowText}>
          {item.showWeek ? formatValue(item.week).replace(/\D/g, '') : ''}
        </Text>
      </View>
      <View style={[styles.rowCell, styles.standardCell]}>
        <Text style={styles.rowText}>
          {formatValue(item.standard?.StdBodyWtFemale)}
        </Text>
      </View>
      <View style={[styles.rowCell, styles.standardCell]}>
        <Text style={styles.rowText}>
          {formatValue(item.standard?.StdEggwt)}
        </Text>
      </View>
      <View style={[styles.rowCell, styles.standardCell]}>
        <Text style={styles.rowText}>
          {formatValue(item.standard?.StdHHPercent, '0')}
        </Text>
      </View>
    </View>
  );

  const renderPenRows = (item: DailyRecord, index: number) => (
    <View key={`row-${index}`} style={styles.row}>
      {penNames.map((penName, penIndex) => {
        const pen = item.pens.find(penItem => penItem.PenName === penName);
        const bookKeepingData = getBookKeepingData(pen);

        return (
          <View
            key={`${penName}-${index}`}
            style={[
              styles.row,
              penIndex % 2 === 0 ? styles.penEven : styles.penOdd,
            ]}
          >
            {penColumns.map(column => (
              <View key={`${penName}-${column.key}`} style={styles.rowCell}>
                <Text style={styles.rowText}>
                  {column.key === 'eggProduction'
                    ? getEggProduction(bookKeepingData)
                    : formatValue(bookKeepingData[column.key], '0')}
                </Text>
              </View>
            ))}
          </View>
        );
      })}
      {cumulativeColumns.map(column => (
        <View key={`cumulative-${column.key}-${index}`} style={styles.rowCell}>
          <Text style={styles.rowText}>
            {formatValue(cumulativeData[index]?.[column.key], '0')}
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

    if (dailyRecords.length === 0) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableArea}>
        <View style={styles.topRow}>
          {renderFixedHeader()}
          <ScrollView
            ref={headerScrollRef}
            horizontal
            onScroll={event => syncScroll('header', event)}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={styles.headerScroll}
          >
            {renderScrollableHeader()}
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
            <View style={styles.fixedBody}>
              {dailyRecords.map((item, index) => renderFixedRow(item, index))}
            </View>

            <ScrollView
              ref={dataScrollRef}
              horizontal
              onScroll={event => syncScroll('data', event)}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              style={styles.dataScroll}
            >
              <View>
                {dailyRecords.map((item, index) => renderPenRows(item, index))}
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
        title={formatValue(flockName, 'Flock Book Report')}
        onBackPress={() => leaveReportScreen()}
      />
      {renderContent()}
    </Container>
  );
};

export default FlockBookReportDetailsScreen;
