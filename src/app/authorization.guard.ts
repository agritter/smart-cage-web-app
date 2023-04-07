import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private router: Router, private auth: Auth) { };

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
