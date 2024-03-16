import { Component, DestroyRef, Input, forwardRef, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { NgIf } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => TextInputComponent),
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, Validator {
  // TODO Remove before deploy
  @Input() debug: boolean = false;
  json = JSON;
  // TODO
  
  @Input() label: string = '';
  @Input() image: string = '';
  @Input() type: string = '';
  @Input() required: boolean = false;

  control: FormControl = new FormControl<string>('');
  destroyRef: DestroyRef = inject(DestroyRef);

  touched: boolean = false;
  disabled: boolean = false;

  onChange = (text: string) => {}
  onTouched = () => {}

  
  writeValue(text: string): void {
    this.control.setValue(text, { emitEvent: false });
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const text = this.control.value;
    return null;
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(200),
        tap(value => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}

