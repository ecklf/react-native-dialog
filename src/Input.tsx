import PropTypes from "prop-types";
import * as React from "react";
import { LegacyRef } from "react";
import {
  Platform,
  PlatformColor,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewPropTypes,
  ViewStyle,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

export interface DialogInputProps extends TextInputProps {
  label?: string;
  wrapperStyle?: ViewStyle;
  textInputRef?: LegacyRef<TextInput>;
}

const DialogInput: React.FC<DialogInputProps> = (props) => {
  const {
    label,
    style,
    wrapperStyle,
    textInputRef,
    multiline,
    numberOfLines,
    ...nodeProps
  } = props;
  const lines = (multiline && numberOfLines) || 1;
  const height =
    18 + Platform.select({ ios: 14, android: 22, default: 0 }) * lines;
  const { styles, isDark } = useTheme(buildStyles);
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={textInputRef}
        placeholderTextColor={
          Platform.OS === "ios"
            ? PlatformColor("placeholderText")
            : PlatformColor(
                `@color/${
                  isDark ? "dialog_hint_text_dark" : "dialog_hint_text_light"
                }`
              )
        }
        underlineColorAndroid={PlatformColor(
          `@color/${
            isDark ? "dialog_hint_text_dark" : "dialog_hint_text_light"
          }`
        )}
        style={[styles.textInput, style, { height }]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...nodeProps}
      />
    </View>
  );
};

DialogInput.propTypes = {
  ...ViewPropTypes,
  label: PropTypes.string,
  style: PropTypes.any,
  textInputRef: PropTypes.any,
  wrapperStyle: PropTypes.any,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
};

DialogInput.displayName = "DialogInput";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    textInputWrapper: Platform.select({
      ios: {
        backgroundColor: PlatformColor("systemGray5"),
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        borderColor: PlatformColor("separator"),
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 8,
      },
      android: {
        marginHorizontal: 10,
        marginBottom: 20,
      },
      default: {},
    }),
    label: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: PlatformColor(
          `@color/${
            isDark ? "dialog_primary_text_dark" : "dialog_primary_text_light"
          }`
        ),
        fontSize: 14,
      },
      default: {},
    }),
    textInput: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: PlatformColor(
          `@color/${
            isDark ? "dialog_primary_text_dark" : "dialog_primary_text_light"
          }`
        ),
        marginLeft: -4,
        paddingLeft: 4,
      },
      default: {},
    }),
  });

export default DialogInput;
