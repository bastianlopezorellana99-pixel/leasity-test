import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from './../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {
  @Input() contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<number>();

  constructor() { }

  public onSelectContact(id: number): void {
    this.contactSelected.emit(id);
  }

}
