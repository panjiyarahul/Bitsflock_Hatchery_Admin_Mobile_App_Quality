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
import { useGetFeedProgramReportQuery } from '../../../../redux/api/activeflockAPI';
import { IFeedProgramReportItem } from '../../../../types/apiTypes';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const parseDoctorData = (value?: string) => {
  if (!value || value.trim() === '') {
    return {};
  }

  try {
    return JSON.parse(value) as {
      QuantityFemale?: number;
      QuantityMale?: number;
    };
  } catch {
    return {};
  }
};

const FeedProgramScreen = ({ route }: any) => {
  const { id } = route?.params ?? {};
  const headerScrollRef = useRef<ScrollView>(null);

  const { data, isLoading, isFetching, refetch } = useGetFeedProgramReportQuery(
    id,
    {
      skip: !id,
    },
  );

  const feedRows = Array.isArray(data) ? data : [];

  const syncScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    headerScrollRef.current?.scrollTo({ x, animated: false });
  };

  const renderTableHeader = () => (
    <View style={styles.headerContainer}>
      <View style={[styles.categoryContainer, styles.categoryDivider]}>
        <View style={styles.borderBottom}>
          <Text style={styles.categoryHeaderText}>Female Birds</Text>
        </View>
        <View style={styles.tableHeader}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Actual Body Wt.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Std. Body Wt.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Difference</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Doctor Recommend</Text>
          </View>
          <View style={styles.headerCellLast}>
            <Text style={styles.headerText}>Total Feed Intake</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <View style={styles.borderBottom}>
          <Text style={styles.categoryHeaderText}>Male Birds</Text>
        </View>
        <View style={styles.tableHeader}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Actual Body Wt.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Std. Body Wt.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Difference</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Doctor Recommend</Text>
          </View>
          <View style={styles.headerCellLast}>
            <Text style={styles.headerText}>Total Feed Intake</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderDataRow = (item: IFeedProgramReportItem, index: number) => {
    const doctorRecData = parseDoctorData(item.DoctorPlacedStandardData);
    const rowBackground = index % 2 === 0 ? styles.rowEven : styles.rowOdd;

    return (
      <View key={`row-${index}`} style={[styles.tableRow, rowBackground]}>
        <Text style={styles.rowText}>{formatValue(item.ActualFemaleBodyWt)}</Text>
        <Text style={styles.rowText}>{formatValue(item.StdBodyFemaleWt)}</Text>
        <Text
          style={[
            styles.rowText,
            Number(item.FemaleDifference) > 0
              ? styles.positiveText
              : styles.negativeText,
          ]}
        >
          {formatValue(item.FemaleDifference)}
        </Text>
        <Text style={styles.rowText}>
          {formatValue(doctorRecData.QuantityFemale)}
        </Text>
        <Text style={styles.rowText}>
          {doctorRecData.QuantityFemale && item.FemaleNumber
            ? doctorRecData.QuantityFemale * item.FemaleNumber
            : '-'}
        </Text>
        <Text style={styles.rowText}>{formatValue(item.ActualMaleBodyWt)}</Text>
        <Text style={styles.rowText}>{formatValue(item.StdBodyMaleWt)}</Text>
        <Text
          style={[
            styles.rowText,
            Number(item.MaleDifference) > 0
              ? styles.positiveText
              : styles.negativeText,
          ]}
        >
          {formatValue(item.MaleDifference)}
        </Text>
        <Text style={styles.rowText}>
          {formatValue(doctorRecData.QuantityMale)}
        </Text>
        <Text style={styles.rowText}>
          {doctorRecData.QuantityMale && item.MaleNumber
            ? doctorRecData.QuantityMale * item.MaleNumber
            : '-'}
        </Text>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Feed Program" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : feedRows.length === 0 ? (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      ) : (
        <View style={styles.tableArea}>
          <View style={styles.topStickyRow}>
            <View style={styles.weekHeaderColumn}>
              <View style={styles.weekHeaderCell}>
                <Text style={styles.headerText}>Wks</Text>
              </View>
            </View>

            <ScrollView
              ref={headerScrollRef}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={styles.syncedHeaderScroll}
            >
              {renderTableHeader()}
            </ScrollView>
          </View>

          <ScrollView
            style={styles.verticalBodyScroll}
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
                {feedRows.map((item, index) => (
                  <View
                    key={`week-${index}`}
                    style={[
                      styles.weekRow,
                      index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    <Text style={styles.weekRowText}>
                      {formatValue(item.Week?.split(' ')[1], formatValue(item.Week))}
                    </Text>
                  </View>
                ))}
              </View>

              <ScrollView
                horizontal
                onScroll={syncScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalBodyScroll}
              >
                <View>
                  {feedRows.map((item, index) => renderDataRow(item, index))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </Container>
  );
};

export default FeedProgramScreen;
