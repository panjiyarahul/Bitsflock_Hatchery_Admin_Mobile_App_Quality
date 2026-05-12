import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from '../../constants/dimensions';
import { BORDER_RADIUS, SPACING } from '../../constants/spacing';

export type InputFieldProps = TextInputProps & {
  label: string;
  secureTextEntry?: boolean;
};

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    { label, value = '', secureTextEntry = false, onFocus, onBlur, ...rest },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const hasValue = !!String(value ?? '').length;
    const isRaised = isFocused || hasValue;

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      >
        <Animatable.View
          duration={180}
          easing="ease-out-cubic"
          transition={['borderColor', 'shadowOpacity', 'elevation']}
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
          ]}
        >
          <Animatable.Text
            duration={180}
            easing="ease-out-cubic"
            transition={['top', 'fontSize']}
            style={[
              styles.label,
              isRaised ? styles.labelRaised : styles.labelBlurred,
            ]}
          >
            {label}
          </Animatable.Text>

          <TextInput
            ref={inputRef}
            {...rest}
            placeholder=""
            placeholderTextColor="#9CA3AF"
            selectionColor="#111827"
            style={styles.input}
            value={String(value ?? '')}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={event => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={event => {
              setIsFocused(false);
              onBlur?.(event);
            }}
          />

          {secureTextEntry ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isPasswordVisible ? 'Hide password' : 'Show password'
              }
              hitSlop={10}
              onPress={() => setIsPasswordVisible(current => !current)}
              style={({ pressed }) => [
                styles.eyeButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                color="#6B7280"
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
              />
            </Pressable>
          ) : null}
        </Animatable.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  inputContainer: {
    minHeight: verticalScale(46),
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.md,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0,
    shadowRadius: 16,
    elevation: 0,
  },
  inputContainerFocused: {
    borderColor: 'rgba(17, 24, 39, 1)',
    shadowOpacity: 0.08,
    elevation: 2,
  },
  label: {
    position: 'absolute',
    left: SPACING.md,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(4),
    fontWeight: '500',
    zIndex: 1,
  },
  labelBlurred: {
    top: verticalScale(13),
    fontSize: moderateScale(14),
    color: '#9CA3AF',
  },
  labelRaised: {
    top: verticalScale(-8),
    fontSize: moderateScale(11),
    color: '#111827',
  },
  input: {
    color: '#111827',
    fontSize: moderateScale(14),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(7),
    paddingRight: moderateScale(36),
  },
  eyeButton: {
    position: 'absolute',
    right: SPACING.md,
    top: '50%',
    marginTop: -verticalScale(11),
  },
  pressed: {
    opacity: 0.82,
  },
});

export default InputField;
