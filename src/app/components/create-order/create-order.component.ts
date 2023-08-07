import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  order: Order = {
    name: '',
    quantity: 0,
    category: ''
  };
  
  submitted = false;

  categories: Category[] = []

  constructor(private orderService: OrderService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (data: Category[]) => {
        this.categories = data;
      });
  }  

  saveOrder(): void {

    const data = {
      name: this.order.name,
      quantity: this.order.quantity,
      category: this.order.category
    };

    this.orderService.create(data)
      .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
    error: (e) => console.error(e)
    });
  }

  newOrder(): void {

    this.submitted = false;
    this.order = {
      name: '',
      quantity: 0,
      category: ''
    };
  }
}
