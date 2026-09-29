import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { LANGS, LANG_LABELS } from '../i18n/strings';
import { C } from '../theme';

// සිංහල / English / தமிழ் මාරු කරන බොත්තම් + අකුරු ලොකු කරන බොත්තම
export default function LangSwitch() {
  const { lang, setLang, big, setBig, t, fs } = useApp();
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {LANGS.map((l) => {
          const active = l === lang;
          return (
            <Pressable
              key={l}
              onPress={() => setLang(l)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillText, { fontSize: fs(15) }, active && styles.pillTextActive]}>
                {LANG_LABELS[l]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={() => setBig(!big)}
        accessibilityRole="button"
        style={[styles.textBtn, big && styles.pillActive]}
      >
        <Text style={[styles.pillText, { fontSize: fs(15) }, big && styles.pillTextActive]}>
          {big ? 'A−  ' + t('smallText') : 'A+  ' + t('bigText')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14 },
  row: { flexDirection: 'row', gap: 8 },
  pill: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  pillActive: { backgroundColor: C.gold, borderColor: C.gold },
  pillText: { color: C.white, fontWeight: '700' },
  pillTextActive: { color: C.text },
  textBtn: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
