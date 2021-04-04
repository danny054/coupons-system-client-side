import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  @ViewChild("f") customerForm: NgForm

  customer: Customer

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerService.getCustomer()
    this.customerService.customerEmitter.subscribe((customer: Customer) => {
      this.customer = customer
    })
  }

  onSubmit() {
    this.customerService.updateCustomer(this.customer)
    this.router.navigate(["/customer/login"], { relativeTo: this.route })
  }

  onCancel() {
    this.router.navigate(["/customer/login"], { relativeTo: this.route })
  }
}
