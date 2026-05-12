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
import { useGetFlockReportQuery } from '../../../../redux/api/activeflockAPI';
import { parseJsonString } from '../../../../utils/helper';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const FlockReportScreen = ({ route }: any) => {
  const { id, bId } = route?.params;

  const { data, isLoading, isFetching, refetch } = useGetFlockReportQuery({
    id,
    bId,
  });
  const shedStatus = parseJsonString<IFlockReportShedStatus>(data?.shed_status);
  const reportFields = [
    { label: 'Opening Female Birds', value: data?.opening_female_Birds },
    { label: 'Opening Male Birds', value: data?.opening_male_Birds },
    { label: 'Closing Female Bird', value: data?.closing_female_bird },
    { label: 'Closing Male Bird', value: data?.closing_male_bird },
    { label: 'Female Mortality', value: data?.female_mortality_Number },
    { label: 'Male Mortality', value: data?.male_mortality_Number },
    {
      label: 'Cum. Female Mortality',
      value: data?.cum_Female_Mortality_Number,
    },
    { label: 'Cum. Male Mortality', value: data?.cum_Male_Mortality_Number },
    { label: 'Body Weight', value: data?.body_Weight },
    {
      label: 'Female Feed Cons. (Kg)',
      value: data?.female_feed_Consumption_in_Kg,
    },
    {
      label: 'Male Feed Cons. (Kg)',
      value: data?.male_feed_Consumption_in_Kg,
    },
    { label: 'Feed/Bird Female', value: data?.feed_per_bird_female },
    { label: 'Feed/Bird Male', value: data?.feed_per_bird_male },
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
              {formatValue(shedStatus?.shedName)}
            </Text>
            <Text style={styles.heroSubtitle}>
              {formatValue(shedStatus?.Breed)}
            </Text>

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Initial Stock</Text>
                <Text style={styles.heroStatValue}>
                  {formatValue(shedStatus?.initial_Stock)}
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
              {reportFields.map(field => (
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

export default FlockReportScreen;
