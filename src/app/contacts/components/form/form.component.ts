import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact-data/contact.service';
import { SignalFormService } from '../../services/signal-form/signal-form.service';
import { Subscription } from 'rxjs';
import { Contact } from '../../interfaces/contact.interface';
import { rutValidator } from 'src/app/shared/validators/rut-validator';
import { formatRut } from 'src/app/shared/utils/rut-utils';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();

  public selectedContact: Contact | null = null;
  public contactForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    rut: ['', [Validators.required, rutValidator()]],
    tags: [[]]
  });

  public availableTags: string[] = ['backend', 'devops', 'frontend', 'diseño'];
  private subscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService, private signalFormService: SignalFormService ) {}

  public ngOnInit() {
    this.subscription = this.signalFormService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;
      this.initForm();
    });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initForm() {
    if (this.selectedContact) {
      this.contactForm.patchValue({
        id: this.selectedContact.id || null,
        name: this.selectedContact.name || '',
        email: this.selectedContact.email || '',
        rut: this.selectedContact.rut || '',
        tags: this.selectedContact.tags || []
      });
    }
  }


  public toggleTag(tag: string): void {
    const tags = this.contactForm.get('tags')?.value || [];
    if (tags.includes(tag)) {
      this.contactForm.get('tags')?.setValue(tags.filter((t: string) => t !== tag));
    } else {
      this.contactForm.get('tags')?.setValue([...tags, tag]);
    }
  }

  public isTagSelected(tag: string): boolean {
    const tags = this.contactForm.get('tags')?.value || [];
    return tags.includes(tag);
  }

  public onSave(): void {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactForm.value).subscribe({
        next: () => {
          this.closeForm.emit();
        },
        error: (err) => {
          console.error('Error al actualizar el contacto:', err);
        }
      });
    }
  }

  public onRutInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formattedRut = formatRut(input.value);
    this.contactForm.get('rut')?.setValue(formattedRut, { emitEvent: false });
  }
}
