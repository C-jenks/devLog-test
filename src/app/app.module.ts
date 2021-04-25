import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
