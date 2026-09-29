// භාෂා 3 ම: සිංහල (si), English (en), தமிழ் (ta)
export const LANGS = ['si', 'en', 'ta'];
export const LANG_LABELS = { si: 'සිංහල', en: 'English', ta: 'தமிழ்' };

const S = {
  appTitle: { si: 'දුර ගමන් බස්', en: 'Long Distance Bus', ta: 'நீண்ட தூர பேருந்து' },
  appSub: {
    si: 'ශ්‍රී ලංකාව පුරා බස් තොරතුරු — ඉන්ටර්නෙට් නැතුවත් වැඩ',
    en: 'Bus info across Sri Lanka — works offline',
    ta: 'இலங்கை முழுவதும் பேருந்து தகவல் — இணையம் இல்லாமலும்',
  },
  from: { si: 'කොහෙ ඉඳන්ද?', en: 'From where?', ta: 'எங்கிருந்து?' },
  to: { si: 'කොහෙටද?', en: 'Where to?', ta: 'எங்கே?' },
  tapToChoose: { si: 'මෙතන ඔබන්න', en: 'Tap here', ta: 'இங்கே தட்டவும்' },
  swap: { si: '⇅ මාරු කරන්න', en: '⇅ Swap', ta: '⇅ மாற்று' },
  search: { si: '🔍  බස් හොයන්න', en: '🔍  Find buses', ta: '🔍  பேருந்து தேடு' },
  pickBoth: {
    si: 'මුලින් "කොහෙ ඉඳන්ද" සහ "කොහෙටද" තෝරන්න',
    en: 'Please choose both "From" and "To"',
    ta: '"எங்கிருந்து" மற்றும் "எங்கே" இரண்டையும் தேர்வு செய்யவும்',
  },
  sameCity: { si: 'නගර දෙක එකම වෙන්න බෑ', en: 'Both towns are the same', ta: 'இரண்டும் ஒரே நகரம்' },
  night: { si: 'රාත්‍රී බස්', en: 'Night buses', ta: 'இரவு பேருந்து' },
  expressway: { si: 'හයිවේ බස්', en: 'Expressway', ta: 'அதிவேக பாதை' },
  help: { si: 'උදව් අංක', en: 'Help numbers', ta: 'உதவி எண்கள்' },
  popular: { si: 'කොළඹ සිට — එක පාරක් ඔබන්න', en: 'From Colombo — one tap', ta: 'கொழும்பிலிருந்து — ஒரு தட்டு' },
  back: { si: '‹ ආපසු', en: '‹ Back', ta: '‹ பின்' },
  route: { si: 'අංකය', en: 'Route', ta: 'வழி' },
  via: { si: 'හරහා', en: 'Via', ta: 'வழியாக' },
  km: { si: 'කි.මී.', en: 'km', ta: 'கி.மீ.' },
  hours: { si: 'පැය', en: 'hrs', ta: 'மணி' },
  fares: { si: 'ගාස්තු', en: 'Fares', ta: 'கட்டணம்' },
  normal: { si: 'සාමාන්‍ය', en: 'Normal', ta: 'சாதாரண' },
  semi: { si: 'අර්ධ සුඛෝපභෝගී', en: 'Semi luxury', ta: 'அரை சொகுசு' },
  luxury: { si: 'සුඛෝපභෝගී AC', en: 'Luxury AC', ta: 'சொகுசு AC' },
  super: { si: 'සුපර් ලක්සරි', en: 'Super luxury', ta: 'சூப்பர் சொகுசு' },
  exp: { si: 'හයිවේ (AC)', en: 'Expressway (AC)', ta: 'அதிவேக (AC)' },
  noFare: {
    si: 'ගාස්තුව: 1955 අමතා හෝ කොන්දොස්තරගෙන් අහන්න',
    en: 'Fare: ask the conductor or call 1955',
    ta: 'கட்டணம்: நடத்துநரிடம் கேளுங்கள் அல்லது 1955',
  },
  partialFare: {
    si: '* මුළු මාර්ගයේම ගාස්තුව. ඔබේ ගමනට අඩු වෙන්න පුළුවන්.',
    en: '* Full-route fare. Your trip may cost less.',
    ta: '* முழு வழிக் கட்டணம். உங்கள் பயணத்திற்கு குறைவாக இருக்கலாம்.',
  },
  departures: { si: 'පිටත්වන වේලාවන්', en: 'Departure times', ta: 'புறப்படும் நேரங்கள்' },
  arrives: { si: 'ළඟාවේ', en: 'arrives', ta: 'வருகை' },
  timesFrom: { si: 'වේලාවන් ආරම්භක නැවතුමෙන්:', en: 'Times are from the first stop:', ta: 'முதல் நிறுத்தத்திலிருந்து நேரங்கள்:' },
  boarding: { si: '📍 බස් නගින තැන්', en: '📍 Where to board', ta: '📍 ஏறும் இடங்கள்' },
  bookOnline: { si: '🌐 ඔන්ලයින් සීට් බුක්', en: '🌐 Book seat online', ta: '🌐 இணைய முன்பதிவு' },
  callSltb: { si: '📞 SLTB බුකින් 1315', en: '📞 SLTB booking 1315', ta: '📞 SLTB முன்பதிவு 1315' },
  noResults: { si: 'කෙලින්ම යන බස් හමු වුණේ නෑ', en: 'No direct bus found', ta: 'நேரடி பேருந்து இல்லை' },
  transferTitle: { si: 'මාරු වී යන්න පුළුවන්:', en: 'You can change buses at:', ta: 'இங்கே மாறிச் செல்லலாம்:' },
  noResultsTip: {
    si: 'උදව් ඕනෙ නම් NTC 1955 අමතන්න.',
    en: 'Need help? Call NTC 1955.',
    ta: 'உதவிக்கு NTC 1955 அழைக்கவும்.',
  },
  chooseCity: { si: 'නගරය තෝරන්න', en: 'Choose a town', ta: 'நகரத்தைத் தேர்வு செய்க' },
  searchCity: { si: 'නම ටයිප් කරන්න...', en: 'Type a name...', ta: 'பெயரை எழுதவும்...' },
  close: { si: '✕ වසන්න', en: '✕ Close', ta: '✕ மூடு' },
  nightTitle: { si: '🌙 රාත්‍රී බස් (නයිට් එක්ස්ප්‍රස්)', en: '🌙 Night Express Buses', ta: '🌙 இரவு விரைவு பேருந்துகள்' },
  nightSub: {
    si: 'රෑ 6 න් පස්සේ පිටත්වන දුර ගමන් බස්. රෑ ගිහින් උදේට ගමනාන්තයට.',
    en: 'Long-distance buses leaving after 6 PM. Travel overnight, arrive by morning.',
    ta: 'மாலை 6 மணிக்குப் பிறகு புறப்படும் பேருந்துகள். இரவில் பயணம், காலையில் வருகை.',
  },
  fromColombo: { si: 'කොළඹින් යන', en: 'From Colombo', ta: 'கொழும்பிலிருந்து' },
  toColombo: { si: 'කොළඹට එන', en: 'To Colombo', ta: 'கொழும்புக்கு' },
  all: { si: 'ඔක්කොම', en: 'All', ta: 'அனைத்தும்' },
  expTitle: { si: '🛣️ අධිවේගී මාර්ග (හයිවේ) බස්', en: '🛣️ Expressway Buses', ta: '🛣️ அதிவேக பாதை பேருந்துகள்' },
  expSub: {
    si: 'ඉක්මනින් යන්න — AC බස්, හයිවේ එකෙන්. ගාස්තුව ටිකක් වැඩියි.',
    en: 'Faster AC buses using the expressway. A bit more expensive.',
    ta: 'அதிவேக பாதையில் விரைவான AC பேருந்துகள். கட்டணம் சற்று அதிகம்.',
  },
  expSouth: { si: 'දක්ෂිණ අධිවේගී — මාකුඹුර (කොට්ටාව) සිට', en: 'Southern Expressway — from Makumbura (Kottawa)', ta: 'தெற்கு அதிவேக பாதை — மகும்புர (கொட்டாவ)' },
  expCentral: { si: 'මධ්‍යම අධිවේගී — කඩවත හරහා', en: 'Central Expressway — via Kadawatha', ta: 'மத்திய அதிவேக பாதை — கடவத்தை வழியாக' },
  helpTitle: { si: '📞 උදව් අංක සහ තොරතුරු', en: '📞 Help numbers & info', ta: '📞 உதவி எண்கள் & தகவல்' },
  call: { si: 'අමතන්න', en: 'Call', ta: 'அழை' },
  bookingSites: { si: '🌐 ඔන්ලයින් සීට් බුක් කරන තැන්', en: '🌐 Online seat booking', ta: '🌐 இணைய முன்பதிவு தளங்கள்' },
  stands: { si: '🚏 කොළඹ ප්‍රධාන බස් නැවතුම්', en: '🚏 Main bus stands in Colombo', ta: '🚏 கொழும்பு முக்கிய பேருந்து நிலையங்கள்' },
  classes: { si: '🚌 බස් වර්ග', en: '🚌 Bus types', ta: '🚌 பேருந்து வகைகள்' },
  tips: { si: '💡 ගමනට උපදෙස්', en: '💡 Travel tips', ta: '💡 பயண குறிப்புகள்' },
  bigText: { si: 'අකුරු ලොකු කරන්න', en: 'Bigger text', ta: 'பெரிய எழுத்து' },
  smallText: { si: 'අකුරු සාමාන්‍ය', en: 'Normal text', ta: 'சாதாரண எழுத்து' },
  disclaimer: {
    si: 'ගාස්තු: NTC, 2026 ජූලි 6 සිට. බස් වේලාවන් වෙනස් වෙන්න පුළුවන් — යන්න කලින් අමතා තහවුරු කරගන්න.',
    en: 'Fares: NTC, effective 6 July 2026. Bus times can change — call and confirm before you travel.',
    ta: 'கட்டணம்: NTC, 6 ஜூலை 2026 முதல். நேரங்கள் மாறலாம் — பயணத்திற்கு முன் உறுதிப்படுத்துங்கள்.',
  },
  oldInfo: { si: 'පැරණි තොරතුරු — අමතා තහවුරු කරන්න', en: 'Older info — please confirm', ta: 'பழைய தகவல் — உறுதிப்படுத்தவும்' },
  about: { si: 'ℹ️ මේ ඇප් එක ගැන', en: 'ℹ️ About this app', ta: 'ℹ️ இந்த செயலி பற்றி' },
};

export function t(key, lang) {
  const v = S[key];
  if (!v) return key;
  return v[lang] || v.en;
}

// ගමනට උපදෙස් (tips)
export const TIPS = [
  {
    si: 'රාත්‍රී බස් ඉක්මනට පිරෙනවා. දවස් 1–3 කට කලින් සීට් බුක් කරන්න (SLTB — මාසයක් කලින් පුළුවන්).',
    en: 'Night buses fill up fast. Book 1–3 days early (SLTB allows up to a month ahead).',
    ta: 'இரவு பேருந்துகள் விரைவில் நிரம்பும். 1–3 நாட்களுக்கு முன் முன்பதிவு செய்யுங்கள்.',
  },
  {
    si: 'බස් නගින තැනට විනාඩි 20–30 කට කලින් යන්න.',
    en: 'Reach the boarding point 20–30 minutes early.',
    ta: 'ஏறும் இடத்திற்கு 20–30 நிமிடங்கள் முன்பே செல்லுங்கள்.',
  },
  {
    si: 'හැඳුනුම්පත සහ බුකින් SMS එක ළඟ තියාගන්න.',
    en: 'Keep your ID card and the booking SMS with you.',
    ta: 'அடையாள அட்டை மற்றும் முன்பதிவு SMS உடன் வைத்திருங்கள்.',
  },
  {
    si: 'රෑ AC බස් සීතලයි, සද්දෙත් වැඩියි — ශෝල් එකක් සහ කන් ප්ලග් ගෙනියන්න.',
    en: 'Night AC buses are cold and can be loud — bring a shawl and earplugs.',
    ta: 'இரவு AC பேருந்துகள் குளிராகவும் சத்தமாகவும் இருக்கலாம் — சால்வை, காது அடைப்பான் எடுத்துச் செல்லுங்கள்.',
  },
  {
    si: 'වැඩිපුර ගාස්තු ගත්තොත් හෝ ප්‍රශ්නයක් වුණොත් NTC 1955 අමතන්න.',
    en: 'If you are overcharged or have a problem, call NTC 1955.',
    ta: 'அதிக கட்டணம் வசூலித்தால் அல்லது பிரச்சினை இருந்தால் NTC 1955 அழைக்கவும்.',
  },
];

// බස් වර්ග විස්තර
export const CLASS_INFO = [
  { key: 'normal', si: 'සාමාන්‍ය බස් — අඩුම ගාස්තුව, AC නෑ, හැම නගරෙකම නවතිනවා.', en: 'Normal — cheapest, no AC, stops often.', ta: 'சாதாரண — குறைந்த கட்டணம், AC இல்லை, அடிக்கடி நிற்கும்.' },
  { key: 'semi', si: 'අර්ධ සුඛෝපභෝගී — හොඳ සීට්, නැවතුම් අඩුයි.', en: 'Semi luxury — better seats, fewer stops.', ta: 'அரை சொகுசு — நல்ல இருக்கைகள், குறைந்த நிறுத்தங்கள்.' },
  { key: 'luxury', si: 'සුඛෝපභෝගී AC — AC, පහසු සීට්, ඉක්මන්.', en: 'Luxury AC — air-conditioned, comfortable, faster.', ta: 'சொகுசு AC — குளிரூட்டப்பட்டது, வசதியானது.' },
  { key: 'super', si: 'සුපර් ලක්සරි — පෞද්ගලික රාත්‍රී බස්, පිටිපස්සට හැරෙන සීට්. ඔන්ලයින් බුක් කරන්න.', en: 'Super luxury — private night coaches with reclining seats. Book online.', ta: 'சூப்பர் சொகுசு — சாயும் இருக்கைகளுடன் இரவு பேருந்துகள்.' },
  { key: 'exp', si: 'හයිවේ බස් — අධිවේගී මාර්ගයෙන්, ඉතා ඉක්මන්, AC.', en: 'Expressway — uses the highway, fastest, AC.', ta: 'அதிவேக — நெடுஞ்சாலை வழியாக, மிக விரைவு, AC.' },
];
