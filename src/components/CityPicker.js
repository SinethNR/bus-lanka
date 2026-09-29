import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/cities';
import { C } from '../theme';

// නගරයක් තෝරන සම්පූර්ණ තිරය — ලොකු අකුරු, සෙවුම් කොටුවක් එක්ක
export default function CityPicker({ visible, title, onPick, onClose }) {
  const { lang, t, fs } = useApp();
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = query
      ? CITIES.filter((c) => [c.si, c.en, c.ta].some((n) => n.toLowerCase().includes(query)))
      : CITIES;
    return filtered;
  }, [q]);

  const close = () => {
    setQ('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.head}>
          <Text style={[styles.title, { fontSize: fs(22) }]}>{title || t('chooseCity')}</Text>
          <Pressable onPress={close} style={styles.close} accessibilityRole="button" hitSlop={10}>
            <Text style={[styles.closeText, { fontSize: fs(16) }]}>{t('close')}</Text>
          </Pressable>
        </View>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder={t('searchCity')}
          placeholderTextColor={C.muted}
          style={[styles.input, { fontSize: fs(19) }]}
          autoCorrect={false}
        />
        <FlatList
          data={list}
          keyExtractor={(c) => c.id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setQ('');
                onPick(item.id);
              }}
              style={({ pressed }) => [styles.row, pressed && { backgroundColor: '#F7E9D7' }]}
              accessibilityRole="button"
            >
              <Text style={[styles.name, { fontSize: fs(21) }]}>{item[lang]}</Text>
              {lang !== 'en' ? <Text style={[styles.en, { fontSize: fs(14) }]}>{item.en}</Text> : null}
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: { color: C.white, fontWeight: '800', flex: 1 },
  close: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  closeText: { color: C.white, fontWeight: '700' },
  input: {
    margin: 16,
    backgroundColor: C.white,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: C.text,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.card,
  },
  name: { color: C.text, fontWeight: '700' },
  en: { color: C.muted, marginTop: 2 },
});
