import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { signInWithPhoneNumber, getAuth, RecaptchaVerifier, ConfirmationResult, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A page used to login with Firebase using a phone number and
 * verification code
 */
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements AfterViewInit {
  /** A captcha required by Firebase */
  private recaptcha?: RecaptchaVerifier;

  /**
   * The result of the phone number sign in used to verify
   * the verification code
   */
  private confirmationResult?: ConfirmationResult;

  /** The phone number entered */
  public phoneNumber: string = "";

  /** Whether a phone number has been entered yet */
  public phoneNumberEntered: boolean = false;

  /** The verification code entered */
  public verificationCode: string = "";

  /** A reference to the sign in button */
  @ViewChild("signIn", { read: ElementRef }) private signInButton!: ElementRef;

  constructor(private router: Router, private auth: Auth, private snackBar: MatSnackBar) {
  }

  /**
   * Do some miscellaneous setup when initialized
   */
  ngAfterViewInit(): void {
    this.auth = getAuth();
    this.recaptcha = new RecaptchaVerifier(this.signInButton.nativeElement, { 'size': 'invisible' }, this.auth);
  }

  /**
   * Signs in with a phone number (a verification code is still needed)
   */
  public async signInWithPhoneNumber(): Promise<void> {
    try {
      this.confirmationResult = await signInWithPhoneNumber(this.auth, "+1" + this.phoneNumber, this.recaptcha!);
      this.phoneNumberEntered = true;
    }
    catch (error) {
      console.log(error);
      this.snackBar.open((error as Error).toString(), "", { duration: 5000 });
    }
  }

  /**
   * Checks the verification code entered and navigates to the
   * home page if the code is correct
   */
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
