import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import NightScreen from './src/screens/NightScreen';
import ExpresswayScreen from './src/screens/ExpresswayScreen';
import HelpScreen from './src/screens/HelpScreen';
import { C } from './src/theme';

const SCREENS = {
  home: HomeScreen,
  results: ResultsScreen,
  night: NightScreen,
  express: ExpresswayScreen,
  help: HelpScreen,
};

// සරල "stack" navigation එකක් — අමතර library ඕනෙ නෑ.
// go('results', {...}) → අලුත් පිටුවක්, back() → ආපසු.
export default function App() {
  const [stack, setStack] = useState([{ name: 'home', params: {} }]);
  const stackRef = useRef(stack);
  stackRef.current = stack;

  const go = useCallback((name, params = {}) => {
    setStack((s) => [...s, { name, params }]);
  }, []);

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  // Android "ආපසු" (back) බොත්තමට සහය
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stackRef.current.length > 1) {
        back();
        return true;
      }
      return false; // මුල් පිටුවේ නම් ඇප් එකෙන් එළියට
    });
    return () => sub.remove();
  }, [back]);

  const top = stack[stack.length - 1];
  const Screen = SCREENS[top.name] || HomeScreen;
  const dark = top.name === 'night';

  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: dark ? C.night : C.primary }} edges={['top']}>
          <StatusBar style="light" />
          <View style={{ flex: 1, backgroundColor: dark ? C.night : C.bg }}>
            <Screen key={stack.length} params={top.params} go={go} back={back} />
          </View>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}
