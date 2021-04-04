import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {

  coupons: Coupon[]
  sortedCoupons: Coupon[]

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyService.fetchCoupons()
    this.companyService.couponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons
      this.sortedCoupons = this.coupons.slice()
    })
  }

  selectChangeHandler(value: string) {
    if (value === "sales") {
      this.coupons = this.sortedCoupons.slice()
    }
    else if (value === "title") {
      this.coupons.sort((a, b) => this.sortByTitle(a, b))
    }
    else if (value === "startDate") {
      this.coupons.sort((a, b) => this.sortByStartDate(a, b))
    }
    else if (value === "endDate") {
      this.coupons.sort((a, b) => this.sortByEndDate(a, b))
    }
  }

  sortByTitle(a: Coupon, b: Coupon) {
    const titleA = a.title.toUpperCase()
    const titleB = b.title.toUpperCase()
    return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0
  }

  sortByStartDate(a: Coupon, b: Coupon) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  }

  sortByEndDate(a: Coupon, b: Coupon) {
    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  }

  onNewCoupon() {
    this.router.navigate(["/company/login/new"], { relativeTo: this.route })
  }
}
