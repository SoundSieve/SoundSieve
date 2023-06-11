import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserUpdateData } from 'src/app/shared/interfaces/UserUpdateData.interface';
import { FileUploadService } from 'src/app/shared/services/file-upload/file-upload.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public readonly _userService = inject( UserService );
  public readonly _fileUpload = inject( FileUploadService );
  public readonly _router = inject( Router );
  public readonly _fb = inject( FormBuilder );
  
  public canEdit: boolean = false;
  public isEditing: boolean = false;
  public currentUrl: string = '';
  public currentUser: User;
  public creationDate = computed(() => {
    this.formatDate();
  })
  public userInstruments: string = '';

  public fileImage: File;
  public imgTemp: any = null;

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
  });

  constructor () { 
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.currentUser = this._userService.currentUser();
  }

  ngOnInit(): void {
      this.mapValues(this.currentUser);
      this.resizeInputHeight ( 'bio', 1.8 );
      this.resizeInputWidth ( 'profile-box-input-location',  this.profileForm.value.length );

    if(this.currentUrl.includes('edit')) {
      this.isEditing = true;
      var inputs = document.querySelectorAll('.profile-input')
      inputs.forEach( (input: HTMLInputElement) => {
        input.classList.remove('profile-input');
        input.classList.add('profile-input-edit');
        this.resizeInputHeight ( 'bio', 2 );
      })
    }  else {
      this.isEditing = false;
    }
  }

  resizeInputHeight ( input: string , offset: number) {
    var text = document.getElementById( input );
    text.style.height = 'auto';
    text.style.height = (text.scrollHeight * offset)+'px';
  }

  resizeInputWidth ( input: string, length: number ) {
    var text = document.getElementById( input );
    const offset = 100;
    text.style.width = (length * offset) + "ch";
  }

  prepareInstruments(instrumentsArray: string[]): string {
    let instruments: string = '';
    instrumentsArray.forEach((instrument) => {
      instruments += instrument + '\t';
    })
    return instruments;
  }

  formatDate(): string {
    let index = this.currentUser.creationTime.toString().indexOf("T");
    return this.currentUser.creationTime.toString().substring(0, index)
  }

  getProfileId(): string {
    let index = this.currentUrl.lastIndexOf("/");
    return this.currentUrl.substring(index + 1)
  }

  mapValues(user: User) {
    this.userInstruments = this.prepareInstruments(user?.instruments);

    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName || 'Fill your last name...',
      username: user.username,
      email: user.email,
      bio: user?.bio || 'Fill your bio...',
      ocupation: user?.ocupation || 'Dog walker',
      location: user?.location || 'Wakanda',
      city: user?.city || 'Birnin Zana',
      instruments: this.userInstruments || 'Zambomba',
    });
  }

  saveProfileChanges() {
    const data : UserUpdateData = {
      username: this.profileForm.get('username').value,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      bio: this.profileForm.get('bio').value,
      ocupation: this.profileForm.get('ocupation').value,
      location: this.profileForm.get('location').value,
      city: this.profileForm.get('city').value,
      role: this.currentUser.role,
      enabled: true,
    }

    const url = this.navigation_urls[0].url + this.currentUser.uid;
    this._userService.updateUser(this.currentUser.uid, data)
      .subscribe({
        next: (response) => {
          this.updateDataUser(data);
          Swal.fire('Updated', 'The changes were saved!', 'success');
          this._router.navigateByUrl(url);
        },
        error: (error) => {
          console.log(error);
          this._router.navigateByUrl(url);
          Swal.fire('Error', error.error.msg, 'error');
        },
      });
  }

  updateDataUser( data: UserUpdateData) {
    this.currentUser.username = data.username || this.currentUser.username;
    this.currentUser.firstName = data.firstName || this.currentUser.firstName;
    this.currentUser.lastName = data.lastName || this.currentUser.lastName;
    this.currentUser.bio = data.bio || this.currentUser.bio;
    this.currentUser.ocupation = data.ocupation || this.currentUser.ocupation;
    this.currentUser.location = data.location || this.currentUser.location;
    this.currentUser.city = data.city || this.currentUser.city;
  }

  updateImage(file: File) {
    this.fileImage = file;
    if(!file) { 
      return this.imgTemp = null; 
    };

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    
  }

  saveImage() {
      this._fileUpload.updateFile(this.fileImage, 'users', 'img', this.currentUser.uid)
        .then( img => {
         this.currentUser.img = img;
         Swal.fire('Updated', 'The changes were saved!', 'success'); 
        }).catch( error => {
          Swal.fire('Error', 'Could not update image', 'error');
          console.log(error);
        });
  }

  discard() {
    const url = this.navigation_urls[0].url + this.currentUser.uid;
    this._router.navigateByUrl(url);
  }

  goToEdit() {
    const url = this.navigation_urls[0].url + this.currentUser.uid + '/edit';
    this._router.navigateByUrl(url);
  }

  async goToDeleteAccount() {
    const usermail = this.currentUser.email;
    Swal.fire({
      title: 'Are you sure to delete this account?',
      input: 'text',
      inputLabel: `To confirm, type "${usermail}" in the box below`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value === usermail) {
          Swal.fire('Account deleted', `Account "${usermail}" was successfully deleted`, 'success');
          this._userService.logout();
        } else {
          Swal.fire('Error', 'Confirmation has failed', 'error');
        }
      } else {
        Swal.fire('Error', 'Could not delete account', 'error');
      }
    })
  }
}
