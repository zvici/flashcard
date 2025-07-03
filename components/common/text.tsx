import { Text as DefaultText, TextStyle } from "react-native";

interface TextProps {
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  size?: number;
  weight?: TextStyle["fontWeight"];
  color?: string;
}

export default function Text(props: TextProps) {
  const { style, children, size, weight, color } = props;
  return (
    <DefaultText style={[{ fontSize: size, fontWeight: weight, color }, style]}>
      {children}
    </DefaultText>
  );
}
