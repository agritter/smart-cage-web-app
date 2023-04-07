import { Component, OnDestroy, OnInit } from '@angular/core';
import { Light, getLightDocument, LightMode } from '../models/light';
import { Firestore, getDoc, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit, OnDestroy {
  public light: Light = { isOn: false, mode: LightMode.off };
  public haveRetrieved = false;
  private unsubscribe?: Unsubscribe;
  public lightModes = Object.values(LightMode).filter((v) => (typeof v === "string"));

  constructor(private db: Firestore) { }

  public ngOnInit(): void {
    this.unsubscribe = onSnapshot(getLightDocument(this.db), (lightUpdate) => {
      this.light = lightUpdate.data() as Light;
      this.haveRetrieved = true;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe?.call(this);
  }

  public onModeSelected(mode: LightMode): void {
    updateDoc(getLightDocument(this.db), { "mode": mode.toString() });
  }

}
