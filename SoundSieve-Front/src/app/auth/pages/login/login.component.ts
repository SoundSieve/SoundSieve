import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user/user.service';


declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  public auth2: any;

  myForm: FormGroup = this._fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  errors: Map<string,string> = new Map<string,string>();

  constructor( private readonly _fb: FormBuilder,
               private readonly _router: Router,
               private readonly _userService: UserService,
               private readonly _ngZone: NgZone ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "1027260749299-6s5bhbp6tu6lqeo9bqsess82dale8of8.apps.googleusercontent.com",
      callback: (response) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", locale: "en-GB", shape:"pill", type: "standard", text:"signin_with", logo_alignment: "center"  } // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    this._userService.loginGoogle( response.credential )
    .subscribe({
      next: () => {
        if ( this.myForm.get('remember').value ){ 
          localStorage.setItem('email', this.myForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
          // Navegar al Dashboard
          this._ngZone.run(() => {
            Swal.fire('Login successful', 'Redirecting to browse', 'success');
            setTimeout(() => {
              this._router.navigateByUrl('/browse');
            }, 2000);
          })
      }, error: (err) => {
        // Si sucede un error
        if(err.error) {
          Swal.fire('Error', err.error.msg, 'error');
        }
      }});
  } 

  public login() {
    this._userService.login( this.myForm.value )
    .subscribe({
      next: () => {
        if ( this.myForm.get('remember').value ){ 
          localStorage.setItem('email', this.myForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
          // Navegar al Dashboard
          this._router.navigateByUrl('/browse');
      }, error: (err) => {
        // Si sucede un error
        if(err.errors) {
          let keys = Object.keys(err.errors);
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.errors.set(key, err.errors[key].msg);
          }
          };
        if(err.error) {
          Swal.fire('Error', err.error.msg, 'error');
        }
      }});
  }
}
