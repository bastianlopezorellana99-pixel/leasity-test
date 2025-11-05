import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Contact } from '../../interfaces/contact.interface';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts = new BehaviorSubject<Contact[]>([
    { id: 1, name: 'Andres Colonia', email: 'andres@leasity.cl', rut: '17.395.120-5', tags: ['backend','devops','frontend'] },
    { id: 2, name: 'Matias Betarce', email: 'matias@leasity.cl', rut: '18.545.293-k', tags: ['frontend','backend','diseño'] },
    { id: 3, name: 'Felipe Apablaza', email: 'matias@leasity.cl', rut: '18.139.018-2', tags: ['frontend','diseño'] },
    { id: 4, name: 'Monica Kattan', email: 'momo@leasity.cl', rut: '19.032.332-3', tags: ['diseño'] },
  ]);

  getContacts(): Observable<Contact[]> {
    return this.contacts.asObservable();
  }

  updateContact(updatedContact: any): Observable<Contact> {
    const currentContacts = this.contacts.getValue();
    const index = currentContacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      currentContacts[index] = updatedContact;
      this.contacts.next([...currentContacts]);
    }
    return of(updatedContact);
  }

}
