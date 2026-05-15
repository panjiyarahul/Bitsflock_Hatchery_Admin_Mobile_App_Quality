import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { moderateScale } from '../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../constants/spacing';

type DropdownProps<T> = {
  data: T[];
  label?: string;
  loading?: boolean;
  emptyText?: string;
  keyExtractor: (item: T, index: number) => string;
  onRefresh?: () => void;
  onSelect: (item: T) => void;
  refreshing?: boolean;
  renderLabel: (item: T) => string;
  selectedItem?: T;
  selectedLabel?: string;
  title?: string;
  placeholder?: string;
};

const formatValue = (value: string | number | undefined, fallback = '-') =>
  value == null || String(value).trim() === '' ? fallback : String(value);

const Dropdown = <T,>({
  data,
  label = 'Select',
  loading = false,
  emptyText = 'No options found',
  keyExtractor,
  onRefresh,
  onSelect,
  refreshing = false,
  renderLabel,
  selectedItem,
  selectedLabel,
  title,
  placeholder,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolvedPlaceholder = placeholder ?? label;
  const resolvedTitle = title ?? label;
  const resolvedSelectedLabel =
    selectedLabel ?? (selectedItem ? renderLabel(selectedItem) : undefined);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen(current => !current)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
      >
        <View style={styles.triggerTextWrap}>
          <Text numberOfLines={1} style={styles.triggerTitle}>
            {resolvedSelectedLabel
              ? formatValue(resolvedSelectedLabel)
              : loading
                ? 'Loading...'
                : resolvedPlaceholder}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <Ionicons
            color={COLORS.primary}
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={22}
          />
        )}
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
        transparent
        visible={isOpen}
      >
        <Pressable
          onPress={() => setIsOpen(false)}
          style={styles.backdrop}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>{resolvedTitle}</Text>

            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              ListEmptyComponent={
                <View style={styles.emptyOption}>
                  <Text style={styles.emptyText}>{emptyText}</Text>
                </View>
              }
              refreshControl={onRefresh ? (
                <RefreshControl
                  colors={[COLORS.primary]}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                  tintColor={COLORS.primary}
                />
              ) : undefined}
              renderItem={({ item }) => {
                const isSelected = item === selectedItem;

                return (
                  <Pressable
                    onPress={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    style={({ pressed }) => [
                      styles.option,
                      isSelected && styles.optionSelected,
                      pressed && styles.optionPressed,
                    ]}
                  >
                    <View style={styles.optionIconSlot} />

                    <View style={styles.optionTextWrap}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                        ]}
                      >
                        {formatValue(renderLabel(item))}
                      </Text>
                    </View>

                    {isSelected ? (
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    ) : (
                      <View style={styles.optionIconSlot} />
                    )}
                  </Pressable>
                );
              }}
              scrollEnabled={data.length > 6}
              style={styles.list}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
  },
  label: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  trigger: {
    minHeight: moderateScale(46),
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerPressed: {
    opacity: 0.86,
  },
  triggerTextWrap: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  triggerTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalCard: {
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  modalTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(17),
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
  },
  list: {
    maxHeight: moderateScale(340),
  },
  option: {
    minHeight: moderateScale(58),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
  },
  optionPressed: {
    opacity: 0.86,
  },
  optionTextWrap: {
    flex: 1,
    alignItems: 'center',
  },
  optionIconSlot: {
    width: 20,
  },
  optionTitle: {
    color: COLORS.secondary,
    fontSize: moderateScale(15),
    fontWeight: '700',
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: '#FFFFFF',
  },
  emptyOption: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  emptyText: {
    color: '#667085',
    fontSize: moderateScale(14),
  },
});

export default Dropdown;
