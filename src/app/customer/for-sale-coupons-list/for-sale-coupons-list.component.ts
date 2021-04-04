import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-for-sale-coupons-list',
  templateUrl: './for-sale-coupons-list.component.html',
  styleUrls: ['./for-sale-coupons-list.component.css']
})
export class ForSaleCouponsListComponent implements OnInit {

  coupons: Coupon[]
  empty = false

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.fetchCouponsForSale()
    this.customerService.forSaleCouponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons

      if (!this.coupons) {
        this.empty = true
      }
    })
  }
}
