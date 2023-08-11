import { Component } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import { Medicine } from 'src/app/models/medicine.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

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
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveMedicine(): void {
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
