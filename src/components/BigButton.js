import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { C } from '../theme';

// ලොකු, පැහැදිලි බොත්තම — වයසක අයටත් ඔබන්න ලේසියි
export default function BigButton({ label, onPress, color = C.green, textColor = C.white, style, small = false }) {
  const { fs } = useApp();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: color, paddingVertical: small ? 12 : 18 },
        pressed && { opacity: 0.75, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor, fontSize: fs(small ? 16 : 20) }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', minHeight: 52 },
  text: { fontWeight: '800', textAlign: 'center' },
});
