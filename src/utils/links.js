import { Linking, Alert } from 'react-native';

// දුරකථන ඇමතුමක් (phone dialer එක open කරනවා)
export function callNumber(number) {
  Linking.openURL(`tel:${number}`).catch(() => Alert.alert('📞', number));
}

// වෙබ් අඩවියක් browser එකේ open කරනවා
export function openUrl(url) {
  Linking.openURL(url).catch(() => Alert.alert('🌐', url));
}
