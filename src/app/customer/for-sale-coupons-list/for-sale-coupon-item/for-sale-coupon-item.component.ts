import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from '../../../models/coupon.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-for-sale-coupon-item',
  templateUrl: './for-sale-coupon-item.component.html',
  styleUrls: ['./for-sale-coupon-item.component.css']
})
export class ForSaleCouponItemComponent implements OnInit {

  @Input() coupon: Coupon
  soldOut = false

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    if (this.coupon.amount < 1) {
      this.soldOut = true
    }

  }

  isGoingExpired() {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    console.log(date, date.getTime())
    console.log(this.coupon.endDate, this.coupon.endDate.valueOf())

    return date > new Date(this.coupon.endDate)
  }

  onPurchaseCoupon() {
    this.customerService.purchaseCoupon(this.coupon.id)
  }
}
