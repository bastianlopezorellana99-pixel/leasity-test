import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-data/contact.service';
import { SignalFormService } from '../../services/signal-form/signal-form.service';
import { catchError } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { Contact } from './../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, OnDestroy {
  public contacts: Contact[] = []; 
  public selectedContact: Contact | null = null; 
  public isNavSideOpen: boolean = false; 
  private subscription: Subscription | null = null;
  
  constructor(private contactService: ContactService, private signalFormService: SignalFormService) {}

  public ngOnInit(): void {
    this.loadContacts();

    this.subscription = this.signalFormService.contactSaved$.subscribe((saved) => {
      if (saved) {
        this.loadContacts();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadContacts(): void {
    this.contactService.getContacts()
      .pipe(
        catchError((error) => {
          console.error('Error al obtener contactos:', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.contacts = data;
      });
  }

  public onContactSelected(id: number): void {
    this.selectedContact = this.contacts.find(contact => contact.id === id) || null;
    this.signalFormService.setSelectedContact(this.selectedContact);
    this.isNavSideOpen = true; 
  }

  public closeNavSide(): void {
    this.selectedContact = null; 
    this.isNavSideOpen = false; 
  }
}