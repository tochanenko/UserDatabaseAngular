import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: TextInputComponent
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: String = '';
  @Input() image: String = '';
  
  @Output() changedValue = new EventEmitter<String>();

  control: FormControl = new FormControl('');
  touched: Boolean = false;
  disabled: Boolean = false;

  onChange = (text: String) => {}
  onTouched = () => {}

  
  writeValue(text: String): void {
    this.control.setValue(text);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  get value(): String {
    return this.control.value;
  }

  set value(newValue: String) {
    if (!this.disabled) {
      this.markAsTouched();
      this.control.setValue(newValue);
      this.changedValue.emit(newValue);
      this.onChange(this.control.value);
    }
  }
}
