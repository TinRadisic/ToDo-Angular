import { IProduct } from './../interfaces/IProduct.interface';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { ApiService } from './../services/api.service';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IPriceFilter } from '../interfaces/IPriceFilter.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];

  products$: Observable<any> = new Observable();

  unsubscribe$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getProductsAsync();
  }

  getProductsAsync() {
    this.products$ = this.apiService.getAllProducts();
    // .pipe(takeUntil(this.unsubscribe$));
  }

  getProducts(): void {
    this.apiService
      .getAllProducts()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  getFilters(event: IPriceFilter) {
    this.products$ = this.apiService.getAllProducts().pipe(
      map((products: IProduct[]) => {
        return products.filter(
          (product: IProduct) =>
            product.price >= event.minPrice && event.maxPrice <= event.maxPrice
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }
}
