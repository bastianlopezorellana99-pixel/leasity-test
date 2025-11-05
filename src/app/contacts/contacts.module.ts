import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactService } from './services/contact-data/contact.service';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NavSideComponent } from './components/nav-side/nav-side.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [ContactTableComponent, ContactPageComponent, NavSideComponent, FormComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ContactsModule { }
