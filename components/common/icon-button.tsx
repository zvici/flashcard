import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IconButtonProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  color?: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { name, size = 20, color = "#000", disabled = false, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        width: size + 16,
        height: size + 16,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.3 : 1,
      }}
      disabled={disabled}
    >
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
