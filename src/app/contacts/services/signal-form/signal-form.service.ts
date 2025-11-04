import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './../../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalFormService {
  private selectedContactSubject = new BehaviorSubject<Contact | null>(null);
  selectedContact$ = this.selectedContactSubject.asObservable();

  setSelectedContact(contact: Contact | null) {
    this.selectedContactSubject.next(contact);
  }
}