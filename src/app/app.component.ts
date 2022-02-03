import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    public title = 'custom-input-form';
    public createForm: FormGroup = this.formBuilder.group({
        firstName: [],
        lastName: []
    });

    constructor(
        private formBuilder: FormBuilder
    ) {}
 
    ngOnInit(): void {
        // this.createForm = this.formBuilder.group({
        //     firstName: [],
        //     lastName: []
        // })   
    }

}
