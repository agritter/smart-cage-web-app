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
  /** The timeout for switchTimeout mode */
  timeout: number;
  /** The source for the audio (ex. radio, local files) */
  type: AudioType;
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
  /** Play for an amount of time after the switch is pressed */
  switchTimeout = "switchTimeout",
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
      return "play when on perch";
    case AudioMode.switchTimeout:
      return "plays for a while when perch pressed";
    default:
      return mode;
  }
}

/**
 * The possible audio types that can be played.
 */
export enum AudioType {
  /** Play local files of budgies talking */
  budgies = "budgies",
  /** Play an 80s radio station */
  eighties = "eighties",
  /** Play a Latin radio station */
  latin = "latin",
  /** Play a jazz radio station */
  jazz = "jazz",
}

/**
 * Translates audio types into a more human-readable description.
 * @param type
 * @returns A description of the type
 */
export function descriptionFromAudioType(type: AudioType) {
  switch (type) {
    case AudioType.budgies:
      return "Disco and R2D2";
    case AudioType.eighties:
      return "80s Radio"
    case AudioType.latin:
      return "Latin Radio"
    case AudioType.jazz:
      return "Jazz Radio"
    default:
      return type;
  }
}

/**
 * Returns a reference to the document in Firestore that matches the {@link Audio} type.
 * @param db The Firestore db
 * @returns a document reference
 */
export function getAudioDocument(db: Firestore): DocumentReference<DocumentData> { return doc(db, "status/audio"); }