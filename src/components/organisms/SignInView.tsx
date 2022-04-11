import { GithubAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, onCleanup, onMount } from "solid-js";
import { firebaseAuth } from "../../api/firebase";

const ui = new firebaseui.auth.AuthUI(firebaseAuth);

const SignInView: Component = () => {
  let difRef: HTMLDivElement;

  onMount(() => {
    ui.start(difRef, {
      signInFlow: "popup",

      signInSuccessUrl: "/create",
      signInOptions: [
        {
          provider: GithubAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
      ],
    });
  });

  onCleanup(() => {
    ui.reset();
  });
  return <div ref={difRef}></div>;
};

export default SignInView;
