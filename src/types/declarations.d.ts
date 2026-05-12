// ad-bs-converter
declare module 'ad-bs-converter' {
  export type BsDateResult = {
    ne?: {
      year?: string;
      month?: string;
      day?: string;
      strMonth?: string;
      strShortMonth?: string;
      dayOfWeek?: string;
      strDayOfWeek?: string;
      strShortDayOfWeek?: string;
      strMinDayOfWeek?: string;
      totalDaysInMonth?: string;
    };
    en?: {
      year?: number;
      month?: number;
      day?: number;
      strMonth?: string;
      strShortMonth?: string;
      dayOfWeek?: number;
      strDayOfWeek?: string;
      strShortDayOfWeek?: string;
      strMinDayOfWeek?: string;
      totalDaysInMonth?: number;
    };
  };

  export function ad2bs(date: string): BsDateResult;
  export function bs2ad(date: string): unknown;
}

// react-native-floating-label-input
declare module 'react-native-floating-label-input' {
  import * as React from 'react';
  import { TextInputProps, TextStyle, ViewStyle } from 'react-native';

  export type FloatingLabelCustomStyles = {
    colorBlurred?: string;
    colorFocused?: string;
    fontSizeBlurred?: number;
    fontSizeFocused?: number;
    topBlurred?: number;
    topFocused?: number;
    leftBlurred?: number;
    leftFocused?: number;
  };

  export type FloatingLabelInputProps = TextInputProps & {
    label: string;
    value: string;
    isPassword?: boolean;
    animationDuration?: number;
    containerStyles?: ViewStyle;
    inputStyles?: TextStyle;
    labelStyles?: TextStyle;
    customLabelStyles?: FloatingLabelCustomStyles;
    customShowPasswordComponent?: React.ReactElement;
    customHidePasswordComponent?: React.ReactElement;
  };

  export const FloatingLabelInput: React.ComponentType<FloatingLabelInputProps>;
}

// react-native-vector-icons/Ionicons
declare module 'react-native-vector-icons/Ionicons';
