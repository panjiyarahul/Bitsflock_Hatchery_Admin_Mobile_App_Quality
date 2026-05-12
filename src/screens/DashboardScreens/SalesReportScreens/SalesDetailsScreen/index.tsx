import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { useGetSalesDetailsQuery } from '../../../../redux/api/salesreportAPI';
import { ISalesDetailsItem } from '../../../../types/apiTypes';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const formatAmount = (value?: number) =>
  value == null ? '-' : `Rs. ${Number(value).toLocaleString('en-US')}`;

const SalesDetailsScreen = ({ route }: any) => {
  const { id } = route?.params;
  const { data, isLoading, isFetching, refetch } = useGetSalesDetailsQuery(id);
  const salesItems = Array.isArray(data) ? data : [];

  const renderItemCard = (item: ISalesDetailsItem, index: number) => (
    <View
      key={`${formatValue(item.products, 'product')}-${index}`}
      style={styles.card}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.productName}>{formatValue(item.products)}</Text>
        <View style={styles.flockPill}>
          <Text style={styles.flockText}>{formatValue(item.flock)}</Text>
        </View>
      </View>

      <View style={styles.quantityRow}>
        <View style={styles.quantityIconWrap}>
          <Ionicons name="cube-outline" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.quantityText}>
          Qty {formatValue(item.quantity, '0')} + Bonus{' '}
          {formatValue(item.bonusQuantity, '0')}
        </Text>
      </View>

      <View style={styles.amountGrid}>
        <View style={styles.amountBlock}>
          <Text style={styles.label}>Rate</Text>
          <Text style={styles.valuePrimary}>{formatAmount(item.rate)}</Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(item.total_amount)}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(item.discount_amount)}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>Net</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(item.net_amount)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Sales Details" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary]}
              onRefresh={refetch}
              refreshing={isFetching}
              tintColor={COLORS.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {salesItems.length > 0 ? (
            salesItems.map(renderItemCard)
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No sales items found</Text>
              <Text style={styles.emptyText}>
                The sales details list is empty right now.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

export default SalesDetailsScreen;
