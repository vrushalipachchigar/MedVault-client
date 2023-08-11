import { Component } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import { Medicine } from 'src/app/models/medicine.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent {
  medicine: Medicine = {
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category: '',
  };

  submitted = false;

  categories: Category[] = [];

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // saveMedicine(): void {
  //   // const data = {
  //   //   name: this.medicine.name,
  //   //   description: this.medicine.description,
  //   //   price: this.medicine.price,
  //   //   quantity: this.medicine.quantity,
  //   //   category: this.medicine.category,
  //   // };
  //   // this.medicineService.create(data).subscribe({
  //   //   next: (res) => {
  //   //     console.log(res);
  //   //     this.submitted = true;
  //   //   },
  //   //   error: (e) => console.error(e),
  //   // });
  //   if (this.authService.isAuthenticated()) {
  //     const data = {
  //       name: this.medicine.name,
  //       description: this.medicine.description,
  //       price: this.medicine.price,
  //       quantity: this.medicine.quantity,
  //       category: this.medicine.category,
  //     };
  //     this.medicineService.create(data).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted = true;
  //       },
  //       error: (e) => console.error(e),
  //     });
  //   } else {
  //     // User is not logged in, redirect to the login page
  //     this.router.navigate(['/login']); // 'login' should be replaced with your actual login route
  //   }
  // }

  saveMedicine(): void {
    // Check if the user is logged in
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const data = {
          name: this.medicine.name,
          description: this.medicine.description,
          price: this.medicine.price,
          quantity: this.medicine.quantity,
          category: this.medicine.category,
        };
        this.medicineService.create(data).subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e),
        });
      } else {
        // User is not logged in, redirect to the login page
        this.router.navigate(['/login']); // 'login' should be replaced with your actual login route
      }
    });
  }
  

  newMedicine(): void {
    this.submitted = false;
    this.medicine = {
      name: '',
      quantity: 0,
      description: '',
      price: 0,
      category: '',
    };
  }
}
