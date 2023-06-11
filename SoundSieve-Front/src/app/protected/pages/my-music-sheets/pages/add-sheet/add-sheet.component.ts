import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';
import { SheetUpdateData } from 'src/app/shared/interfaces/SheetUpdateData.interface';
import { FileUploadService } from 'src/app/shared/services/file-upload/file-upload.service';
import { SheetsService } from 'src/app/shared/services/sheet/sheets.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { INSTRUMENTS } from 'src/app/shared/constants/Instruments';
import { GENRES, GENRES_OPT } from 'src/app/shared/constants/Genres';
import Swal from 'sweetalert2';
import { SheetResponse } from 'src/app/shared/interfaces/SheetResponse.interface';

@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.scss']
})
export class AddSheetComponent implements OnInit {
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

  public fileImage: File;
  public imgPreview: any = null;

  public filePdf: File;
  public pdfPreview: any = null;

  public sheetInstruments: string = '';
  public sheetGenres: string = '';

  public instrumentsOptions: string[] = INSTRUMENTS;
  public genresOptions: string[] = GENRES;


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

  public licenses = [
    {
      id: "performance",
      viewValue: "Performance"
    },
    {
      id: "record",
      viewValue: "Record"
    },
    {
      id: "copyright",
      viewValue: "Copyright | mention"
    },
  ];

  public genres = GENRES_OPT;

  sheetForm: FormGroup = this._fb.group({
    title: ['', Validators.required],
    author: [''],
    description: [''],
    creationDate: ['', [Validators.required, this.formatValidator(), this.maxDateValidator(new Date())]],
    license: ['', Validators.required],
    genres: ['', Validators.required],
    instruments: [''],
  });

  constructor (
    private _userService: UserService
  ) {
    this._router.events.subscribe((event) => {
      event instanceof NavigationEnd ? 
        this.currentUrl = event.url : null 
    });
    this.currentUser = this._userService.currentUser();

    this.currentSheet = {
      name: '',
      author: {
        _id: this.currentUser.uid,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
      },
      creationDate: null,
      license: '',
      genres: [],
      instruments: [],
      id: '',
    };
  }
  ngOnInit(): void {
    if(this.currentUrl.includes('edit')) {
      this.isEditing = true;
    }  else {
      this.isEditing = false;
    }
    this.mapValues(this.currentSheet);
  }

  updateImage(file: File) {
    const fileBox = document.querySelector('.add-preview');
    this.fileImage = file;
    if(!file) { 
      return this.imgPreview = null; 
    };

    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgPreview = reader.result;
    }
    fileBox.classList.add('no-border');
  }

  updatePdf(file: File) {
    this.filePdf = file;
    if(!file) { 
      return this.pdfPreview = null; 
    };

    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.pdfPreview = reader.result;
    }
  }

  saveImage(id: string) {
    this._fileUpload.updateFile(this.fileImage, 'sheets', 'img', id)
      .then( img => {
       this.currentUser.img = img;
       Swal.fire('Updated', 'The changes were saved!', 'success'); 
      }).catch( error => {
        Swal.fire('Error', 'Could not update image', 'error');
        console.log(error);
      });
  }

  savePdf(id: string) {
    console.log(this.filePdf)
    this._fileUpload.updateFile(this.filePdf, 'sheets', 'pdf', id)
      .then( pdf => {
       this.currentSheet.pdf = pdf;
      }).catch( error => {
        Swal.fire('Error', 'Could not save pdf', 'error');
        console.log(error);
      });
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
    this.currentSheet.name = data.name || this.currentSheet?.name;
    this.currentSheet.author._id = data.author || this.currentSheet?.author._id;
    this.currentSheet.creationDate = data.creationDate || this.currentSheet?.creationDate;
    this.currentSheet.license = data.license || this.currentSheet?.license;
    this.currentSheet.genres = data.genres || this.currentSheet?.genres;
    this.currentSheet.instruments = data.instruments || this.currentSheet?.instruments;
    this.currentSheet.description = data.description || this.currentSheet?.description;
    this.currentSheet.pdf = data.pdf || this.currentSheet?.pdf;
    this.currentSheet.pdfPreview = data.pdfPreview || this.currentSheet?.pdfPreview;
  }

  mapValues(sheet: Sheet) {
    this.sheetInstruments = this.prepareFieldArray(sheet?.instruments);
    this.sheetGenres = this.prepareFieldArray(sheet?.genres);

    this.sheetForm.patchValue({
      name: sheet?.name || '',
      author: this.currentUser.username,
      description: [''],
      creationDate:[''],
      license: [''],
      genres: [''],
      instruments: [''],
    });
  }

  formatValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const dateRegEx = new RegExp('^(2|1){1}[0-9]{3}.[0-9]{2}.[0-9]{2}.*$');
      const dateInput = control.value as Date;
      const match = dateInput.toISOString && dateRegEx.test(dateInput.toISOString());
      return  match ? null : {'formatValidator': {value: control.value} };
    };
  }

  maxDateValidator(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = control.value > maxDate.setHours(0, 0, 0);
      return invalid ? {'maxDate': {value: control.value}} : null;
    };
  }
  
  hasValueValidator(validity: string): boolean {
    return validity === 'valid' ? true : false;
  }

  selectedInstruments(values: string[]) {
    this.sheetForm.get('instruments').patchValue(values);
  }

  prepareFieldArray(array: string[]): string {
    let fieldString: string = '';
    if(array) {
      array.forEach((fieldValue) => {
        fieldString += fieldValue + '\t';
      })
    }
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

  saveSheet() {
    const data : SheetUpdateData = {
      name: this.sheetForm.get('title').value,
      author: this.currentUser.uid,
      creationDate: this.sheetForm.get('creationDate').value,
      license: this.sheetForm.get('license').value,
      genres: this.sheetForm.get('genres').value,
      instruments: this.sheetForm.get('instruments').value,
      description: this.sheetForm.get('description').value,
      pdf: this.currentSheet?.pdf || '',
      pdfPreview: this.currentSheet?.pdfPreview || '',
      enabled: true,
    }


    this._sheetService.newSheet(this.currentUser.uid, data)
      .subscribe({
        next: (response: SheetResponse) => {
          this.updateDataSheet(data);
          this.saveImage(response.sheet.id);
          this.savePdf(response.sheet.id);
          Swal.fire('Updated', 'The changes were saved!', 'success');
          this._router.navigateByUrl(this.navigation_urls[1].url);
        },
        error: (error) => {
          console.log(error);
          this._router.navigateByUrl(this.navigation_urls[1].url);
          Swal.fire('Error', error.error.msg, 'error');
        },
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

