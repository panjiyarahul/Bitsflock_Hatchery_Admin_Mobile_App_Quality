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
import { useGetFlockListQuery } from '../../../../redux/api/activeflockAPI';
import { formatDate } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const FlockListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { data, isLoading, isFetching, refetch } = useGetFlockListQuery();
  const flockList = Array.isArray(data) ? data : [];

  const renderItem = ({ item }: { item: (typeof flockList)[number] }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('PenListScreen', {
          id: item?.flock_Id,
          flockName: item?.flock,
        })
      }
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.flockName}>{formatValue(item.flock)}</Text>

        <View style={styles.agePill}>
          <Ionicons name="time-outline" size={14} color="#FFFFFF" />
          <Text style={styles.ageBadgeText}>
            {formatValue(item.age, '0')} days
          </Text>
        </View>
      </View>

      <View style={styles.breedRow}>
        <View style={styles.breedIconWrap}>
          <Ionicons name="logo-octocat" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.breedText}>{formatValue(item.breed)}</Text>
      </View>

      <View style={styles.metricStrip}>
        <View style={styles.metricBlock}>
          <Text style={styles.label}>Initial Stock</Text>
          <Text style={styles.valuePrimary}>
            {formatValue(item.flock_Size)}
          </Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <Text style={styles.label}>Flock ID</Text>
          <Text style={styles.valuePrimary}>{formatValue(item.flock_Id)}</Text>
        </View>
      </View>

      <View style={styles.footerInfoWrap}>
        <View style={styles.footerInfoRow}>
          <Ionicons name="home-outline" size={15} color="#B7C0CB" />
          <Text style={styles.footerInfoLabel}>Shed</Text>
          <Text style={styles.footerInfoValue}>{formatValue(item.shed)}</Text>
        </View>

        <View style={styles.footerInfoRow}>
          <Ionicons name="calendar-outline" size={15} color="#B7C0CB" />
          <Text style={styles.footerInfoLabel}>Last Updated</Text>
          <Text style={styles.footerInfoValue}>
            {formatDate(item.updated_Date)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Flock List" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={flockList}
          keyExtractor={(item, index) =>
            `${formatValue(item.flock_Id, 'flock')}-${index}`
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No flock found</Text>
              <Text style={styles.emptyText}>
                The flock list is empty right now.
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

export default FlockListScreen;
