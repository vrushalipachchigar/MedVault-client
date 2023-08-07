import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})

export class MedicineListComponent implements OnInit {
  medicines?: Medicine[];
  currentMedicine: Medicine = {};
  currentIndex = -1;
  name = '';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  constructor(private medicineService: MedicineService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.retrieveMedicines();

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
        
        const user = this.storageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        //this.username = user.username;
      } 
  } 

  retrieveMedicines(): void {
    this.medicineService.getAll()
      .subscribe({
        next: (data) => {
          this.medicines = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveMedicines();
    this.currentMedicine = {};
    this.currentIndex = -1;
  }
  setActiveMedicines(medicine: Medicine, index: number): void {
    this.currentMedicine = medicine;
    this.currentIndex = index;
  }
  removeAllMedicines(): void {
    this.medicineService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchName(): void {
    this.currentMedicine = {};
    this.currentIndex = -1;
    this.medicineService.findByName(this.name)
      .subscribe({
        next: (data: Medicine[] | undefined) => {
          this.medicines = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }
}