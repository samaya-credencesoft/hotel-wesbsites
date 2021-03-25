import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../site/home/model/property';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html'
  })

export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Output() checkPropertyAvailabilityEmit = new EventEmitter<boolean>();
  ngOnInit() { }
  constructor(
  ) { }
  checkAvailability() {
    this.checkPropertyAvailabilityEmit.emit(true);
   }
  }
