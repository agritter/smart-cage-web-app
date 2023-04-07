import { Firestore, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';

export type Audio = {
  isOn: boolean;
  mode: AudioMode;
  volume: number;
};

export enum AudioMode {
  on,
  off,
  switchToggle,
  switchValue,
}

export function getAudioDocument(db: Firestore): DocumentReference<DocumentData> { return doc(db, "status/audio"); }