import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import { Route, Router, Routes } from "solid-app-router";
import { FirebaseProvider } from "solid-firebase";
import { Component } from "solid-js";
import { firebaseConfig } from "./api/firebase";
import SignInView from "./components/organisms/SignInView";
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
          <AppRoutes />
        </FirebaseProvider>
      </HopeProvider>
    </Router>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInView />} />
      <Route path="/create" element={<CreateScreen />} />
      <Route path="/channels">
        <Route path="/:id" element={<WatchScreen />} />
      </Route>
    </Routes>
  );
};

export default App;
