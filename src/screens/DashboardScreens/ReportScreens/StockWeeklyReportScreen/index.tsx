import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Container, Dropdown, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import {
  useGetFlockListQuery,
  useGetPenListQuery,
} from '../../../../redux/api/reportAPI';
import {
  IReportFlockListItem,
  IReportPenListItem,
} from '../../../../types/apiTypes';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const StockWeeklyReportScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedFlock, setSelectedFlock] = useState<IReportFlockListItem>();
  const [selectedPen, setSelectedPen] = useState<IReportPenListItem>();
  const {
    data: flockData,
    isLoading,
    isFetching,
    refetch,
  } = useGetFlockListQuery();
  const {
    data: penData,
    isLoading: isPenLoading,
    isFetching: isPenFetching,
    refetch: refetchPens,
  } = useGetPenListQuery(selectedFlock?.id ?? '', {
    skip: selectedFlock?.id == null,
  });
  const flockList = Array.isArray(flockData) ? flockData : [];
  const penList = Array.isArray(penData) ? penData : [];

  return (
    <Container backgroundColor={COLORS.primary} style={styles.container}>
      <Header title="Choose Report" />

      <Dropdown
        data={flockList}
        emptyText="No flock found"
        keyExtractor={(item, index) =>
          `${formatValue(item.id, 'flock')}-${index}`
        }
        label="Select Flock"
        loading={isLoading}
        onRefresh={refetch}
        onSelect={flock => {
          setSelectedFlock(flock);
          setSelectedPen(undefined);
        }}
        placeholder="Select Flock"
        refreshing={isFetching}
        renderLabel={item => formatValue(item.flockName)}
        selectedItem={selectedFlock}
        title="Select Flock"
      />

      {selectedFlock ? (
        <Dropdown
          data={penList}
          emptyText="No pen found"
          keyExtractor={(item, index) =>
            `${formatValue(item.id, 'pen')}-${index}`
          }
          label="Select Pen"
          loading={isPenLoading}
          onRefresh={refetchPens}
          onSelect={setSelectedPen}
          placeholder="Select Pen"
          refreshing={isPenFetching}
          renderLabel={item => formatValue(item.name)}
          selectedItem={selectedPen}
          title="Select Pen"
        />
      ) : null}

      <View style={styles.footer}>
        <Button
          backgroundColor={COLORS.primary}
          disabled={selectedPen?.id == null}
          onPress={() =>
            navigation.navigate('StockWeeklyReportDetailsScreen', {
              flockName: selectedFlock?.flockName,
              penId: selectedPen?.id,
              penName: selectedPen?.name,
            })
          }
          title="Continue"
        />
      </View>
    </Container>
  );
};

export default StockWeeklyReportScreen;
