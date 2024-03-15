import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { mandatoryValidator } from '../validators/mandatory.validator';

@Directive({
  selector: '[mandatory]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MandatoryDirective,
    multi: true
  }]
})
export class MandatoryDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return mandatoryValidator()(control);
  }
}
