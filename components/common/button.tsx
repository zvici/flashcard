import Text from "@/components/common/text";
import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const { title, onPress, variant = "primary" } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "primary" ? styles.secondary : styles.primary,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  primary: {
    backgroundColor: Colors.dark.primary,
  },
  secondary: {
    backgroundColor: Colors.dark.secondary,
  },
  buttonText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
