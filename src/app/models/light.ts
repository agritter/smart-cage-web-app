import { Firestore, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';

export type Light = {
  isOn: boolean;
  mode: LightMode
};

export enum LightMode {
  on,
  off,
  switchToggle,
  switchValue,
}

export function getLightDocument(db: Firestore): DocumentReference<DocumentData> { return doc(db, "status/light"); }