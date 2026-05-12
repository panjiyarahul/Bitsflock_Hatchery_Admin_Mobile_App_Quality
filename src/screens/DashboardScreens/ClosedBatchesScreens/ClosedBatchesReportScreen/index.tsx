import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Container, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { IFlockReportShedStatus } from '../../../../types/apiTypes';
import { useGetClosedFlockReportQuery } from '../../../../redux/api/closedflockAPI';
import { parseJsonString } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const ClosedBatchesReportScreen = ({ route }: any) => {
  const { id, age } = route?.params;

  const { data, isLoading, isFetching, refetch } = useGetClosedFlockReportQuery(
    {
      id,
      age,
    },
  );
  const closedBatchesShedStatus = parseJsonString<IFlockReportShedStatus>(
    data?.shed_status,
  );
  const closedBatchesReportFields = [
    { label: 'Opening Birds', value: data?.opening_Birds },
    { label: 'Closing Bird', value: data?.closing_bird },
    { label: 'Mortality', value: data?.mortality_Number },
    { label: 'Cum. Mortality', value: data?.cum_Mortality_Number },
    { label: 'Body Weight', value: data?.body_Weight },
    { label: 'Feed Consumption (Kg)', value: data?.feed_Consumption_in_Kg },
    { label: 'Feed Per Bird', value: data?.feed_per_bird },
    { label: 'Light At', value: data?.light_At },
    { label: 'Light Duration', value: data?.light_Duration },
    { label: 'Std Feed Rate', value: data?.std_feed_rate },
    { label: 'Std Body Wt', value: data?.std_body_wt },
    { label: 'Min Temp', value: data?.min_Temp },
    { label: 'Max Temp', value: data?.max_Temp },
  ];

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Report" />

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
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>
              {formatValue(closedBatchesShedStatus?.shedName)}
            </Text>
            <Text style={styles.heroSubtitle}>
              {formatValue(closedBatchesShedStatus?.BreedName)}
            </Text>

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Initial Stock</Text>
                <Text style={styles.heroStatValue}>
                  {formatValue(closedBatchesShedStatus?.initial_Stock)}
                </Text>
              </View>

              <View style={styles.heroDivider} />

              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Age</Text>
                <Text style={styles.heroStatValue}>
                  {formatValue(data?.age)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Daily Summary</Text>

            <View style={styles.grid}>
              {closedBatchesReportFields.map(field => (
                <View key={field.label} style={styles.gridItem}>
                  <Text style={styles.label}>{field.label}</Text>
                  <Text style={styles.value}>{formatValue(field.value)}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default ClosedBatchesReportScreen;
