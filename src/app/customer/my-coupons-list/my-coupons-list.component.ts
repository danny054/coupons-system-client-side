import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-coupons-list',
  templateUrl: './my-coupons-list.component.html',
  styleUrls: ['./my-coupons-list.component.css']
})
export class MyCouponsListComponent implements OnInit {

  coupons: Coupon[]
  empty = false

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.fetchMyCoupons()
    this.customerService.myCouponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons
      
      if (!this.coupons) {
        this.empty = true
      }
    })
  }
}
