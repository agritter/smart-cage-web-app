import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { signInWithEmailAndPassword, getAuth, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: false
})
export class AuthenticationComponent implements AfterViewInit {
  public username: string = "";
  public password: string = "";

  /** A reference to the sign in button */
  @ViewChild("signInButton", { read: ElementRef }) private signInButton!: ElementRef;

  constructor(private router: Router, private auth: Auth, private snackBar: MatSnackBar) {
  }

  /**
   * Do some miscellaneous setup when initialized
   */
  ngAfterViewInit(): void {
    this.auth = getAuth();
  }

  public async signIn(): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, this.username, this.password);
      this.router.navigate(["/light"])
    }
    catch (error) {
      console.log(error);
      this.snackBar.open((error as Error).toString(), "", { duration: 5000 });
    }
  }
}
