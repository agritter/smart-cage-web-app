import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

/**
 * Checks that users are authenticated to access the main pages of the app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private router: Router, private auth: Auth) { };

  /**
   * Checks if a user is authenticated through Firebase and navigates
   * to the sign in page if they are not
   * @returns true if the user is authenticated
   */
  public canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) =>
      this.auth.onAuthStateChanged(async (user) => {
        if (!user) {
          this.router.navigate(["/signIn"]).then(() =>
            window.location.reload()
          );
          resolve(false);
        }

        resolve(true);
      })
    );
  }

}
