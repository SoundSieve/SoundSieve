import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';
import { SheetUpdateData } from 'src/app/shared/interfaces/SheetUpdateData.interface';
import { FileUploadService } from 'src/app/shared/services/file-upload/file-upload.service';
import { SheetsService } from 'src/app/shared/services/sheet/sheets.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-music-sheet-details',
  templateUrl: './music-sheet-details.component.html',
  styleUrls: ['./music-sheet-details.component.scss']
})
export class MusicSheetDetailsComponent {

  public readonly _sheetService = inject( SheetsService );
  public readonly _fileUpload = inject( FileUploadService );
  public readonly _router = inject( Router );
  public readonly _fb = inject( FormBuilder );
  
  public currentUrl: string;
  public canEdit: boolean = false;
  public isEditing: boolean = false;
  public sheetId: string;
  public currentSheet: Sheet;
  public currentUser: User;
  public sheetUser: User;

  public sheetInstruments: string = '';
  public sheetGenres: string = '';

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

  sheetForm: FormGroup = this._fb.group({
    name: [''],
    author: [''],
    description: [''],
    year: [''],
    license: [''],
    genres: [''],
    instruments: [''],
  });

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.currentUser = this._userService.currentUser();
  }
  ngOnInit(): void {
    if(this.currentUrl.includes('edit')) {
      this.isEditing = true;
      var inputs = document.querySelectorAll('.profile-input')
      inputs.forEach( (input: HTMLInputElement) => {
        input.classList.remove('profile-input');
        input.classList.add('profile-input-edit');
      })
    }  else {
      this.isEditing = false;
    }
  }

  updateImage(file: File) {

  }

  getSheet(id: string) {
    this._sheetService.getSheetById( id )
      .subscribe((resp: any) => {
        next: {
          console.log(resp)
          this.currentSheet = resp;
          this.mapValues(this.currentSheet);
        }
        catchError( (error) => of(error))
      })
  }

  updateDataSheet( data: SheetUpdateData) {
    this.currentSheet.name = data.name || this.currentSheet.name;
    this.currentSheet.author._id = data.author || this.currentSheet.author._id;
    this.currentSheet.creationDate = data.creationDate || this.currentSheet.creationDate;
    this.currentSheet.license = data.license || this.currentSheet.license;
    this.currentSheet.genres = data.genres || this.currentSheet.genres;
    this.currentSheet.instruments = data.instruments || this.currentSheet.instruments;
    this.currentSheet.description = data.description || this.currentSheet.description;
  }

  mapValues(sheet: Sheet) {
    this.sheetInstruments = this.prepareFieldArray(sheet?.instruments);
    this.sheetGenres = this.prepareFieldArray(sheet?.genres);
    this.getUser(this.currentSheet.author._id);

    this.sheetForm.patchValue({
      name: sheet.name,
      author: this.sheetUser.firstName + this.sheetUser.lastName,
      description: [''],
      year: [''],
      license: [''],
      genres: [''],
      instruments: [''],
    });
  }

  prepareFieldArray(array: string[]): string {
    let fieldString: string = '';
    array.forEach((fieldValue) => {
      fieldString += fieldValue + '\t';
    })
    return fieldString;
  }

  private getUser( query: string ) {
    this._userService.getUserById( query )
      .subscribe((resp: any) => {
        next: {
          this.sheetUser = resp;
        }
        catchError( (error) => of(error))
      })
  }

  discard() {
    const url = this.navigation_urls[0].url + this.currentSheet.id;
    this._router.navigateByUrl(url);
  }

  goToEdit() {
    const url = this.navigation_urls[0].url + this.currentSheet.id + '/edit';
    this._router.navigateByUrl(url);
  }

  saveSheetChanges() {
    const data : SheetUpdateData = {
      name: this.sheetForm.get('username').value,
      author: this.sheetForm.get('author').value,
      creationDate: this.sheetForm.get('creationDate').value,
      license: this.sheetForm.get('license').value,
      genres: this.sheetForm.get('genres').value,
      instruments: this.sheetForm.get('location').value,
      description: this.sheetForm.get('description').value,
      enabled: true,
    }

    const url = this.navigation_urls[0].url + this.currentSheet.id;
    this._sheetService.updateSheet(this.currentSheet.id, this.currentUser.uid, data)
      .subscribe({
        next: (response) => {
          this.updateDataSheet(data);
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

  saveImage() {
    this._fileUpload.updateFile(this.fileImage, 'sheets', 'img', this.currentUser.uid)
      .then( pdfPreview => {
       this.currentSheet.pdfPreview = pdfPreview;
       Swal.fire('Updated', 'The changes were saved!', 'success'); 
      }).catch( error => {
        Swal.fire('Error', 'Could not update image', 'error');
        console.log(error);
      });
  }
  
  async goToDeleteSheet() {
    const sheetName = this.currentSheet.name;
    Swal.fire({
      title: 'Are you sure to delete this account?',
      input: 'text',
      inputLabel: `To confirm, type "${sheetName}" in the box below`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value === sheetName) {
          Swal.fire('Account deleted', `Account "${sheetName}" was successfully deleted`, 'success');
          this.discard();
        } else {
          Swal.fire('Error', 'Confirmation has failed', 'error');
        }
      } else {
        Swal.fire('Error', 'Could not delete account', 'error');
      }
    })
  }
}
