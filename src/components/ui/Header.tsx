import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from '../../constants/dimensions';
import { SPACING } from '../../constants/spacing';
import { COLORS } from '../../constants';

type HeaderProps = {
  title: string;
  whiteBg?: boolean;
  rightButtonName?: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
};

const Header = ({
  title,
  whiteBg,
  rightButtonName,
  onBackPress,
  onRightPress,
}: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: whiteBg ? COLORS.white : COLORS.primary },
      ]}
    >
      <View style={styles.sideSlot}>
        <Pressable
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={onBackPress ?? (() => navigation.goBack())}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={whiteBg ? '#000000"' : '#FFFFFF'}
          />
        </Pressable>
      </View>

      <View pointerEvents="none" style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>

      <View style={[styles.sideSlot, styles.sideSlotRight]}>
        {rightButtonName && onRightPress ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={12}
            onPress={onRightPress}
            style={({ pressed }) => [
              styles.rightButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text numberOfLines={1} style={styles.rightButtonText}>
              {rightButtonName}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: verticalScale(72),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomLeftRadius: moderateScale(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideSlot: {
    width: moderateScale(108),
    justifyContent: 'center',
  },
  sideSlotRight: {
    alignItems: 'flex-end',
  },
  backButton: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: moderateScale(19),
    fontWeight: '700',
    textAlign: 'center',
  },
  rightButton: {
    minWidth: moderateScale(42),
    minHeight: moderateScale(42),
    paddingHorizontal: SPACING.sm,
    borderRadius: moderateScale(21),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  rightButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.82,
  },
});

export default Header;
