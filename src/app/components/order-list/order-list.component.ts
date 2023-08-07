import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  order?: Order[];
  currentOrder: Order | {} = {};
  currentIndex = -1;
  name = '';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private orderService: OrderService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {

    this.retrieveOrder();

    this.isLoggedIn = this.storageService.isLoggedIn();
    
    if (this.isLoggedIn) {

      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;
    }
  }

  retrieveOrder(): void {

    this.orderService.getAll()
      .subscribe({
        next: (data) => {
          this.order = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {

    this.retrieveOrder();
    this.currentOrder = {};
    this.currentIndex = -1;
  }

  setActiveOrder(order: Order, index: number): void {

    this.currentOrder = order;
    this.currentIndex = index;
  }

  removeAllOrder(): void {

    this.orderService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
          },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {

    this.currentOrder = {};
    this.currentIndex = -1;

    this.orderService.findByName(this.name)
      .subscribe({
        next: (data: Order[] | undefined) => {
          this.order = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
