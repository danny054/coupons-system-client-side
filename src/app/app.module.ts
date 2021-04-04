import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { CompanyComponent } from './company/company.component'
import { StorageService } from './common/storage.service';
import { MyCouponsListComponent } from './customer/my-coupons-list/my-coupons-list.component';
import { CouponItemComponent } from './customer/my-coupons-list/coupon-item/coupon-item.component';
import { CustomerService } from './customer/customer.service';
import { ForSaleCouponsListComponent } from './customer/for-sale-coupons-list/for-sale-coupons-list.component';
import { ForSaleCouponItemComponent } from './customer/for-sale-coupons-list/for-sale-coupon-item/for-sale-coupon-item.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { AdminComponent } from './admin/admin.component';
import { CouponsListComponent } from './company/coupons-list/coupons-list.component';
import { CompanyService } from './company/company.service';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { CompanyHeaderComponent } from './company/company-header/company-header.component';
import { CompanyCouponItemComponent } from './company/coupons-list/company-coupon-item/company-coupon-item.component';
import { AddCouponComponent } from './company/add-coupon/add-coupon.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { LoginCustomerComponent } from './customer/login-customer/login-customer.component';
import { LoginCompanyComponent } from './company/login-company/login-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    CompanyComponent,
    MyCouponsListComponent,
    CouponItemComponent,
    ForSaleCouponsListComponent,
    ForSaleCouponItemComponent,
    CustomerEditComponent,
    AdminComponent,
    CouponsListComponent,
    CustomerHeaderComponent,
    CompanyHeaderComponent,
    CompanyCouponItemComponent,
    AddCouponComponent,
    CompanyEditComponent,
    LoginCustomerComponent,
    ViewCustomerComponent,
    LoginCompanyComponent,
    ViewCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StorageService, CustomerService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
