import { Component, OnDestroy, OnInit } from '@angular/core';
import { Audio, getAudioDocument, AudioMode } from '../models/audio';
import { Firestore, getDoc, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  public audio: Audio = { isOn: false, mode: AudioMode.off, volume: 0 };
  public haveRetrieved = false;
  private unsubscribe?: Unsubscribe;
  public audioModes = Object.values(AudioMode).filter((v) => (typeof v === "string"));

  constructor(private db: Firestore) { }

  public ngOnInit(): void {
    this.unsubscribe = onSnapshot(getAudioDocument(this.db), (audioUpdate) => {
      this.audio = audioUpdate.data() as Audio;
      this.haveRetrieved = true;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe?.call(this);
  }

  public onModeSelected(mode: AudioMode): void {
    updateDoc(getAudioDocument(this.db), { "mode": mode.toString() });
  }

  public onVolumeChange(): void {
    updateDoc(getAudioDocument(this.db), { "volume": this.audio.volume });
  }
}
