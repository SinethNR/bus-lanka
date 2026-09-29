import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITY_BY_ID } from '../data/cities';
import { BOARDING } from '../data/routes';
import { departuresFor, fmtTime, fmtRs, isNight } from '../utils/search';
import { callNumber, openUrl } from '../utils/links';
import BigButton from './BigButton';
import { C, CLASS_COLORS, shadow } from '../theme';

const FARE_ORDER = ['normal', 'semi', 'luxury'];

// එක් බස් මාර්ගයක සම්පූර්ණ විස්තරය පෙන්වන කාඩ් එක
export default function RouteCard({ match }) {
  const { lang, t, tr, fs } = useApp();
  const { route, reverse, full, fromTerminal } = match;
  const stops = reverse ? [...route.stops].reverse() : route.stops;
  const start = CITY_BY_ID[stops[0]];
  const end = CITY_BY_ID[stops[stops.length - 1]];
  const via = stops.slice(1, -1).map((id) => CITY_BY_ID[id]?.[lang]).filter(Boolean);
  const deps = departuresFor(route, reverse);
  const hasFares = route.fares && Object.keys(route.fares).length > 0;
  // ඔබ නගින නගරයේ තියෙන නැවතුම් විතරක් පෙන්වනවා
  const fromId = route.stops[match.i];
  const seen = new Set();
  const boardingPoints = (route.boarding || [])
    .map((k) => BOARDING[k])
    .filter((g) => g && g.at === fromId)
    .flatMap((g) => g.points)
    .filter((p) => (seen.has(p.en) ? false : seen.add(p.en)));

  return (
    <View style={styles.card}>
      {/* මාර්ග අංකය සහ ගමන */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={[styles.badgeSmall, { fontSize: fs(11) }]}>{t('route')}</Text>
          <Text style={[styles.badgeText, { fontSize: fs(route.no.length > 6 ? 14 : 20) }]}>{route.no}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.trip, { fontSize: fs(20) }]}>
            {start?.[lang]} → {end?.[lang]}
          </Text>
          <Text style={[styles.meta, { fontSize: fs(15) }]}>
            📏 ~{route.km} {t('km')}   ⏱️ ~{route.hours} {t('hours')}
          </Text>
        </View>
      </View>

      {via.length ? (
        <Text style={[styles.via, { fontSize: fs(15) }]}>
          {t('via')}: {via.join(' • ')}
        </Text>
      ) : null}

      {route.old ? <Text style={[styles.warn, { fontSize: fs(14) }]}>⚠️ {t('oldInfo')}</Text> : null}

      {/* ගාස්තු */}
      <Text style={[styles.section, { fontSize: fs(17) }]}>💰 {t('fares')}</Text>
      {hasFares ? (
        FARE_ORDER.filter((k) => route.fares[k]).map((k) => (
          <FareRow key={k} color={CLASS_COLORS[k]} label={t(k)} value={fmtRs(route.fares[k])} fs={fs} />
        ))
      ) : null}
      {route.exp && route.exp.fare ? (
        <FareRow
          color={CLASS_COLORS.exp}
          label={`${t('exp')}${route.exp.hours ? ` · ~${route.exp.hours} ${t('hours')}` : ''}`}
          value={fmtRs(route.exp.fare)}
          fs={fs}
        />
      ) : null}
      {!hasFares && !(route.exp && route.exp.fare) ? (
        <Text style={[styles.note, { fontSize: fs(14) }]}>{t('noFare')}</Text>
      ) : null}
      {!full && (hasFares || route.exp?.fare) ? (
        <Text style={[styles.note, { fontSize: fs(13) }]}>{t('partialFare')}</Text>
      ) : null}

      {/* පිටත්වන වේලාවන් */}
      {deps.length ? (
        <>
          <Text style={[styles.section, { fontSize: fs(17) }]}>🕘 {t('departures')}</Text>
          {!fromTerminal ? (
            <Text style={[styles.note, { fontSize: fs(13) }]}>
              {t('timesFrom')} {start?.[lang]}
            </Text>
          ) : null}
          {deps.map((x, idx) => (
            <View key={idx} style={[styles.dep, isNight(x.time) && styles.depNight]}>
              <Text style={[styles.depTime, { fontSize: fs(18) }, isNight(x.time) && { color: C.nightText }]}>
                {isNight(x.time) ? '🌙 ' : '☀️ '}
                {fmtTime(x.time, lang)}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.depOp, { fontSize: fs(15) }, isNight(x.time) && { color: C.nightText }]}>
                  {x.op}
                  {x.type ? `  ·  ${t(x.type)}` : ''}
                </Text>
                <Text style={[styles.depMeta, { fontSize: fs(14) }, isNight(x.time) && { color: C.nightMuted }]}>
                  {x.fare ? fmtRs(x.fare) : ''}
                  {x.arr ? `   ${t('arrives')} ${fmtTime(x.arr, lang)}` : ''}
                  {x.old ? `   ⚠️ ${t('oldInfo')}` : ''}
                </Text>
              </View>
            </View>
          ))}
        </>
      ) : null}

      {/* නගින තැන් */}
      {boardingPoints.length ? (
        <>
          <Text style={[styles.section, { fontSize: fs(17) }]}>{t('boarding')}</Text>
          {boardingPoints.map((b, idx) => (
            <Text key={idx} style={[styles.board, { fontSize: fs(15) }]}>• {tr(b)}</Text>
          ))}
        </>
      ) : null}

      {/* බුක් කරන්න / අමතන්න */}
      <View style={styles.btnRow}>
        <BigButton small label={t('bookOnline')} color={C.primary} onPress={() => openUrl('https://busseat.lk')} style={{ flex: 1 }} />
      </View>
      <View style={styles.btnRow}>
        <BigButton small label={t('callSltb')} color={C.green} onPress={() => callNumber('1315')} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

function FareRow({ color, label, value, fs }) {
  return (
    <View style={styles.fareRow}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.fareLabel, { fontSize: fs(16) }]}>{label}</Text>
      <Text style={[styles.fareValue, { fontSize: fs(18), color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 18, padding: 16, marginBottom: 16, ...shadow },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    backgroundColor: C.primary,
    borderRadius: 14,
    minWidth: 70,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  badgeSmall: { color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  badgeText: { color: C.white, fontWeight: '900' },
  trip: { color: C.text, fontWeight: '800' },
  meta: { color: C.muted, marginTop: 4 },
  via: { color: C.text, marginTop: 10, lineHeight: 22 },
  warn: { backgroundColor: C.warnBg, color: C.warnText, padding: 8, borderRadius: 8, marginTop: 10 },
  section: { color: C.primary, fontWeight: '800', marginTop: 16, marginBottom: 6 },
  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  fareLabel: { flex: 1, color: C.text },
  fareValue: { fontWeight: '900' },
  note: { color: C.muted, marginTop: 6, fontStyle: 'italic' },
  dep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF4E0',
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
  },
  depNight: { backgroundColor: C.night },
  depTime: { fontWeight: '900', color: C.text, minWidth: 110 },
  depOp: { color: C.text, fontWeight: '700' },
  depMeta: { color: C.muted, marginTop: 2 },
  board: { color: C.text, marginBottom: 4, lineHeight: 22 },
  btnRow: { flexDirection: 'row', marginTop: 10 },
});
