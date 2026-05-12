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
import { useGetSalesReportListQuery } from '../../../../redux/api/salesreportAPI';
import {
  ISalesReportDateGroup,
  ISalesReportItem,
} from '../../../../types/apiTypes';
import { formatDate } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const formatAmount = (value?: number) =>
  value == null ? '-' : `Rs. ${Number(value).toLocaleString('en-US')}`;

const SalesReportListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { data, isLoading, isFetching, refetch } = useGetSalesReportListQuery();
  const salesReportList = Array.isArray(data) ? data : [];

  const renderSaleCard = (sale: ISalesReportItem) => (
    <Pressable
      key={sale.salesid ?? sale.invoice_no}
      onPress={() =>
        navigation.navigate('SalesDetailsScreen', { id: sale.salesid })
      }
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.invoiceNumber}>
          {formatValue(sale.invoice_no, 'Invoice')}
        </Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{formatValue(sale.status)}</Text>
        </View>
      </View>

      <View style={styles.customerRow}>
        <View style={styles.customerIconWrap}>
          <Ionicons name="person-outline" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.customerName}>
          {formatValue(sale.customer_name)}
        </Text>
      </View>

      <View style={styles.amountGrid}>
        <View style={styles.amountBlock}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(sale.total_amount)}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>Net</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(sale.net_amount)}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(sale.discount_amount)}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.label}>VAT</Text>
          <Text style={styles.valuePrimary}>
            {formatAmount(sale.vat_amount)}
          </Text>
        </View>
      </View>

      <View style={styles.footerInfoWrap}>
        <View style={styles.footerInfoRow}>
          <Ionicons name="card-outline" size={15} color="#B7C0CB" />
          <Text style={styles.footerInfoLabel}>Payment</Text>
          <Text style={styles.footerInfoValue}>
            {formatValue(sale.payment_type)}
          </Text>
        </View>

        <View style={styles.footerInfoRow}>
          <Ionicons name="pricetag-outline" size={15} color="#B7C0CB" />
          <Text style={styles.footerInfoLabel}>Discount %</Text>
          <Text style={styles.footerInfoValue}>
            {formatValue(sale.discount_percentage, '0')}%
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }: { item: ISalesReportDateGroup }) => (
    <View style={styles.dateGroup}>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          {formatDate(item.invoice_date, {
            includeWeekday: false,
            dayFirst: true,
          })}
        </Text>
        <View style={styles.dateDash} />
      </View>

      {(item.sales ?? []).map(renderSaleCard)}
    </View>
  );

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Sales Report" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={salesReportList}
          keyExtractor={(item, index) =>
            `${formatValue(item.invoice_date, 'sales-report')}-${index}`
          }
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No sales report found</Text>
              <Text style={styles.emptyText}>
                The sales report list is empty right now.
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

export default SalesReportListScreen;
