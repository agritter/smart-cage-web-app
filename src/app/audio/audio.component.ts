import { Component, OnDestroy, OnInit } from '@angular/core';
import { Audio, getAudioDocument, AudioMode, descriptionFromAudioMode, AudioType, descriptionFromAudioType } from '../models/audio';
import { Firestore, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';

/**
 * A page that displays UI to change and view the audio state
 */
@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss'],
    standalone: false
})
export class AudioComponent implements OnDestroy, OnInit {
  /** The current state of the audio */
  public audio: Audio = { isOn: false, mode: AudioMode.off, volume: 0, timeout: 0, type: AudioType.budgies };

  /** Whether the audio's current state has been received from Firestore */
  public haveRetrieved = false;

  /** A function used to unsubscribe from the Firestore audio document */
  private unsubscribe?: Unsubscribe;

  /** The possible modes along with more human-readable labels */
  public audioModes = Object.keys(AudioMode).map((mode) => ({ value: mode, label: descriptionFromAudioMode(mode as AudioMode) }));

  /** The possible types along with more human-readable labels */
  public audioTypes = Object.keys(AudioType).map((mode) => ({ value: mode, label: descriptionFromAudioType(mode as AudioType) }));

  constructor(private db: Firestore) { }

  /**
   * Subscribe to the Firestore audio document when initialized
   */
  public ngOnInit(): void {
    this.unsubscribe = onSnapshot(getAudioDocument(this.db), (audioUpdate) => {
      this.audio = audioUpdate.data() as Audio;
      this.haveRetrieved = true;
    });
  }

  /**
   * Unsubscribe from the Firestore audio document when destroyed
   */
  public ngOnDestroy(): void {
    this.unsubscribe?.call(this);
  }

  /**
   * Updates the mode in the Firestore document
   * @param mode the mode selected
   */
  public onModeSelected(mode: AudioMode): void {
    updateDoc(getAudioDocument(this.db), { "mode": mode.toString() });
  }

  /**
   * Updates the type in the Firestore document
   * @param type the type selected
   */
  public onTypeSelected(type: AudioType): void {
    updateDoc(getAudioDocument(this.db), { "type": type.toString() });
  }

  /**
   * Changes the volume in the Firestore document
   */
  public onVolumeChange(): void {
    updateDoc(getAudioDocument(this.db), { "volume": this.audio.volume });
  }

  /**
 * Changes the timeout in the Firestore document
 */
  public onTimeoutChange(): void {
    updateDoc(getAudioDocument(this.db), { "timeout": this.audio.timeout });
  }

  /**
 * A formatted version of the timeout
 */
  public timeoutFormat(timeout: number): string {
    return `${timeout} minutes`;
  }

  /**
 * Checks if the current mode is timeout
 */
  public isTimeoutMode(): boolean {
    return this.audio.mode == AudioMode.switchTimeout;
  }
}
