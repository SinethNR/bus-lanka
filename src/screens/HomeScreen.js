import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITY_BY_ID, POPULAR } from '../data/cities';
import { TIPS } from '../i18n/strings';
import Header from '../components/Header';
import LangSwitch from '../components/LangSwitch';
import BigButton from '../components/BigButton';
import CityPicker from '../components/CityPicker';
import { C, shadow } from '../theme';

// ප්‍රධාන තිරය: "කොහෙ ඉඳන්ද?" → "කොහෙටද?" → "බස් හොයන්න"
export default function HomeScreen({ go }) {
  const { lang, t, tr, fs, from, setFrom, to, setTo } = useApp();
  const [picker, setPicker] = useState(null); // 'from' | 'to' | null
  const [warn, setWarn] = useState(null);

  const onSearch = () => {
    if (!from || !to) return setWarn(t('pickBoth'));
    if (from === to) return setWarn(t('sameCity'));
    setWarn(null);
    go('results', { from, to });
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <Header title={`🚌 ${t('appTitle')}`} subtitle={t('appSub')}>
          <LangSwitch />
        </Header>

        {/* සෙවුම් කාඩ් එක */}
        <View style={styles.card}>
          <CityField label={t('from')} value={CITY_BY_ID[from]?.[lang]} placeholder={t('tapToChoose')} onPress={() => setPicker('from')} icon="🟢" fs={fs} />
          <Pressable onPress={swap} style={styles.swap} accessibilityRole="button">
            <Text style={[styles.swapText, { fontSize: fs(16) }]}>{t('swap')}</Text>
          </Pressable>
          <CityField label={t('to')} value={CITY_BY_ID[to]?.[lang]} placeholder={t('tapToChoose')} onPress={() => setPicker('to')} icon="🔴" fs={fs} />
          {warn ? <Text style={[styles.warn, { fontSize: fs(15) }]}>⚠️ {warn}</Text> : null}
          <BigButton label={t('search')} onPress={onSearch} style={{ marginTop: 14 }} />
        </View>

        {/* ලොකු කොටු 3: රාත්‍රී / හයිවේ / උදව් */}
        <View style={styles.tiles}>
          <Tile icon="🌙" label={t('night')} color={C.night} onPress={() => go('night')} fs={fs} />
          <Tile icon="🛣️" label={t('expressway')} color={C.green} onPress={() => go('express')} fs={fs} />
          <Tile icon="📞" label={t('help')} color={C.primary} onPress={() => go('help')} fs={fs} />
        </View>

        {/* කොළඹ සිට ජනප්‍රිය ගමන් */}
        <Text style={[styles.h2, { fontSize: fs(19) }]}>⭐ {t('popular')}</Text>
        <View style={styles.grid}>
          {POPULAR.map((id) => (
            <Pressable
              key={id}
              onPress={() => {
                setFrom('colombo');
                setTo(id);
                go('results', { from: 'colombo', to: id });
              }}
              style={({ pressed }) => [styles.chip, pressed && { opacity: 0.7 }]}
              accessibilityRole="button"
            >
              <Text style={[styles.chipText, { fontSize: fs(16) }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                {CITY_BY_ID[id][lang]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* උපදෙස් */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <Text style={[styles.h3, { fontSize: fs(18) }]}>{t('tips')}</Text>
          {TIPS.slice(0, 3).map((tip, i) => (
            <Text key={i} style={[styles.tip, { fontSize: fs(15) }]}>• {tr(tip)}</Text>
          ))}
        </View>

        <Text style={[styles.disclaimer, { fontSize: fs(13) }]}>{t('disclaimer')}</Text>
      </ScrollView>

      <CityPicker
        visible={picker !== null}
        title={picker === 'from' ? t('from') : t('to')}
        onClose={() => setPicker(null)}
        onPick={(id) => {
          if (picker === 'from') setFrom(id);
          else setTo(id);
          setPicker(null);
          setWarn(null);
        }}
      />
    </View>
  );
}

function CityField({ label, value, placeholder, onPress, icon, fs }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.field, pressed && { backgroundColor: '#F7E9D7' }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.fieldLabel, { fontSize: fs(15) }]}>{icon} {label}</Text>
      <Text style={[styles.fieldValue, { fontSize: fs(24) }, !value && { color: C.muted }]}>
        {value || placeholder + ' 👆'}
      </Text>
    </Pressable>
  );
}

function Tile({ icon, label, color, onPress, fs }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, { backgroundColor: color }, pressed && { opacity: 0.8 }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={{ fontSize: fs(30) }}>{icon}</Text>
      <Text style={[styles.tileText, { fontSize: fs(15) }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: C.card, margin: 16, marginBottom: 0, borderRadius: 20, padding: 16, ...shadow },
  field: { borderWidth: 2, borderColor: C.border, borderRadius: 16, padding: 14, backgroundColor: '#FFFCF7' },
  fieldLabel: { color: C.muted, fontWeight: '700' },
  fieldValue: { color: C.text, fontWeight: '800', marginTop: 4 },
  swap: {
    alignSelf: 'center',
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 8,
  },
  swapText: { fontWeight: '800', color: C.text },
  warn: { backgroundColor: C.warnBg, color: C.warnText, padding: 10, borderRadius: 10, marginTop: 12 },
  tiles: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginTop: 16 },
  tile: { flex: 1, borderRadius: 18, paddingVertical: 16, alignItems: 'center', minHeight: 100, justifyContent: 'center', ...shadow },
  tileText: { color: C.white, fontWeight: '800', marginTop: 6, textAlign: 'center' },
  h2: { color: C.text, fontWeight: '800', marginHorizontal: 16, marginTop: 22, marginBottom: 10 },
  h3: { color: C.primary, fontWeight: '800', marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginHorizontal: 16 },
  chip: {
    width: '31%',
    flexGrow: 1,
    backgroundColor: C.card,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  chipText: { color: C.text, fontWeight: '700', textAlign: 'center' },
  tip: { color: C.text, marginBottom: 6, lineHeight: 22 },
  disclaimer: { color: C.muted, marginHorizontal: 16, marginTop: 16, textAlign: 'center', lineHeight: 19 },
});
