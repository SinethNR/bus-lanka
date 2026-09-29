// ==========================================================
// දුර ගමන් බස් මාර්ග දත්ත (Long-distance bus route data)
// ----------------------------------------------------------
// ගාස්තු (fares): NTC Inter-Provincial full-route fares,
//   effective 6 July 2026 (00:01). Rs. වලින්.
// වේලාවන් (departures): BusSeat.lk / SLTB / Uva tourism
//   listings seen in Sept 2026 — මේවා වෙනස් විය හැක.
// stops[0] → stops[last] = "fwd" දිශාව. ආපසු = "rev".
// km / hours = ආසන්න අගයන් (approximate).
// ==========================================================

// d(වේලාව 24h, operator, වර්ගය, ගාස්තුව, දිශාව, අමතර)
const d = (time, op, type, fare, dir = 'fwd', extra = {}) => ({ time, op, type, fare, dir, ...extra });

// බස් නගින තැන් (boarding point groups). at = ඒ තැන් තියෙන නගරය
export const BOARDING = {
  colomboMain: {
    at: 'colombo',
    points: [
      { si: 'මධ්‍යම බස් නැවතුම, පිටකොටුව (SLTB) — පැය 24 විවෘතයි, කොටුව දුම්රිය ස්ථානය ළඟ', en: 'Central Bus Stand, Pettah (SLTB) — open 24 hrs, next to Fort railway station' },
      { si: 'බස්තියන් මාවත බස් නැවතුම (පෞද්ගලික දුර ගමන්)', en: 'Bastian Mawatha bus stand (private long-distance)' },
    ],
  },
  colomboNorth: {
    at: 'colombo',
    points: [
      { si: 'වැල්ලවත්ත — මැරීන් ඩ්‍රයිව් (රාමක්‍රිෂ්ණ මිෂන් ළඟ)', en: 'Wellawatte — Marine Drive (near Ramakrishna Mission)' },
      { si: 'කොටහේන', en: 'Kotahena' },
      { si: 'මධ්‍යම බස් නැවතුම, පිටකොටුව (SLTB)', en: 'Central Bus Stand, Pettah (SLTB)' },
      { si: 'මොරටුව / රත්මලාන SLTB ඩිපෝව', en: 'Moratuwa / Ratmalana SLTB depot' },
    ],
  },
  jaffna: {
    at: 'jaffna',
    points: [
      { si: 'යාපනය නව බස් නැවතුම — මුනීශ්වරන් කෝවිල් පාර', en: 'Jaffna New Bus Stand — Muneeswaran Temple Road' },
    ],
  },
  makumbura: {
    at: 'colombo',
    points: [
      { si: 'මාකුඹුර බහුවිධ ප්‍රවාහන මධ්‍යස්ථානය, කොට්ටාව (දක්ෂිණ හයිවේ බස්)', en: 'Makumbura Multimodal Centre, Kottawa (Southern Expressway buses)' },
    ],
  },
  maradana: {
    at: 'colombo',
    points: [
      { si: 'මරදාන — ආනන්ද විද්‍යාලය ළඟ', en: 'Maradana — near Ananda College' },
    ],
  },
};

export const ROUTES = [
  // ---------------- උතුර (North) ----------------
  {
    id: '87', no: '87',
    stops: ['colombo', 'negombo', 'puttalam', 'anuradhapura', 'vavuniya', 'kilinochchi', 'jaffna'],
    km: 400, hours: '8–9',
    fares: { normal: 1701, semi: 2552, luxury: 3256 },
    boarding: ['colomboNorth', 'jaffna'],
    departures: [
      // කොළඹ → යාපනය (රාත්‍රී)
      d('18:45', 'North West', 'semi', 2100),
      d('19:15', 'Laksmi Express', 'semi', 2100),
      d('19:45', 'KTT Travels', 'semi', 1701),
      d('20:00', 'Sri Murugan (N1)', 'super', 2600),
      d('20:00', 'Venkadeswara Express', 'super', 3000),
      d('20:30', 'Annai Muththumari Express', 'super', 3000),
      d('21:00', 'Venkadeswara Express', 'super', 3000),
      d('21:00', 'RS Express', 'super', 3000),
      d('21:00', 'Sri Murugan (N2)', 'super', 2700),
      d('21:00', 'Rathna Travels (PK)', 'super', 3000),
      d('21:30', 'Sayanthan Travels', 'super', 2800),
      d('21:45', 'JGP Travels (N1)', 'super', 2800),
      d('22:00', 'Rathna Travels (PK2)', 'super', 3000),
      d('22:00', 'JGP Travels', 'super', 2800),
      d('22:00', 'Sri Murugan (N8)', 'super', 2700),
      // යාපනය → කොළඹ
      d('06:00', 'Rathna Travels', 'super', 3300, 'rev'),
      d('09:00', 'Rathna Travels', 'super', 3300, 'rev'),
      d('10:30', 'Thana Travels', 'luxury', 3300, 'rev'),
      d('18:30', 'Laksmi Express', 'semi', 2100, 'rev'),
      d('18:30', 'North West', 'semi', 2100, 'rev'),
      d('19:00', 'RS Express', 'super', 3000, 'rev'),
      d('19:15', 'Annai Muththumari Express', 'super', 3000, 'rev'),
      d('19:30', 'KTT Travels', 'semi', 1701, 'rev'),
      d('20:00', 'Venkadeswara Express', 'super', 3000, 'rev'),
      d('21:00', 'Rathna Travels (PK)', 'super', 3000, 'rev'),
      d('21:30', 'Sayanthan Travels', 'super', 2800, 'rev'),
      d('21:45', 'JGP Travels (N1)', 'super', 2800, 'rev'),
      d('22:00', 'JGP Travels', 'super', 2800, 'rev'),
    ],
  },
  {
    id: '87-6-1', no: '87-6-1',
    stops: ['colombo', 'anuradhapura', 'vavuniya', 'kilinochchi'],
    km: 330, hours: '7–8',
    fares: { normal: 1407, semi: 2111 },
    boarding: ['colomboNorth'],
  },
  {
    id: '82', no: '82',
    stops: ['colombo', 'anuradhapura', 'vavuniya', 'mullaitivu'],
    km: 370, hours: '8–9',
    fares: { normal: 1492, semi: 2238, luxury: 2853 },
    boarding: ['colomboNorth'],
  },
  {
    id: '15-7', no: '15-7',
    stops: ['colombo', 'kurunegala', 'dambulla', 'anuradhapura', 'medawachchiya', 'vavuniya'],
    km: 255, hours: '6–6.5',
    fares: { normal: 1117, semi: 1676, luxury: 2131 },
    boarding: ['colomboMain'],
  },
  {
    id: '4', no: '4',
    stops: ['colombo', 'negombo', 'puttalam', 'anuradhapura', 'medawachchiya', 'mannar'],
    km: 300, hours: '6.5–7',
    fares: { normal: 1325, semi: 1988, luxury: 2545 },
    boarding: ['colomboMain'],
    departures: [
      d('08:20', 'Trust Lanka Tours', 'luxury', 2660),
      d('14:30', 'AKR Express', 'luxury', 2660),
    ],
  },
  {
    id: '4-1', no: '4-1',
    stops: ['colombo', 'puttalam', 'anuradhapura', 'mannar', 'talaimannar'],
    km: 330, hours: '7.5–8',
    fares: { normal: 1458, semi: 2187, luxury: 2789 },
    boarding: ['colomboMain'],
  },
  {
    id: '4-3', no: '4-3',
    stops: ['colombo', 'negombo', 'chilaw', 'puttalam', 'anuradhapura'],
    km: 205, hours: '5–5.5',
    fares: { normal: 861, semi: 1292, luxury: 1651 },
    exp: { fare: 1810, code: 'EX02 / EX03 / 04-03', hours: '4', via: 'central' },
    boarding: ['colomboMain'],
  },
  // ---------------- නැගෙනහිර (East) ----------------
  {
    id: '49', no: '49',
    stops: ['colombo', 'kurunegala', 'dambulla', 'habarana', 'trincomalee'],
    km: 260, hours: '6.5–7',
    fares: { normal: 1125, semi: 1688, luxury: 2147 },
    boarding: ['colomboMain'],
    departures: [
      d('22:25', 'Global Travels', 'super', 2200, 'fwd', { arr: '04:55' }),
    ],
  },
  {
    id: '48-1', no: '48 / 48-1',
    stops: ['colombo', 'kurunegala', 'dambulla', 'habarana', 'polonnaruwa', 'batticaloa'],
    km: 315, hours: '8',
    fares: { normal: 1341, semi: 2012, luxury: 2575 },
    boarding: ['colomboMain'],
    departures: [
      d('19:00', 'Raisoon Travels', 'super', 3100, 'fwd', { arr: '03:00' }),
    ],
  },
  {
    id: '22-8', no: '22-8',
    stops: ['colombo', 'kandy', 'mahiyanganaya', 'ampara'],
    km: 340, hours: '8–9',
    fares: { normal: 1407, semi: 2111, luxury: 2695 },
    boarding: ['colomboMain'],
  },
  {
    id: '22-7', no: '22-7',
    stops: ['colombo', 'kandy', 'mahiyanganaya', 'ampara', 'kalmunai'],
    km: 360, hours: '9',
    fares: { normal: 1525, luxury: 2913 },
    boarding: ['colomboMain'],
  },
  {
    id: '48-12', no: '48-12',
    stops: ['colombo', 'batticaloa', 'kalmunai', 'akkaraipattu'],
    km: 370, hours: '9',
    fares: { normal: 1597, semi: 2396, luxury: 3048 },
    exp: { fare: 3330, code: 'EX 1-78 / 35 / 881', via: 'south' },
    boarding: ['colomboMain'],
  },
  {
    id: 'pottuvil', no: 'Luxury',
    stops: ['colombo', 'akkaraipattu', 'pottuvil'],
    km: 360, hours: '8–9',
    fares: null,
    boarding: ['maradana'],
    old: true,
    departures: [
      d('19:30', 'Luxury AC (Maradana)', 'luxury', null, 'fwd', { old: true }),
      d('20:30', 'Luxury AC (Pottuvil town)', 'luxury', null, 'rev', { old: true, arr: '04:15' }),
    ],
  },
  // ---------------- මධ්‍යම / කඳුකරය (Hill country) ----------------
  {
    id: '1', no: '1',
    stops: ['colombo', 'kadawatha', 'kegalle', 'mawanella', 'kandy'],
    km: 115, hours: '3.5–4',
    fares: { normal: 521, luxury: 1018 },
    exp: { fare: 1210, code: 'EX02 / EX04 / 602', hours: '2.5–3', via: 'central' },
    boarding: ['colomboMain'],
  },
  {
    id: '8', no: '8',
    stops: ['colombo', 'kurunegala', 'matale'],
    km: 140, hours: '4',
    fares: { normal: 632, luxury: 1226 },
    exp: { fare: 1350, code: 'EX02 / EX04 / 602-1', via: 'central' },
    boarding: ['colomboMain'],
  },
  {
    id: '79', no: '79',
    stops: ['colombo', 'avissawella', 'hatton', 'nuwaraeliya'],
    km: 170, hours: '5.5–6',
    fares: { normal: 844, semi: 1266, luxury: 1619 },
    boarding: ['colomboMain'],
  },
  {
    id: '79-1', no: '79-1',
    stops: ['colombo', 'avissawella', 'hatton', 'nuwaraeliya', 'welimada'],
    km: 200, hours: '6.5–7',
    fares: { normal: 980, semi: 1470, luxury: 1875 },
    boarding: ['colomboMain'],
  },
  {
    id: '16-2', no: '16-2',
    stops: ['colombo', 'avissawella', 'hatton'],
    km: 140, hours: '4.5',
    fares: { normal: 793, luxury: 1523 },
    boarding: ['colomboMain'],
  },
  {
    id: '16', no: '16',
    stops: ['colombo', 'kegalle', 'nawalapitiya'],
    km: 130, hours: '4',
    fares: { normal: 632 },
    boarding: ['colomboMain'],
  },
  {
    id: '38-1', no: '38-1',
    stops: ['colombo', 'kandy', 'mahiyanganaya'],
    km: 190, hours: '6',
    fares: { normal: 913, semi: 1370, luxury: 1747 },
    boarding: ['colomboMain'],
  },
  {
    id: '21-6', no: '21-6',
    stops: ['colombo', 'kandy', 'badulla'],
    km: 250, hours: '7–8',
    fares: { normal: 1100, semi: 1650 },
    boarding: ['colomboMain'],
  },
  {
    id: '99', no: '99',
    stops: ['colombo', 'avissawella', 'ratnapura', 'balangoda', 'bandarawela', 'badulla'],
    km: 230, hours: '7–8',
    fares: null,
    boarding: ['colomboMain'],
  },
  {
    id: 'ex-badulla', no: 'EX 1-74',
    stops: ['colombo', 'wellawaya', 'ella', 'badulla'],
    km: 290, hours: '5.5–6',
    fares: null,
    exp: { fare: 2700, code: 'EX 1-74 / 31-2', via: 'south' },
    boarding: ['makumbura'],
    departures: [
      d('07:30', 'Makumbura', 'exp', 2700),
      d('10:30', 'Makumbura', 'exp', 2700),
      d('14:30', 'Makumbura', 'exp', 2700),
      d('15:30', 'Makumbura', 'exp', 2700),
      d('17:30', 'Makumbura', 'exp', 2700),
      d('18:30', 'Makumbura', 'exp', 2700),
    ],
  },
  // ---------------- දකුණ (South) ----------------
  {
    id: '2-1', no: '2-1',
    stops: ['colombo', 'panadura', 'kalutara', 'galle'],
    km: 120, hours: '3–3.5',
    fares: { normal: 496, luxury: 970 },
    exp: { fare: 930, code: 'EX 1-1', hours: '1.5', via: 'south' },
    boarding: ['colomboMain', 'makumbura'],
  },
  {
    id: '2', no: '2',
    stops: ['colombo', 'panadura', 'kalutara', 'galle', 'matara'],
    km: 160, hours: '4–4.5',
    fares: { normal: 681, semi: 1022, luxury: 1320 },
    exp: { fare: 1170, code: 'EX 1-1 / EX01-001', hours: '2', via: 'south' },
    boarding: ['colomboMain', 'makumbura'],
  },
  {
    id: '3', no: '3',
    stops: ['colombo', 'galle', 'matara', 'tangalle', 'hambantota', 'kataragama'],
    km: 280, hours: '7',
    fares: { normal: 1165, semi: 1748 },
    boarding: ['colomboMain'],
  },
  {
    id: 'ex-kataragama', no: 'EX 1-12/32',
    stops: ['colombo', 'hambantota', 'kataragama'],
    km: 255, hours: '3.5–4',
    fares: null,
    exp: { fare: null, code: 'EX 1-12 / 32', hours: '3.5', via: 'south' },
    boarding: ['makumbura'],
  },
  {
    id: '3-4', no: '3-4',
    stops: ['colombo', 'galle', 'matara', 'tangalle', 'hambantota'],
    km: 240, hours: '6',
    fares: { normal: 955 },
    boarding: ['colomboMain'],
  },
  {
    id: '3-1', no: '3-1',
    stops: ['colombo', 'embilipitiya'],
    km: 180, hours: '5',
    fares: { normal: 724, semi: 1086 },
    exp: { fare: 1850, code: 'EX 1-9 / 211', via: 'south' },
    boarding: ['colomboMain'],
  },
  {
    id: '98-2', no: '98-2',
    stops: ['colombo', 'ratnapura', 'balangoda', 'wellawaya', 'monaragala'],
    km: 260, hours: '7',
    fares: { normal: 1157, luxury: 2211 },
    exp: { fare: 2670, code: 'EX 1-52 / 35-2', via: 'south' },
    boarding: ['colomboMain'],
    departures: [
      d('00:55', 'Private (Liyanage / HHP / Dilanka)', null, null, 'fwd', { old: true }),
      d('01:00', 'Private (Liyanage / HHP / Dilanka)', null, null, 'fwd', { old: true }),
      d('02:00', 'Private (Liyanage / HHP / Dilanka)', null, null, 'fwd', { old: true }),
    ],
  },
  // ---------------- බටහිර / වයඹ (West & North-West) ----------------
  {
    id: '5', no: '5',
    stops: ['colombo', 'kadawatha', 'kurunegala'],
    km: 95, hours: '2.5–3',
    fares: { normal: 413 },
    boarding: ['colomboMain'],
  },
  {
    id: '92-4', no: '92-4',
    stops: ['colombo', 'kuliyapitiya'],
    km: 90, hours: '2.5',
    fares: { normal: 376, luxury: 737 },
    boarding: ['colomboMain'],
  },
  {
    id: '122', no: '122',
    stops: ['colombo', 'avissawella', 'ratnapura'],
    km: 100, hours: '3',
    fares: { normal: 453, luxury: 890 },
    boarding: ['colomboMain'],
  },
  {
    id: '4-11', no: '4-11',
    stops: ['colombo', 'negombo', 'chilaw'],
    km: 80, hours: '2',
    fares: { normal: 346, luxury: 677 },
    boarding: ['colomboMain'],
  },
  {
    id: '4-7', no: '4-7',
    stops: ['colombo', 'negombo', 'chilaw', 'puttalam'],
    km: 130, hours: '3.5',
    fares: { normal: 555, luxury: 1082 },
    boarding: ['colomboMain'],
  },
  // ---------------- කොළඹ නොවන (Not via Colombo) ----------------
  {
    id: '43-87', no: '43/87',
    stops: ['kandy', 'matale', 'dambulla', 'anuradhapura', 'vavuniya', 'kilinochchi', 'jaffna'],
    km: 320, hours: '8',
    fares: { normal: 1399, semi: 2099 },
  },
  {
    id: '42-2', no: '42-2',
    stops: ['kandy', 'matale', 'dambulla', 'anuradhapura'],
    km: 140, hours: '3.5–4',
    fares: { normal: 640, luxury: 1242 },
  },
  {
    id: '45', no: '45',
    stops: ['kandy', 'matale', 'dambulla', 'habarana', 'trincomalee'],
    km: 190, hours: '5',
    fares: { normal: 775 },
  },
  {
    id: '21', no: '21',
    stops: ['kandy', 'badulla'],
    km: 140, hours: '4.5',
    fares: { normal: 590, semi: 885 },
  },
  {
    id: '69', no: '69',
    stops: ['kandy', 'ratnapura'],
    km: 150, hours: '5',
    fares: { normal: 590 },
  },
  {
    id: '602', no: '602',
    stops: ['kandy', 'kurunegala'],
    km: 42, hours: '1–1.5',
    fares: { normal: 223, luxury: 437 },
  },
  {
    id: '1-245', no: '1/245',
    stops: ['negombo', 'kadawatha', 'kandy'],
    km: 130, hours: '3.5',
    fares: { normal: 513, luxury: 1002 },
  },
  {
    id: '17', no: '17',
    stops: ['panadura', 'kandy'],
    km: 140, hours: '4',
    fares: { normal: 640, semi: 960, luxury: 1242 },
  },
  {
    id: '2-4-3', no: '2/4-3',
    stops: ['matara', 'galle', 'anuradhapura'],
    km: 360, hours: '9',
    fares: { normal: 1517, semi: 2276 },
  },
  {
    id: '333', no: '333',
    stops: ['matara', 'tangalle', 'hambantota', 'kataragama'],
    km: 125, hours: '3',
    fares: { normal: 598 },
  },
  {
    id: '32-7', no: '32-7',
    stops: ['galle', 'matara', 'tangalle', 'hambantota', 'kataragama'],
    km: 170, hours: '4.5',
    fares: { normal: 767 },
  },
  {
    id: '31-2', no: '31-2',
    stops: ['matara', 'badulla'],
    km: 200, hours: '6',
    fares: { normal: 989 },
  },
  {
    id: '11', no: '11',
    stops: ['matara', 'ratnapura'],
    km: 150, hours: '5',
    fares: { normal: 750 },
  },
  {
    id: '15-17', no: '15-17',
    stops: ['kurunegala', 'dambulla', 'anuradhapura'],
    km: 115, hours: '3',
    fares: { normal: 590 },
  },
  {
    id: '87-3', no: '87-3',
    stops: ['vavuniya', 'kilinochchi', 'jaffna'],
    km: 145, hours: '3.5',
    fares: { normal: 656 },
  },
  {
    id: '88', no: '88',
    stops: ['trincomalee', 'vavuniya', 'jaffna'],
    km: 240, hours: '6.5',
    fares: { normal: 1092, semi: 1638, luxury: 2083 },
  },
  {
    id: '835', no: '835',
    stops: ['anuradhapura', 'trincomalee'],
    km: 106, hours: '3',
    fares: { normal: 496 },
  },
];

export const ROUTE_BY_ID = Object.fromEntries(ROUTES.map((r) => [r.id, r]));
