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
import { useGetFlockFarmListQuery } from '../../../../redux/api/activeflockAPI';
import { IFlockFarmBookkeeping } from '../../../../types/apiTypes';
import { formatDate, parseJsonString } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const FlockFarmListScreen = ({ route }: any) => {
  const { id } = route?.params;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { data, isLoading, isFetching, refetch } = useGetFlockFarmListQuery(id);
  const flockList = Array.isArray(data) ? data : [];

  const renderItem = ({ item }: { item: (typeof flockList)[number] }) => {
    const bookkeepingData = parseJsonString<IFlockFarmBookkeeping>(
      item.bookkeeping,
    );
    const ageValue = bookkeepingData?.age;
    const bookkeepingEntries: Array<[string, string | number | undefined]> = [
      ['Closing Bird', bookkeepingData?.remaining_Chick],
      ['Female Mortality', bookkeepingData?.female_mortality_Number],
      ['Male Mortality', bookkeepingData?.male_mortality_Number],
    ];

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
            navigation.navigate('FlockReportScreen', {
              id: id,
              bId: bookkeepingData?.bookkeepingId,
            })
          }
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.flockName}>
              {formatValue(item.flockName, 'Bookkeeping')}
            </Text>

            <View style={styles.agePill}>
              <Ionicons name="time-outline" size={14} color="#FFFFFF" />
              <Text style={styles.ageBadgeText}>
                {formatValue(ageValue, '0')} days
              </Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            {bookkeepingEntries.map(([key, value]) => (
              <View key={key} style={styles.infoBlock}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.valuePrimary}>{formatValue(value)}</Text>
              </View>
            ))}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header
        title="Report"
        // rightButtonName="Feed Program"
        // onRightPress={() => navigation.navigate('FeedProgramScreen', { id })}
      />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={flockList}
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
                No flock farm report is available right now.
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

export default FlockFarmListScreen;
