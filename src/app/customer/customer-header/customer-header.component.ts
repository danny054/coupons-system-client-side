import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  customer: Customer

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerService.customerEmitter.subscribe((customer: Customer) => {
      this.customer = customer
    })
  }

  onEditCustomer() {
    this.router.navigate(["/customer/login/edit"], { relativeTo: this.route })
  }

  onLogout() {
    this.customerService.setToken("")
    this.router.navigate([""])
  }
}
