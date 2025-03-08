import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * A view that wraps the individual pages
 * Includes a header and drawer to navigate between pages
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  /** A handle on the side navigation drawer */
  @ViewChild("drawer") private drawer!: MatSidenav;

  constructor(private auth: Auth) { }

  /**
   * Handles the sign out button by logging out with Firebase
   */
  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  /**
   * Closes the side navigation drawer
   */
  public closeDrawer(): void {
    this.drawer.close();
  }

}
