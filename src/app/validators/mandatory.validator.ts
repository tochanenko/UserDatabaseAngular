import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mandatoryValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if(control.value == null || control.value.length == 0) return { empty: true }
		return null;
	}
}