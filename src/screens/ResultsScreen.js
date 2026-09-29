import React, { useMemo } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITY_BY_ID } from '../data/cities';
import { findRoutes, findTransfers } from '../utils/search';
import { callNumber } from '../utils/links';
import Header from '../components/Header';
import RouteCard from '../components/RouteCard';
import BigButton from '../components/BigButton';
import { C, shadow } from '../theme';

// සෙවුම් ප්‍රතිඵල: from → to යන බස් ඔක්කොම
export default function ResultsScreen({ params, back, go }) {
  const { lang, t, fs } = useApp();
  const { from, to } = params;
  const matches = useMemo(() => findRoutes(from, to), [from, to]);
  const transfers = useMemo(() => (matches.length ? [] : findTransfers(from, to)), [matches, from, to]);
  const title = `${CITY_BY_ID[from]?.[lang]} → ${CITY_BY_ID[to]?.[lang]}`;

  return (
    <View style={{ flex: 1 }}>
      <Header title={title} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {matches.map((m) => (
          <RouteCard key={m.route.id + (m.reverse ? 'r' : 'f')} match={m} />
        ))}

        {!matches.length ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: fs(44), textAlign: 'center' }}>🔎</Text>
            <Text style={[styles.emptyTitle, { fontSize: fs(20) }]}>{t('noResults')}</Text>
            {transfers.length ? (
              <>
                <Text style={[styles.emptyText, { fontSize: fs(16) }]}>{t('transferTitle')}</Text>
                {transfers.map((x) => (
                  <View key={x.hub} style={styles.transfer}>
                    <Text style={[styles.transferText, { fontSize: fs(17) }]}>
                      {CITY_BY_ID[from][lang]} → <Text style={{ color: C.primary }}>{CITY_BY_ID[x.hub][lang]}</Text> → {CITY_BY_ID[to][lang]}
                    </Text>
                    <Text style={[styles.transferMeta, { fontSize: fs(14) }]}>
                      {t('route')} {x.leg1.no}  +  {t('route')} {x.leg2.no}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                      <Pressable onPress={() => go('results', { from, to: x.hub })} style={styles.legBtn}>
                        <Text style={[styles.legText, { fontSize: fs(14) }]}>① {CITY_BY_ID[x.hub][lang]}</Text>
                      </Pressable>
                      <Pressable onPress={() => go('results', { from: x.hub, to })} style={styles.legBtn}>
                        <Text style={[styles.legText, { fontSize: fs(14) }]}>② {CITY_BY_ID[to][lang]}</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </>
            ) : null}
            <Text style={[styles.emptyText, { fontSize: fs(15), marginTop: 12 }]}>{t('noResultsTip')}</Text>
            <BigButton label="📞 1955" color={C.primary} onPress={() => callNumber('1955')} style={{ marginTop: 12 }} />
          </View>
        ) : null}

        <Text style={[styles.disclaimer, { fontSize: fs(13) }]}>{t('disclaimer')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { backgroundColor: C.card, borderRadius: 18, padding: 20, ...shadow },
  emptyTitle: { color: C.text, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  emptyText: { color: C.muted, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  transfer: { borderWidth: 2, borderColor: C.border, borderRadius: 14, padding: 12, marginTop: 10 },
  transferText: { color: C.text, fontWeight: '800' },
  transferMeta: { color: C.muted, marginTop: 4 },
  legBtn: { flex: 1, backgroundColor: C.gold, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  legText: { fontWeight: '800', color: C.text },
  disclaimer: { color: C.muted, marginTop: 8, textAlign: 'center', lineHeight: 19 },
});
