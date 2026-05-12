import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { useGetClosedFlockFarmListQuery } from '../../../../redux/api/closedflockAPI';
import { IFlockFarmBookkeeping } from '../../../../types/apiTypes';
import { formatDate, parseJsonString } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const formatLabel = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, char => char.toUpperCase());

const ClosedBatchesFlocksScreen = ({ route }: any) => {
  const { id } = route?.params;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { data, isLoading, isFetching, refetch } =
    useGetClosedFlockFarmListQuery(id);
  const closedBatchesFlocksList = Array.isArray(data) ? data : [];
  const renderItem = ({
    item,
  }: {
    item: (typeof closedBatchesFlocksList)[number];
  }) => {
    const bookkeepingData = parseJsonString<IFlockFarmBookkeeping>(
      item.bookkeeping,
    );
    const ageValue = bookkeepingData?.age;
    const flockSize =
      typeof bookkeepingData?.flockSize === 'number'
        ? bookkeepingData.flockSize
        : Number(bookkeepingData?.flockSize);
    const remainingChick =
      typeof bookkeepingData?.remaining_Chick === 'number'
        ? bookkeepingData.remaining_Chick
        : Number(bookkeepingData?.remaining_Chick);
    const derivedMortality =
      Number.isFinite(flockSize) && Number.isFinite(remainingChick)
        ? flockSize - remainingChick
        : undefined;
    const bookkeepingEntrySource: Array<[string, string | number | undefined]> =
      [
        ['Flock Size', bookkeepingData?.flockSize],
        ['Remaining Chick', bookkeepingData?.remaining_Chick],
        ['Mortality', derivedMortality],
      ];
    const bookkeepingEntries = bookkeepingEntrySource.filter(
      (entry): entry is [string, string | number] => entry[1] != null,
    );

    return (
      <View style={styles.entryWrap}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            {formatDate(item.date, { includeWeekday: false, dayFirst: true })}
          </Text>
          <View style={styles.dateDash} />
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate('ClosedBatchesReportScreen', {
              id: id,
              age: bookkeepingData?.age,
            })
          }
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.flockName}>
              {formatValue(item.flockName, 'Flock')}
            </Text>

            <View style={styles.agePill}>
              <Ionicons name="time-outline" size={14} color="#FFFFFF" />
              <Text style={styles.ageBadgeText}>
                {formatValue(ageValue, '0')} days
              </Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            {bookkeepingEntries.length > 0 ? (
              bookkeepingEntries.map(([key, value]) => (
                <View key={key} style={styles.infoBlock}>
                  <Text style={styles.label}>{formatLabel(String(key))}</Text>
                  <Text style={styles.valuePrimary}>{formatValue(value)}</Text>
                </View>
              ))
            ) : (
              <View style={styles.infoBlockFull}>
                <Text style={styles.valuePrimary}>No bookkeeping data</Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Closed Batch Flocks" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={closedBatchesFlocksList}
          keyExtractor={(item, index) =>
            `${formatValue(item.flockName, 'flock')}-${formatValue(
              item.date,
              'date',
            )}-${index}`
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No bookkeeping found</Text>
              <Text style={styles.emptyText}>
                No closed batch report is available right now.
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary]}
              onRefresh={refetch}
              refreshing={isFetching}
              tintColor={COLORS.primary}
            />
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default ClosedBatchesFlocksScreen;
