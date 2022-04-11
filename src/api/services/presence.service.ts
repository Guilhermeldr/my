import { Unsubscribe } from "firebase/auth";
import {
  goOffline,
  goOnline,
  onDisconnect,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { firebaseDb } from "../firebase";

import { getDeviceIdentifier } from "../helpers/device_identifier";

export class PresenceService {
  static isConnected: boolean = false;

  static unsubscribe: Unsubscribe;

  static connect(channelId: string, userId: string) {
    const connectedRef = ref(firebaseDb, ".info/connected");
    const userStatusRef = ref(firebaseDb, "/presence/" + getDeviceIdentifier());

    if (this.isConnected) {
      throw new Error("Presence service is already connected");
    }

    const unsubscribe = onValue(connectedRef, async (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        this.isConnected = false;
        return;
      }

      this.isConnected = true;

      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.

      await onDisconnect(userStatusRef).remove();
      await set(userStatusRef, {
        updatedAt: serverTimestamp(),
        channelId,
        userId,
      });
    });
    return (PresenceService.unsubscribe = () => unsubscribe());
  }

  static disconnect() {
    if (PresenceService.unsubscribe) {
      PresenceService.unsubscribe();
    }
  }
}
