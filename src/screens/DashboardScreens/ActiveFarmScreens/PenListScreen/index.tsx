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
import { useGetPenListQuery } from '../../../../redux/api/activeflockAPI';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const PenListScreen = ({ route }: any) => {
  const { id, flockName } = route?.params ?? {};
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { data, isLoading, isFetching, refetch } = useGetPenListQuery(
    flockName,
    {
      skip: !id,
    },
  );
  const penList = Array.isArray(data) ? data : [];

  const renderItem = ({ item }: { item: (typeof penList)[number] }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('FlockFarmListScreen', { id: item?.FlockDetailsId })
      }
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.penName}>{formatValue(item.Pen, 'Pen')}</Text>

        <View style={styles.agePill}>
          <Ionicons name="git-branch-outline" size={14} color="#FFFFFF" />
          <Text style={styles.ageBadgeText}>Pen</Text>
        </View>
      </View>

      <View style={styles.footerInfoWrap}>
        <View style={styles.footerInfoRow}>
          <Ionicons name="layers-outline" size={15} color="#B7C0CB" />
          <Text style={styles.footerInfoLabel}>Selected Flock</Text>
          <Text style={styles.footerInfoValue}>{formatValue(flockName)}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Pen List" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={penList}
          keyExtractor={(item, index) =>
            `${formatValue(item.FlockDetailsId, 'pen')}-${index}`
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No pen found</Text>
              <Text style={styles.emptyText}>
                No pen is available under this flock right now.
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

export default PenListScreen;
