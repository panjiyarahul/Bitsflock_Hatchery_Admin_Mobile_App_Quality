import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { moderateScale, verticalScale } from '../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../constants/spacing';

type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  fullWidth?: boolean;
  style?: ViewStyle;
};

const Button = ({
  title,
  isLoading = false,
  disabled = false,
  backgroundColor,
  fullWidth = true,
  style,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        fullWidth && styles.fullWidth,
        backgroundColor ? { backgroundColor } : null,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={[styles.title, isDisabled && styles.titleDisabled]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: verticalScale(46),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#111827',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
  },
  fullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonPressed: {
    opacity: 0.82,
  },
  title: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  titleDisabled: {
    color: '#F3F4F6',
  },
});

export default Button;
