import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Container } from '../../../components';
import { COLORS } from '../../../constants';
import { selectUserInfo } from '../../../redux/reducer/userReducer';
import {
  useGetActiveFlockQuery,
  useGetRemAndDailyEggQuery,
} from '../../../redux/api/dashboardAPI';
import { styles } from './styles';
import { AgeIcon } from '../../../assets';

type SplitFlockField = {
  label: string;
  femaleValue?: string | number;
  maleValue?: string | number;
  singleValue?: string | number;
};

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const userInfo = useSelector(selectUserInfo);
  const displayName = userInfo.username || 'User';

  const {
    data,
    isLoading: isRemLoading,
    isFetching: isRemFetching,
    refetch: refetchRemAndDailyEgg,
  } = useGetRemAndDailyEggQuery();
  const {
    data: activeFlock,
    isLoading: isActiveFlockLoading,
    isFetching: isActiveFlockFetching,
    refetch: refetchActiveFlock,
  } = useGetActiveFlockQuery();
  const activeFlockList = Array.isArray(activeFlock) ? activeFlock : [];
  const isInitialLoading = isRemLoading || isActiveFlockLoading;
  const isRefreshing =
    !isInitialLoading && (isRemFetching || isActiveFlockFetching);

  const handleRefresh = async () => {
    await Promise.all([refetchRemAndDailyEgg(), refetchActiveFlock()]);
  };

  const renderFlockCard = ({ item, index }: { item: any; index: number }) => {
    const flockFields: SplitFlockField[] = [
      {
        label: 'Shed',
        singleValue: formatValue(item.shedName),
      },
      {
        label: 'Closing Birds',
        femaleValue: item.closingFemaleBirds,
        maleValue: item.closingMaleBirds,
      },
      {
        label: 'Mortality',
        femaleValue: item.femaleMortalityNumber,
        maleValue: item.maleMortalityNumber,
      },
      {
        label: 'Mortality %',
        femaleValue: `${formatValue(item.femaleMortalityPercentage, '0')}%`,
        maleValue: `${formatValue(item.maleMortalityPercentage, '0')}%`,
      },
      {
        label: 'Feed/Bird',
        femaleValue: item.feedPerBirdFemale,
        maleValue: item.feedPerBirdMale,
      },
      {
        label: 'Total Feed Cons.',
        femaleValue: item.totalFeedConsumptionFemale,
        maleValue: item.totalFeedConsumptionMale,
      },
      {
        label: 'Cost/Bird',
        femaleValue: item.costPerBirdFemale,
        maleValue: item.costPerBirdMale,
      },
      {
        label: 'Running Cost',
        femaleValue: item.runningCostFemale,
        maleValue: item.runningCostMale,
      },
      {
        label: 'Body Weight',
        singleValue: formatValue(item.weight, '0'),
      },
    ];

    return (
      <View style={styles.flockCardWrap}>
        <View style={styles.flockCard}>
          <View style={styles.flockHeader}>
            <Text style={styles.flockTitle}>
              {formatValue(item.flockName, `Flock ${index + 1}`)}
            </Text>

            {!!item.runningAge && (
              <View style={styles.flockAgeWrap}>
                <AgeIcon fill={COLORS.primary} />
                <Text style={styles.flockAgeText}>
                  {formatValue(item.runningAge, '')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.flockFieldsList}>
            {flockFields.map(field => (
              <View key={field.label} style={styles.flockFieldLine}>
                <Text style={styles.flockFieldLabel}>{field.label}:</Text>
                {field.singleValue != null ? (
                  <Text style={styles.flockFieldValue}>
                    {' '}
                    {formatValue(field.singleValue)}
                  </Text>
                ) : (
                  <Text style={styles.flockFieldMeta}>
                    {' '}
                    <Text style={styles.flockFieldValue}>(F): </Text>
                    <Text style={styles.flockFieldValue}>
                      {formatValue(field.femaleValue)}
                    </Text>
                    <Text style={styles.flockFieldMeta}> | </Text>
                    <Text style={styles.flockFieldValue}>(M): </Text>
                    <Text style={styles.flockFieldValue}>
                      {formatValue(field.maleValue)}
                    </Text>
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('ProfileScreen')}
          style={({ pressed }) => [
            styles.profileIconContainer,
            pressed && styles.pressablePressed,
          ]}
        >
          <Ionicons name="person-outline" size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text numberOfLines={1} style={styles.nameText}>
            {displayName}
          </Text>
        </View>
      </View>

      <View style={styles.contentSheet}>
        {isInitialLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.sheetBody}
            data={activeFlockList}
            keyExtractor={(item, index) =>
              `${formatValue(item.flockName, 'flock')}-${index}`
            }
            ListEmptyComponent={
              <View style={styles.activeFlockSection}>
                <View style={styles.emptyStateCard}>
                  <Text style={styles.emptyStateText}>
                    No active flock available.
                  </Text>
                </View>
              </View>
            }
            ListHeaderComponent={
              <>
                <View style={styles.summaryCard}>
                  <View style={styles.roleRow}>
                    <Ionicons
                      name="briefcase"
                      size={16}
                      color={COLORS.primary}
                    />
                    <Text numberOfLines={1} style={styles.roleText}>
                      Administrator
                    </Text>
                  </View>
                  <Text style={styles.companyText}>Bitsflock Poultry Co.</Text>

                  <View style={styles.cardGrid}>
                    <Pressable
                      onPress={() => navigation.navigate('FlockListScreen')}
                      style={({ pressed }) => [
                        styles.card,
                        styles.darkCard,
                        pressed && styles.pressablePressed,
                      ]}
                    >
                      <Ionicons name="stats-chart" size={22} color="#FFFFFF" />
                      <Text style={styles.darkCardTitle}>
                        Active Farm Report
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        navigation.navigate('ClosedBatchesListScreen')
                      }
                      style={({ pressed }) => [
                        styles.card,
                        pressed && styles.pressablePressed,
                      ]}
                    >
                      <Ionicons name="grid" size={22} color="#5E5E5E" />
                      <Text style={styles.lightCardTitle}>Closed Batches</Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        navigation.navigate('SalesReportListScreen')
                      }
                      style={({ pressed }) => [
                        styles.card,
                        pressed && styles.pressablePressed,
                      ]}
                    >
                      <Ionicons name="bar-chart" size={22} color="#5E5E5E" />
                      <Text style={styles.lightCardTitle}>Sales Report</Text>
                    </Pressable>

                    <View style={[styles.card, styles.stockCard]}>
                      <Text style={styles.stockCount}>{data?.EggQty ?? 0}</Text>
                      <Text style={styles.stockLabel}>Egg Quantity</Text>
                    </View>

                    <View style={[styles.card, styles.stockCard]}>
                      <Text style={styles.stockCount}>
                        {data?.FemaleQty ?? 0}
                      </Text>
                      <Text style={styles.stockLabel}>Female Quantity</Text>
                    </View>

                    <View style={[styles.card, styles.stockCard]}>
                      <Text style={styles.stockCount}>
                        {data?.MaleQty ?? 0}
                      </Text>
                      <Text style={styles.stockLabel}>Male Quantity</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.activeFlockSection}>
                  <Text style={styles.sectionTitle}>Active Flock</Text>
                </View>
              </>
            }
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            renderItem={renderFlockCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Container>
  );
};

export default HomeScreen;
