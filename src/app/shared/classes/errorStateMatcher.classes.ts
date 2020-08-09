import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean{
        const invalidCtrl = !!(control && control.invalid);
        const invalidParent = !!(control && control.parent && control.parent.hasError('mismatch') && control.parent.dirty);
    return (invalidCtrl || invalidParent);
    }
}