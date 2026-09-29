import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITY_BY_ID } from '../data/cities';
import { TIPS } from '../i18n/strings';
import { allNightTrips, fmtTime, fmtRs } from '../utils/search';
import { callNumber, openUrl } from '../utils/links';
import Header from '../components/Header';
import BigButton from '../components/BigButton';
import { C } from '../theme';

// 🌙 රාත්‍රී බස් (Night Express) — රෑ 6 න් පසු පිටත්වන දුර ගමන් බස් ඔක්කොම
export default function NightScreen({ back, go }) {
  const { lang, t, tr, fs } = useApp();
  const [filter, setFilter] = useState('from'); // 'from' | 'to' | 'all'
  const groups = useMemo(() => allNightTrips(), []);
  const shown = groups.filter((g) =>
    filter === 'all' ? true : filter === 'from' ? g.from === 'colombo' : g.to === 'colombo'
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.night }}>
      <Header title={t('nightTitle')} subtitle={t('nightSub')} onBack={back} dark />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* පෙරහන් බොත්තම් */}
        <View style={styles.filters}>
          {[
            ['from', t('fromColombo')],
            ['to', t('toColombo')],
            ['all', t('all')],
          ].map(([key, label]) => (
            <Pressable
              key={key}
              onPress={() => setFilter(key)}
              style={[styles.filter, filter === key && styles.filterActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === key }}
            >
              <Text style={[styles.filterText, { fontSize: fs(15) }, filter === key && { color: C.night }]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {shown.map((g) => (
          <View key={g.key} style={styles.group}>
            <Pressable onPress={() => go('results', { from: g.from, to: g.to })} accessibilityRole="button">
              <Text style={[styles.groupTitle, { fontSize: fs(20) }]}>
                {CITY_BY_ID[g.from][lang]} → {CITY_BY_ID[g.to][lang]}
              </Text>
              <Text style={[styles.groupMeta, { fontSize: fs(14) }]}>
                {t('route')} {g.route.no} · ~{g.route.hours} {t('hours')} · {g.deps.length} 🚌  ›
              </Text>
            </Pressable>
            {g.deps.map((x, i) => (
              <View key={i} style={styles.dep}>
                <Text style={[styles.time, { fontSize: fs(18) }]}>{fmtTime(x.time, lang)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.op, { fontSize: fs(15) }]}>{x.op}</Text>
                  <Text style={[styles.meta, { fontSize: fs(13) }]}>
                    {x.type ? t(x.type) : ''}
                    {x.fare ? `  ·  ${fmtRs(x.fare)}` : ''}
                    {x.arr ? `  ·  ${t('arrives')} ${fmtTime(x.arr, lang)}` : ''}
                    {x.old ? `  ·  ⚠️ ${t('oldInfo')}` : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        <BigButton label={t('bookOnline') + ' — BusSeat.lk'} color={C.gold} textColor={C.night} onPress={() => openUrl('https://busseat.lk')} style={{ marginTop: 4 }} />
        <BigButton label={t('callSltb')} color={C.green} onPress={() => callNumber('1315')} style={{ marginTop: 10 }} />

        <View style={styles.tips}>
          <Text style={[styles.tipsTitle, { fontSize: fs(18) }]}>{t('tips')}</Text>
          {TIPS.map((tip, i) => (
            <Text key={i} style={[styles.tip, { fontSize: fs(15) }]}>• {tr(tip)}</Text>
          ))}
        </View>
        <Text style={[styles.disclaimer, { fontSize: fs(13) }]}>{t('disclaimer')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filter: {
    flex: 1,
    borderWidth: 2,
    borderColor: C.nightMuted,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterActive: { backgroundColor: C.gold, borderColor: C.gold },
  filterText: { color: C.nightText, fontWeight: '800' },
  group: { backgroundColor: C.nightCard, borderRadius: 18, padding: 14, marginBottom: 14 },
  groupTitle: { color: C.nightText, fontWeight: '900' },
  groupMeta: { color: C.gold, marginTop: 4, marginBottom: 8, fontWeight: '700' },
  dep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  time: { color: C.gold, fontWeight: '900', minWidth: 100 },
  op: { color: C.nightText, fontWeight: '700' },
  meta: { color: C.nightMuted, marginTop: 2 },
  tips: { backgroundColor: C.nightCard, borderRadius: 18, padding: 14, marginTop: 16 },
  tipsTitle: { color: C.gold, fontWeight: '900', marginBottom: 8 },
  tip: { color: C.nightText, marginBottom: 6, lineHeight: 22 },
  disclaimer: { color: C.nightMuted, marginTop: 14, textAlign: 'center', lineHeight: 19 },
});
