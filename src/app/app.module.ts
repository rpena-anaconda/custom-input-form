import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { CustomTextboxComponent } from './custom-textbox/custom-textbox.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericInputComponent,
    CustomTextboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
