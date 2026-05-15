import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Container, Dropdown, Header } from '../../../../components';
import { COLORS } from '../../../../constants';
import { useGetFlockListQuery } from '../../../../redux/api/reportAPI';
import { IReportFlockListItem } from '../../../../types/apiTypes';
import { styles } from './styles';

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const FlockBookReportScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedFlock, setSelectedFlock] = useState<IReportFlockListItem>();
  const { data, isLoading, isFetching, refetch } = useGetFlockListQuery();
  const flockList = Array.isArray(data) ? data : [];

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
        onSelect={setSelectedFlock}
        placeholder="Select Flock"
        refreshing={isFetching}
        renderLabel={item => formatValue(item.flockName)}
        selectedItem={selectedFlock}
        title="Select Flock"
      />

      <View style={styles.footer}>
        <Button
          backgroundColor={COLORS.primary}
          disabled={selectedFlock?.id == null}
          onPress={() =>
            navigation.navigate('FlockBookReportDetailsScreen', {
              flockName: selectedFlock?.flockName,
            })
          }
          title="Continue"
        />
      </View>
    </Container>
  );
};

export default FlockBookReportScreen;
