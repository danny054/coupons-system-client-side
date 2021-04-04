import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  @ViewChild("f") couponForm: NgForm

  coupon: Coupon = {
    id: 0,
    title: "",
    description: "",
    amount: null,
    category: null,
    startDate: new Date(),
    endDate: new Date(),
    price: null,
    imageURL: ""
  }

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.companyService.addCoupon(this.coupon)
    this.router.navigate(["/company/login"])
  }

  onCancel() {
    this.router.navigate(["/company/login"])
  }
}
