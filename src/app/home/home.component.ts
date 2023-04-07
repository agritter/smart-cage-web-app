import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild("drawer") private drawer!: MatSidenav;

  constructor(private auth: Auth) { }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  public closeDrawer(): void {
    this.drawer.close();
  }

}
