import {
  Container,
  HopeProvider,
  HopeThemeConfig,
  Spinner,
} from "@hope-ui/solid";
import { signInAnonymously } from "firebase/auth";
import { FirebaseProvider, useAuth } from "solid-firebase";
import { Component, Match, onMount, Switch } from "solid-js";
import { firebaseAuth, firebaseConfig } from "./api/firebase";
import { ChannelProvider } from "./api/providers/channel.provider";
import CompleteProfileView from "./components/organisms/CompleteProfileView";
import WatchScreen from "./screens/WatchScreen";

const config: HopeThemeConfig = {
  initialColorMode: "dark",
  darkTheme: {
    colors: {},
  },
};

const App: Component = () => {
  return (
    <HopeProvider config={config}>
      <FirebaseProvider config={firebaseConfig}>
        <AppLoading />
      </FirebaseProvider>
    </HopeProvider>
  );
};

const AppLoading = () => {
  const state = useAuth(firebaseAuth);

  onMount(() => {
    signInAnonymously(firebaseAuth);
  });

  const channelId = () => "test_channel";
  return (
    <Switch>
      <Match when={state.loading}>
        <Container centered>
          <Spinner />
        </Container>
      </Match>
      <Match when={state.error}>
        <div></div>
      </Match>
      <Match when={state.data}>
        <CompleteProfileView />
        <ChannelProvider channelId={channelId()}>
          <WatchScreen />
        </ChannelProvider>
      </Match>
    </Switch>
  );
};

export default App;
