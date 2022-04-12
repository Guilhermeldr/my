import { GithubAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, onCleanup, onMount } from "solid-js";
import { firebaseAuth } from "../../api/firebase";

const ui = new firebaseui.auth.AuthUI(firebaseAuth);

type Props = {
  redirectUrl?: string;
};

const AuthView: Component<Props> = (props) => {
  let difRef: HTMLDivElement;

  onMount(() => {
    ui.start(difRef, {
      signInFlow: "popup",
      // autoUpgradeAnonymousUsers: true,
      signInSuccessUrl: props.redirectUrl ?? "/create",
      signInOptions: [GithubAuthProvider.PROVIDER_ID],
    });
  });

  onCleanup(() => {
    ui.reset();
  });
  return <div ref={difRef}></div>;
};

export default AuthView;
