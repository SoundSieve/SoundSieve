import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public readonly _router = inject( Router );
  public readonly _fb = inject( FormBuilder );
  
  public currentUrl: string = '';
  public user: User;
  public userId: string;
  public isLoading: boolean = true;
  public creationDate = computed(() => {
    this.formatDate();
  })
  public userInstruments: string = '';
  public fieldIsEmpty = 'Its empty';

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
  });

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService ) { 
      this.userId = this._activatedRoute.snapshot.params['id'];
      if(this.userId)
        this.getUser(this.userId);
  }

  async ngOnInit(): Promise<void> {
      this.resizeInputHeight ( 'bio', 1.8 );
  }

  

  resizeInputHeight ( input: string , offset: number) {
    var text = document.getElementById( input );
    if(text) {
      text.style.height = 'auto';
      text.style.height = (text.scrollHeight * offset)+'px';
    }
  }

  prepareInstruments(instrumentsArray: string[]): string {
    let instruments: string = '';
    if(instrumentsArray.length) {
      instrumentsArray.forEach((instrument) => {
        instruments += instrument + '\t';
      })
    }
    return instruments;
  }

  formatDate(): string {
    let date: string = '';
    if(this.user) {
      let index = this.user.creationTime.toString().indexOf("T");
      date = this.user.creationTime.toString().substring(0, index);
    }
    return date;
  }

  getProfileId(): string {
    let index = this.currentUrl.lastIndexOf("/");
    return this.currentUrl.substring(index + 1)
  }

  mapValues(user: User) {
      this.userInstruments = this.prepareInstruments(user?.instruments);

    this.profileForm.patchValue({
      firstName: user?.firstName || this.fieldIsEmpty,
      lastName: user?.lastName || this.fieldIsEmpty,
      username: user?.username,
      email: user?.email,
      bio: user?.bio || this.fieldIsEmpty,
      ocupation: user?.ocupation || this.fieldIsEmpty,
      location: user?.location || 'Nowhere',
      city: user?.city || this.fieldIsEmpty,
      instruments: this.userInstruments || this.fieldIsEmpty,
    });

  }

  private getUser( query: string ) {
    this.isLoading = true;
    this._userService.getUserById( query )
      .subscribe((resp: any) => {
        next: {
          this.user = resp;
          this.mapValues(this.user);
          this.isLoading = false;
        }
        catchError( (error) => of(error))
      })
  }
}
