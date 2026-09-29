import { ROUTES } from '../data/routes';

// "HH:MM" → විනාඩි. රෑ 12 න් පසු (00:00–04:59) ඊළඟ දවසට ගණන් කරනවා,
// ඒ නිසා රාත්‍රී ලැයිස්තුව හරි පිළිවෙළට එනවා.
export function nightSortKey(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return (h < 5 ? h + 24 : h) * 60 + m;
}

export function isNight(hhmm) {
  const h = Number(hhmm.split(':')[0]);
  return h >= 18 || h < 5;
}

// සරල වේලාව: සිංහලෙන් "රෑ 9:30", "උදේ 6:00"
export function fmtTime(hhmm, lang) {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, '0');
  if (lang === 'en') return `${h12}:${mm} ${h < 12 ? 'AM' : 'PM'}`;
  let part;
  if (h >= 18 || h < 4) part = lang === 'ta' ? 'இரவு' : 'රෑ';
  else if (h < 12) part = lang === 'ta' ? 'காலை' : 'උදේ';
  else if (h < 16) part = lang === 'ta' ? 'மதியம்' : 'දවල්';
  else part = lang === 'ta' ? 'மாலை' : 'හවස';
  return `${part} ${h12}:${mm}`;
}

export function fmtRs(n) {
  if (n == null) return '—';
  return 'Rs. ' + n.toLocaleString('en-US');
}

// from → to යන බස් මාර්ග හොයනවා (දෙපැත්තටම)
export function findRoutes(from, to) {
  if (!from || !to || from === to) return [];
  const out = [];
  for (const route of ROUTES) {
    const i = route.stops.indexOf(from);
    const j = route.stops.indexOf(to);
    if (i === -1 || j === -1) continue;
    const reverse = i > j;
    const last = route.stops.length - 1;
    const full = (i === 0 && j === last) || (j === 0 && i === last);
    // ආරම්භක නැවතුමෙන්ම නගිනවද? (එහෙනම් වේලාවන් හරියටම ගැළපෙනවා)
    const fromTerminal = reverse ? i === last : i === 0;
    out.push({ route, reverse, full, fromTerminal, i, j });
  }
  // සම්පූර්ණ මාර්ග මුලින්, ඊට පස්සේ වේලාවන් තියෙන ඒවා
  out.sort((a, b) => {
    if (a.full !== b.full) return a.full ? -1 : 1;
    const ad = a.route.departures ? 1 : 0;
    const bd = b.route.departures ? 1 : 0;
    return bd - ad;
  });
  return out;
}

// කෙලින් බස් නැත්නම් — මාරු වෙන්න පුළුවන් නගර (hub)
const HUBS = ['colombo', 'kandy', 'anuradhapura', 'vavuniya', 'kurunegala', 'matara', 'dambulla', 'galle', 'ratnapura'];

export function findTransfers(from, to) {
  const res = [];
  for (const hub of HUBS) {
    if (hub === from || hub === to) continue;
    const leg1 = findRoutes(from, hub);
    const leg2 = findRoutes(hub, to);
    if (leg1.length && leg2.length) {
      res.push({ hub, leg1: leg1[0].route, leg2: leg2[0].route });
    }
    if (res.length >= 3) break;
  }
  return res;
}

// දිශාව අනුව පිටත්වීම් (departures for the chosen direction)
export function departuresFor(route, reverse) {
  const dir = reverse ? 'rev' : 'fwd';
  return (route.departures || [])
    .filter((x) => x.dir === dir)
    .sort((a, b) => nightSortKey(a.time) - nightSortKey(b.time));
}

// රාත්‍රී බස් ඔක්කොම — ගමන අනුව කණ්ඩායම් කරලා
export function allNightTrips() {
  const groups = [];
  for (const route of ROUTES) {
    for (const dir of ['fwd', 'rev']) {
      const deps = (route.departures || []).filter((x) => x.dir === dir && isNight(x.time));
      if (!deps.length) continue;
      const stops = dir === 'fwd' ? route.stops : [...route.stops].reverse();
      groups.push({
        key: route.id + dir,
        route,
        reverse: dir === 'rev',
        from: stops[0],
        to: stops[stops.length - 1],
        deps: deps.sort((a, b) => nightSortKey(a.time) - nightSortKey(b.time)),
      });
    }
  }
  groups.sort((a, b) => nightSortKey(a.deps[0].time) - nightSortKey(b.deps[0].time));
  return groups;
}

// ඔරලෝසුවට වඩා ඊළඟට පිටත්වන බස් එක (next bus from now)
export function nextDeparture(deps, now = new Date()) {
  if (!deps.length) return null;
  const mins = now.getHours() * 60 + now.getMinutes();
  const sorted = [...deps].sort((a, b) => {
    const [ah, am] = a.time.split(':').map(Number);
    const [bh, bm] = b.time.split(':').map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });
  return (
    sorted.find((x) => {
      const [h, m] = x.time.split(':').map(Number);
      return h * 60 + m >= mins;
    }) || sorted[0]
  );
}
