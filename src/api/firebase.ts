// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase, ref } from "firebase/database";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Channel } from "./entities/channel.entity";
import { __DEV__ } from "./helpers/constants";

import { Message, Participant, Presence } from "./sdk";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDP3WGrM1PrNlFNX2ri4Tbe4rgYF-CpsZw",
  authDomain: "bitwild-live.firebaseapp.com",
  databaseURL: "https://bitwild-live-default-rtdb.firebaseio.com",
  projectId: "bitwild-live",
  storageBucket: "bitwild-live.appspot.com",
  messagingSenderId: "586765207266",
  appId: "1:586765207266:web:1b371e7804b6a9138100bb",
  measurementId: "G-GTY9SEEEK3",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseDb = getDatabase(firebaseApp);

if (__DEV__) {
  connectFirestoreEmulator(firebaseFirestore, "localhost", 3333);
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  connectDatabaseEmulator(firebaseDb, "localhost", 9000);
}

const _channelRef = "channels";
const _messageRef = "messages";
const _participantRef = "participants";
const _presenceRef = "presence";

export interface Doc<T> {
  id: string;
  data: T;
}

export const FirebaseCollections = {
  channel: (channelId: string) =>
    doc(firebaseFirestore, `${_channelRef}/${channelId}`).withConverter(
      converter<Channel>()
    ),
  channelList: () =>
    collection(firebaseFirestore, _channelRef).withConverter(
      converter<Channel>()
    ),
  presence: () => {
    return collection(firebaseFirestore, "presence").withConverter(
      converter<Presence>()
    );
  },
  messageList: (channelId: string) =>
    collection(
      firebaseFirestore,
      _channelRef,
      channelId,
      _messageRef
    ).withConverter(converter<Message>()),

  participantList: (channelId: string) => {
    return collection(
      firebaseFirestore,
      _channelRef,
      channelId,
      _participantRef
    ).withConverter(converter<Participant>());
  },

  presenceList: (channelId: string) => {
    return collection(
      firebaseFirestore,
      _channelRef,
      channelId,
      _presenceRef
    ).withConverter(converter<Presence>());
  },

  participant: (channelId: string, participantId: string) => {
    return doc(
      FirebaseCollections.participantList(channelId),
      participantId
    ).withConverter(converter<Participant>());
  },
  conductorBroadcasts: (channelId: string) => {
    return ref(firebaseDb, "/conductor/" + `${channelId}` + "/broadcasts");
  },

  broadcasts: (channelId: string, type: string) => {
    return ref(
      firebaseDb,
      "/channels/" + `${channelId}` + "/broadcasts/" + type
    );
  },

  conductorSync: (channelId: string) => {
    return ref(firebaseDb, "/conductor/" + `${channelId}` + "/sync");
  },

  drawing: (channelId: string) => {
    return ref(firebaseDb, "/conductor/" + `${channelId}` + "/drawing/");
  },

  drawingPath(channelId: string, id: string) {
    return ref(
      firebaseDb,
      "/conductor/" + `${channelId}` + "/drawing/" + "/" + `${id}`
    );
  },
};

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return snap.data() as T;
  },
});
