import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss']
})
export class GenericInputComponent implements OnInit, ControlValueAccessor {

    @Input() label: string | undefined;
    @Input() placeholder: string = "";
    @Input() required: boolean = true;
    @Input() disabled: boolean = false;
    @Input() type: 'text' | 'email' | 'password' = 'text';
    @Input() value: any = "";

    private errorMessages = new Map<string, () => string>();

    constructor(
        // Retrieve the dependency only from the local injector,
        // not from parent or ancestors.
        @Self()
        // We want to be able to use the component without a form,
        // so we mark the dependency as optional.
        @Optional()
        private control: NgControl
    ) {
        if (this.control) {
            this.control.valueAccessor = this;
            console.log('this', this)

            if (this.required) {
                this.errorMessages.set('required', () => `${this.label} is required.`);
            }
            // this.errorMessages.set('minlength', () => `The no. of characters should not be less than ${this.minlength}.`);
        }
    }

    ngOnInit(): void {}

    public get invalid(): boolean {
        if (!this.control.invalid) {
            return false;
        }

        return this.control ? this.control.invalid : false;
    }

    public get showError(): any {
        if (!this.control) {
            return false;
        }

        const { dirty, touched } = this.control;
        // console.log('showError')
        // console.log('is dirty?', dirty);
        // console.log('is touched?', touched);
        return this.invalid ? (dirty || touched) : false;
    }

    public get errors(): any {
        if (!this.control) {
            return [];
        }

        const { errors } = this.control;
        // @ts-ignore: Unreachable code error
        return Object.keys(errors as ValidationErrors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
    }

    onChange(_?: any) {}

    onTouched() {}

    /**
     * Write form value to the DOM element (model => view)
     */
    writeValue(value: any): void {
        this.value = value;
    }

    /**
     * Write form disabled state to the DOM element (model => view)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * Update form when DOM element value changes (view => model)
     */
    registerOnChange(fn: any): void {
        // Store the provided function as an internal method.
        this.onChange = fn;
    }

    /**
     * Update form when DOM element is blurred (view => model)
     */
    registerOnTouched(fn: any): void {
        // Store the provided function as an internal method.
        this.onTouched = fn;
    }

}
