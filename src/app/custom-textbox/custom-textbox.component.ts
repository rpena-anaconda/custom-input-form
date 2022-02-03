import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-textbox',
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.scss']
})
export class CustomTextboxComponent implements ControlValueAccessor {

    @Input()
    // @ts-ignore: Unreachable code error
    public label: string;

    @Input()
    // @ts-ignore: Unreachable code error
    public placeholder: string;

    @Input()
    public required = false;

    @Input()
    public disabled = false;

    @Input()
    // @ts-ignore: Unreachable code error
    public data: string;

    @Input()
    public minLength = 0;

    private errorMessages = new Map<string, () => string>();

    public onChangeFn = (_: any) => {};

    public onTouchedFn = () => {};

    constructor(@Self() @Optional() public control: NgControl) {
        this.control && (this.control.valueAccessor = this);
        this.errorMessages.set('required', () => `${this.label} is required.`);
        this.errorMessages.set('minLength', () => `The no. of characters should not be less than ${this.minLength}.`);
    }

    public get invalid(): boolean {
        console.log('invalid() being called', this.control.invalid);
        // @ts-ignore: Unreachable code error
        return this.control ? this.control.invalid : false;
    }

    public get showError(): boolean {
        if (!this.control) {
            return false;
        }

        const { dirty, touched } = this.control;
        console.log('state', dirty, touched)
        // @ts-ignore: Unreachable code error
        return this.invalid ? (dirty || touched) : false;
    }

    public get errors(): Array<string> {
        if (!this.control) {
            return [];
        }

        const { errors } = this.control;
        // @ts-ignore: Unreachable code error
        return Object.keys(errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
    }

    public registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(obj: any): void {
        this.data = obj;
    }

    public onChange() {
        this.onChangeFn(this.data);
    }

}
