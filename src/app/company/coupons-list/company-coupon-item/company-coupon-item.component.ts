import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-coupon-item',
  templateUrl: './company-coupon-item.component.html',
  styleUrls: ['./company-coupon-item.component.css']
})
export class CompanyCouponItemComponent implements OnInit {

  @Input() coupon: Coupon

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  onDeleteCoupon() {
    this.companyService.deleteCoupon(this.coupon)
  }
}
