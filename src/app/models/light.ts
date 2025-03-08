import { Firestore, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';

/**
 * A type describing the current light state. This must match the "schema" of
 * the corresponding object in Firestore.
 */
export type Light = {
  /** Whether the light is currently on */
  isOn: boolean;
  /** The logical mode to use when deciding whether the light should be on */
  mode: LightMode
  /** The timeout for switchTimeout mode */
  timeout: number;
};

/**
 * The possible modes that can be used to determine when light should be on.
 */
export enum LightMode {
  /** Light always on */
  on = "on",
  /** Light always off */
  off = "off",
  /** Light is toggled on or off whenever the switch is pressed */
  switchToggle = "switchToggle",
  /** Light is only on when the switch is pressed */
  switchValue = "switchValue",
  /** On for an amount of time after the switch is pressed */
  switchTimeout = "switchTimeout",
}

/**
 * Translates light modes into a more human-readable description.
 * @param mode
 * @returns A description of the mode
 */
export function descriptionFromLightMode(mode: LightMode) {
  switch (mode) {
    case LightMode.switchToggle:
      return "toggle when perch pressed";
    case LightMode.switchValue:
      return "on when on perch"
    case LightMode.switchTimeout:
      return "on for a while when perch pressed";
    default:
      return mode;
  }
}

/**
 * Returns a reference to the document in Firestore that matches the {@link Light} type.
 * @param db The Firestore db
 * @returns a document reference
 */
export function getLightDocument(db: Firestore): DocumentReference<DocumentData> { return doc(db, "status/light"); }