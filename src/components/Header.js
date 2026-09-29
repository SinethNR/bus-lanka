import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { C } from '../theme';

// හැම පිටුවකම උඩ තියෙන තීරුව. onBack දුන්නොත් "ආපසු" බොත්තම පෙන්වනවා.
export default function Header({ title, subtitle, onBack, dark = false, children }) {
  const { t, fs } = useApp();
  const bg = dark ? C.night : C.primary;
  return (
    <View style={[styles.wrap, { backgroundColor: bg }]}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel={t('back')}
          hitSlop={12}
        >
          <Text style={[styles.backText, { fontSize: fs(18) }]}>{t('back')}</Text>
        </Pressable>
      ) : null}
      <Text style={[styles.title, { fontSize: fs(onBack ? 22 : 28) }]}>{title}</Text>
      {subtitle ? <Text style={[styles.sub, { fontSize: fs(15) }]}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
  back: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  backText: { color: C.white, fontWeight: '700' },
  title: { color: C.white, fontWeight: '800' },
  sub: { color: 'rgba(255,255,255,0.9)', marginTop: 4 },
});
