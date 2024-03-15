import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameCharactersValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const reg = /^[a-zA-Zа-яА-Яßä-üÄ-ÜґҐїЇіІ\\'\\-\\s]+$/;
		if (!reg.test(control.value)) return { hasWrongCharacters: true }
		return null;
	}
}