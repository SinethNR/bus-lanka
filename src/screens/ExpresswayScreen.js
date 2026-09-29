import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITY_BY_ID } from '../data/cities';
import { ROUTES } from '../data/routes';
import { fmtRs } from '../utils/search';
import Header from '../components/Header';
import { C, shadow } from '../theme';

// 🛣️ හයිවේ (අධිවේගී මාර්ග) බස් — දක්ෂිණ සහ මධ්‍යම
export default function ExpresswayScreen({ back, go }) {
  const { lang, t, fs } = useApp();
  const expRoutes = ROUTES.filter((r) => r.exp);
  const south = expRoutes.filter((r) => r.exp.via === 'south');
  const other = expRoutes.filter((r) => r.exp.via !== 'south');

  const Section = ({ title, list }) => (
    <>
      <Text style={[styles.h2, { fontSize: fs(18) }]}>{title}</Text>
      {list.map((r) => {
        const to = r.stops[r.stops.length - 1];
        return (
          <Pressable
            key={r.id}
            onPress={() => go('results', { from: r.stops[0], to })}
            style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.dest, { fontSize: fs(20) }]}>
                {CITY_BY_ID[r.stops[0]][lang]} → {CITY_BY_ID[to][lang]}
              </Text>
              <Text style={[styles.code, { fontSize: fs(14) }]}>
                {r.exp.code}
                {r.exp.hours ? `  ·  ⏱️ ~${r.exp.hours} ${t('hours')}` : ''}
              </Text>
            </View>
            <Text style={[styles.fare, { fontSize: fs(19) }]}>{r.exp.fare ? fmtRs(r.exp.fare) : '—'}</Text>
          </Pressable>
        );
      })}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title={t('expTitle')} subtitle={t('expSub')} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Section title={t('expSouth')} list={south} />
        <Section title={t('expCentral')} list={other} />
        <Text style={[styles.disclaimer, { fontSize: fs(13) }]}>{t('disclaimer')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  h2: { color: C.green, fontWeight: '900', marginTop: 8, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: C.green,
    ...shadow,
  },
  dest: { color: C.text, fontWeight: '800' },
  code: { color: C.muted, marginTop: 4 },
  fare: { color: C.green, fontWeight: '900', marginLeft: 8 },
  disclaimer: { color: C.muted, marginTop: 12, textAlign: 'center', lineHeight: 19 },
});
