import { Firestore, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';

/**
 * A type describing the current audio state. This must match the "schema" of
 * the corresponding object in Firestore.
 */
export type Audio = {
  /** Whether the audio is currently playing */
  isOn: boolean;
  /** The logical mode to use when deciding whether audio should play */
  mode: AudioMode;
  /** The volume at which to play the audio */
  volume: number;
};

/**
 * The possible modes that can be used to determine when audio should play.
 */
export enum AudioMode {
  /** Audio always on */
  on = "on",
  /** Audio always off */
  off = "off",
  /** Audio is toggled on or off whenever the switch is pressed */
  switchToggle = "switchToggle",
  /** Audio is only on when the switch is pressed */
  switchValue = "switchValue",
}

/**
 * Translates audio modes into a more human-readable description.
 * @param mode
 * @returns A description of the mode
 */
export function descriptionFromAudioMode(mode: AudioMode) {
  switch (mode) {
    case AudioMode.switchToggle:
      return "toggle when perch pressed";
    case AudioMode.switchValue:
      return "play when on perch"
    default:
      return mode;
  }
}

/**
 * Returns a reference to the document in Firestore that matches the {@link Audio} type.
 * @param db The Firestore db
 * @returns a document reference
 */
export function getAudioDocument(db: Firestore): DocumentReference<DocumentData> { return doc(db, "status/audio"); }