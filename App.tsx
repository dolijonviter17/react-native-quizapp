/**
 * Doli Jonviter Simbolon
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo, useState } from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import LoginStackScreen from "./src/stack/LoginStackScreen";
import RootStackScreen from "./src/stack/RootStackScreen";
import { store } from "./src/state";
// import { AppContext } from "./src/context/AppContext";
import { AppContext, ThemeContextType } from "./src/context/AppContext";
import DarkTheme from "./src/theme/DarkTheme";
import DefaultTheme from "./src/theme/DefaultTheme";
// import ThemeContext from "./src/context/ThemeContext";

const RouterNavigation = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);

  const appContext = useMemo<ThemeContextType>(() => {
    return {
      loginStatus,
      isDarkTheme,
      setLoginStatus,
      setIsDarkTheme,
    };
  }, [isDarkTheme, setIsDarkTheme, loginStatus, setLoginStatus]);
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={appContext}>
        {loginStatus ? <LoginStackScreen /> : <RootStackScreen />}
      </AppContext.Provider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RouterNavigation />
    </Provider>
  );
};

export default App;
