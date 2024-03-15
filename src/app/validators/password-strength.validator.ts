import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) return null;
		const hasLetters = /[a-zA-Z]+/.test(value);
		const hasNumeric = /[0-9]+/.test(value);
		const length = value.length >= 8;
		if (!length) return { insufficientPasswordLength: true }
		if (!hasNumeric) return { doesntHaveNumeric: true }
		if (!hasLetters) return { doesntHaveLetters: true }
		return null;
	}
}