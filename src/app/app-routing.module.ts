import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { MedicineDetailsComponent } from './components/medicine-details/medicine-details.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'medicine', pathMatch: 'full' },
{path: '', redirectTo: 'order', pathMatch: 'full'},
{path: 'medicine/:id', component: MedicineDetailsComponent},
{path: 'add', component: AddMedicineComponent},
{path: 'medicine', component: MedicineListComponent},
{path: 'order', component: CreateOrderComponent},
{path: 'orders/:id', component: OrderDetailsComponent},
{path: 'orders', component: OrderListComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
