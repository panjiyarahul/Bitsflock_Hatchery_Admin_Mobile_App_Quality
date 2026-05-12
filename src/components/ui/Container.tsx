import React, { PropsWithChildren, RefObject } from 'react';
import {
  ColorValue,
  Platform,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../constants/spacing';
import { COLORS } from '../../constants';

type ContainerProps = PropsWithChildren<
  ViewProps & {
    backgroundColor?: ColorValue;
    barStyle?: StatusBarStyle;
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    refProps?: RefObject<View | null>;
    primaryColor?: boolean;
  }
>;

const Container = ({
  children,
  backgroundColor,
  barStyle,
  style,
  containerStyle,
  refProps,
  primaryColor = false,
  ...props
}: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const resolvedBackgroundColor =
    backgroundColor ?? (primaryColor ? COLORS.primary : '#FFFFFF');
  const resolvedBarStyle =
    barStyle ?? (primaryColor ? 'dark-content' : 'light-content');

  return (
    <View
      ref={refProps}
      style={[styles.container, style, containerStyle]}
      {...props}
    >
      <StatusBar
        barStyle={resolvedBarStyle}
        backgroundColor={String(resolvedBackgroundColor)}
      />
      {Platform.OS === 'ios' && insets.top > 0 ? (
        <View
          style={{
            height: insets.top,
            backgroundColor: resolvedBackgroundColor,
          }}
        />
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    backgroundColor: '#FFFFFF',
  },
});

export default Container;
