import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { signInWithPhoneNumber, getAuth, RecaptchaVerifier, ConfirmationResult, Auth, Persistence } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements AfterViewInit {
  private recaptcha?: RecaptchaVerifier;
  private confirmationResult?: ConfirmationResult;
  public phoneNumber: string = "";
  public phoneNumberEntered: boolean = false;
  public verificationCode: string = "";
  @ViewChild("signIn", { read: ElementRef }) private signInButton!: ElementRef;

  constructor(private router: Router, private auth: Auth, private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.auth = getAuth();
    this.recaptcha = new RecaptchaVerifier(this.signInButton.nativeElement, { 'size': 'invisible' }, this.auth);
  }

  public async signInWithPhoneNumber(): Promise<void> {
    try {
      this.confirmationResult = await signInWithPhoneNumber(this.auth, "+1" + this.phoneNumber, this.recaptcha!);
      this.phoneNumberEntered = true;
    }
    catch (error) {
      console.log(error);
      this.snackBar.open((error as Error).toString());
    }
  }

  public async checkVerificationCode(): Promise<void> {
    try {
      const userCredential = await this.confirmationResult!.confirm(this.verificationCode);
      this.router.navigate(["/light"])
    }
    catch (error) {
      console.log(error);
      this.snackBar.open((error as Error).toString(), "", { duration: 5000 });
    }

  }
}
