import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, SPACING, RADIUS } from "../styles/constants";
import { Theme } from "../styles/theme";
import { useTheme } from "../context/ThemeContext";

interface ModalWrapperProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode; // children
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  visible,
  onClose,
  children,
}) => {
  const { theme } = useTheme();
  const dynamicStyles = styles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalContent}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.modalBackground,
    },
    modalContent: {
      width: "80%",
      padding: SPACING.large,
      borderRadius: RADIUS.small,
      elevation: 5,
      backgroundColor: theme.cardBackground,
    },
  });

export default ModalWrapper;
