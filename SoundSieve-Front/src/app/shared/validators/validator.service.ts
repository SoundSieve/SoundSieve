import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { delay, Observable, of  } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class ValidatorService implements AsyncValidator {
    
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      throw new Error('Method not implemented.');
    }
    registerOnValidatorChange?(fn: () => void): void {
      throw new Error('Method not implemented.');
    } 

    static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched;
    }
  }