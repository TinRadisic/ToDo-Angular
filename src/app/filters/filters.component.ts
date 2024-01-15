import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPriceFilter } from '../interfaces/IPriceFilter.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() filtersSet = new EventEmitter<IPriceFilter>();

  priceForm = new FormGroup({
    minPrice: new FormControl(0, Validators.min(0)),
    maxPrice: new FormControl(0),
  });

  getDataWithFilters(): void {
    const filters: IPriceFilter = {
      minPrice: this.priceForm.get('minPrice')?.value || 0,
      maxPrice: this.priceForm.get('maxPrice')?.value || 0,
    };
    this.filtersSet.emit(filters);
  }
}
