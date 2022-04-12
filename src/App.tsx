import { HopeProvider, HopeThemeConfig, Spinner } from "@hope-ui/solid";
import { signInAnonymously } from "firebase/auth";
import { Route, Router, Routes } from "solid-app-router";
import { FirebaseProvider, useAuth } from "solid-firebase";
import { Component, Match, onMount, Switch } from "solid-js";
import { firebaseAuth, firebaseConfig } from "./api/firebase";
import AuthView from "./components/organisms/AuthView";
import CreateScreen from "./screens/CreateScreen";
import WatchScreen from "./screens/WatchScreen";

const config: HopeThemeConfig = {
  initialColorMode: "dark",
  darkTheme: {
    colors: {},
  },
};

const App: Component = () => {
  return (
    <Router>
      <HopeProvider config={config}>
        <FirebaseProvider config={firebaseConfig}>
          <AppLoading />
        </FirebaseProvider>
      </HopeProvider>
    </Router>
  );
};

const AppLoading = () => {
  const state = useAuth(firebaseAuth);

  onMount(() => {
    signInAnonymously(firebaseAuth);
  });

  return (
    <Switch>
      <Match when={state.loading}>
        <Spinner />
      </Match>
      <Match when={!state.data}>
        <AuthView />
      </Match>
      <Match when={state.data}>
        <AppRoutes />
      </Match>
    </Switch>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthView redirectUrl="/create" />} />
      <Route path="/create" element={<CreateScreen />} />
      <Route path="/party">
        <Route path="/:id" element={<WatchScreen />} />
      </Route>
    </Routes>
  );
};

export default App;
