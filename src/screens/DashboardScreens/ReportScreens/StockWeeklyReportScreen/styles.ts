import { StyleSheet } from 'react-native';
import { SPACING } from '../../../../constants/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
});
