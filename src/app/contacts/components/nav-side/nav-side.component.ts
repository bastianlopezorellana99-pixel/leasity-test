import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  public onClose(): void {
    this.close.emit();
  }
}
