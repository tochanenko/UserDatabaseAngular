import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { nameCharactersValidator } from '../validators/name-characters.validator';

@Directive({
  selector: '[nameCharacters]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NameCharactersDirective,
    multi: true
  }]
})
export class NameCharactersDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return nameCharactersValidator()(control);
  }
}
