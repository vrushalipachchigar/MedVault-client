import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})

export class MedicineDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentMedicine: Medicine = {
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    category: ''
  };
  message = '';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMedicine(this.route.snapshot.params["id"]);
    }

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {

      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;
    }
  }
  getMedicine(id: string): void {
    this.medicineService.get(id)
      .subscribe({
        next: (data) => {
          this.currentMedicine = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  updateMedicine(): void {
    this.message = '';
    this.medicineService.update(this.currentMedicine.id, this.currentMedicine)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This medicine was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteMedicine(): void {
    this.medicineService.delete(this.currentMedicine.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/medicine']);
        },
        error: (e) => console.error(e)
      });
  }
}