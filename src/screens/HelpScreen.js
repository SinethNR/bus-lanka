import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { HELPLINES, BOOKING_SITES, STANDS } from '../data/helplines';
import { CLASS_INFO, TIPS } from '../i18n/strings';
import { callNumber, openUrl } from '../utils/links';
import Header from '../components/Header';
import { C, CLASS_COLORS, shadow } from '../theme';

// 📞 උදව් අංක, බුකින් වෙබ් අඩවි, බස් නැවතුම්, බස් වර්ග, උපදෙස්
export default function HelpScreen({ back }) {
  const { t, tr, fs } = useApp();

  return (
    <View style={{ flex: 1 }}>
      <Header title={t('helpTitle')} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* දුරකථන අංක — ඔබපු ගමන් call වෙනවා */}
        {HELPLINES.map((h) => (
          <Pressable
            key={h.number}
            onPress={() => callNumber(h.number)}
            style={({ pressed }) => [styles.call, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
            accessibilityLabel={`${t('call')} ${h.number}`}
          >
            <Text style={{ fontSize: fs(28) }}>{h.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.number, { fontSize: fs(24) }]}>{h.number}</Text>
              <Text style={[styles.label, { fontSize: fs(15) }]}>{tr(h)}</Text>
            </View>
            <View style={styles.callBtn}>
              <Text style={[styles.callText, { fontSize: fs(15) }]}>📞 {t('call')}</Text>
            </View>
          </Pressable>
        ))}

        <Text style={[styles.h2, { fontSize: fs(19) }]}>{t('bookingSites')}</Text>
        {BOOKING_SITES.map((b) => (
          <Pressable
            key={b.url}
            onPress={() => openUrl(b.url)}
            style={({ pressed }) => [styles.box, pressed && { opacity: 0.7 }]}
            accessibilityRole="link"
          >
            <Text style={[styles.site, { fontSize: fs(19) }]}>{b.label}  ›</Text>
            <Text style={[styles.label, { fontSize: fs(15) }]}>{tr(b)}</Text>
          </Pressable>
        ))}

        <Text style={[styles.h2, { fontSize: fs(19) }]}>{t('stands')}</Text>
        <View style={styles.box}>
          {STANDS.map((s, i) => (
            <Text key={i} style={[styles.line, { fontSize: fs(15) }]}>• {tr(s)}</Text>
          ))}
        </View>

        <Text style={[styles.h2, { fontSize: fs(19) }]}>{t('classes')}</Text>
        <View style={styles.box}>
          {CLASS_INFO.map((c) => (
            <View key={c.key} style={styles.classRow}>
              <View style={[styles.dot, { backgroundColor: CLASS_COLORS[c.key] }]} />
              <Text style={[styles.line, { fontSize: fs(15), flex: 1 }]}>{tr(c)}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.h2, { fontSize: fs(19) }]}>{t('tips')}</Text>
        <View style={styles.box}>
          {TIPS.map((tip, i) => (
            <Text key={i} style={[styles.line, { fontSize: fs(15) }]}>• {tr(tip)}</Text>
          ))}
        </View>

        <Text style={[styles.h2, { fontSize: fs(19) }]}>{t('about')}</Text>
        <View style={styles.box}>
          <Text style={[styles.line, { fontSize: fs(14) }]}>{t('disclaimer')}</Text>
          <Text style={[styles.line, { fontSize: fs(13), color: C.muted }]}>
            Data: NTC (ntc.gov.lk), SLTB eSeat, BusSeat.lk, Uva tourism (visituva.lk) — Sept 2026.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  call: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    ...shadow,
  },
  number: { color: C.primary, fontWeight: '900', letterSpacing: 1 },
  label: { color: C.text, marginTop: 2, lineHeight: 21 },
  callBtn: { backgroundColor: C.green, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12 },
  callText: { color: C.white, fontWeight: '800' },
  h2: { color: C.text, fontWeight: '900', marginTop: 18, marginBottom: 10 },
  box: { backgroundColor: C.card, borderRadius: 16, padding: 14, marginBottom: 10, ...shadow },
  site: { color: C.primary, fontWeight: '900' },
  line: { color: C.text, marginBottom: 6, lineHeight: 22 },
  classRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 6 },
});
