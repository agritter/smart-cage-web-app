import { Component, OnDestroy, OnInit } from '@angular/core';
import { Light, getLightDocument, LightMode, descriptionFromLightMode } from '../models/light';
import { Firestore, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';

/**
 * A page that displays UI to change and view the light's state
 */
@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit, OnDestroy {
  /** The current state of the light */
  public light: Light = { isOn: false, mode: LightMode.off };

  /** Whether the light's current state has been received from Firestore */
  public haveRetrieved = false;

  /** A function used to unsubscribe from the Firestore light document */
  private unsubscribe?: Unsubscribe;

  /** The possible modes along with more human-readable labels */
  public lightModes = Object.keys(LightMode).map((mode) => ({ value: mode, label: descriptionFromLightMode(mode as LightMode) }));

  constructor(private db: Firestore) { }

  /**
   * Subscribe to the Firestore light document when initialized
   */
  public ngOnInit(): void {
    this.unsubscribe = onSnapshot(getLightDocument(this.db), (lightUpdate) => {
      this.light = lightUpdate.data() as Light;
      this.haveRetrieved = true;
    });
  }

  /**
   * Unsubscribe from the Firestore light document when destroyed
   */
  public ngOnDestroy(): void {
    this.unsubscribe?.call(this);
  }

  /**
    * Updates the mode in the Firestore document
    * @param mode the mode selected
    */
  public onModeSelected(mode: LightMode): void {
    updateDoc(getLightDocument(this.db), { "mode": mode.toString() });
  }

}
