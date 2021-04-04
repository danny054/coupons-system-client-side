import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  errorMessage: string

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomer()
    this.customerService.errorChannel.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    })
  }

  onClickDismissError() {
    this.errorMessage = ""
  }
}
