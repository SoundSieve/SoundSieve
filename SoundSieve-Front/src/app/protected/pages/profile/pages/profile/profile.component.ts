import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStatus } from 'src/app/auth/interfaces/auth.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public readonly _userService = inject( UserService );
  public readonly _router = inject( Router );
  public readonly _fb = inject( FormBuilder );
  

  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  public currentUrl: string = '';
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(false);
  public creationDate = computed(() => {
    this.formatDate();
  })
  public userInstruments: string = '';

  public navigation_urls = [
    { title: 'Edit profile',
      url: '/browse/my-profile/',
    },
    { title: 'My projects',
      url: '/browse/my-music-sheets',
    },
    { title: 'Delete account',
      url: '',
    },
  ];

  profileForm: FormGroup = this._fb.group({
    firstName: [''],
    lastName: [''],
    username: [''],
    email: [''],
    bio: [''],
    ocupation: [''],
    location: [''],
    city: [''],
    instruments: [''],
  })

  ngOnInit(): void {
    if(this._userService.authStatus() === AuthStatus.authenticated) {
      this.loadUser();
      this.resizeInput ( 'bio' );
      this.userInstruments = this.prepareInstruments(this.currentUser()?.instruments);

      this.profileForm.patchValue({
        firstName: this.currentUser().firstName,
        lastName: this.currentUser().lastName,
        username: this.currentUser().username,
        email: this.currentUser().email,
        bio: this.currentUser()?.bio || 'Fill your bio...',
        ocupation: this.currentUser()?.occupation || 'Dog walker',
        location: this.currentUser()?.location || 'Wakanda',
        city: this.currentUser()?.city || 'Birnin Zana',
        instruments: this.userInstruments || 'Zambomba',
      });
    }
  }

  loadUser() {
    this._userService.user.subscribe({
      next: (user) => {
        this.currentUser.update(current => {
          return current = user;
        });
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      },
    });
  }

  resizeInput ( input: string ) {
    var text = document.getElementById( input );
    const offset = 1.8;
    text.style.height = 'auto';
    text.style.height = (text.scrollHeight * offset)+'px';
  }

  prepareInstruments(instrumentsArray: string[]): string {
    let instruments: string = '';
    instrumentsArray.forEach((instrument) => {
      instruments += instrument + '\t';
    })
    return instruments;
  }

  formatDate(): string {
    let index = this.currentUser().creationTime.toString().indexOf("T");
    return this.currentUser().creationTime.toString().substring(0, index)
  }

  goToEdit() {
    const url = this.navigation_urls[0].url + this.currentUser().uid + '/edit';
    this._router.navigateByUrl(url);
  }

  goToDeleteAccount() {
    this._userService.deleteUser(this.currentUser());
    this._userService.logout();
  }
}
