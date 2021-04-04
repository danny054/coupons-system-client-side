import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from '../../../models/coupon.model';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent implements OnInit {

  @Input() coupon: Coupon

  constructor() { }

  ngOnInit(): void {
  }

  isGoingExpired() {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date > new Date(this.coupon.endDate)
  }
}
