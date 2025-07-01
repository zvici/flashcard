import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface IconButtonProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  color?: string;
  onPress: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { name, size = 20, color = "#000", onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
