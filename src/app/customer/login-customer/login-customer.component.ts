import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {

  params = new HttpParams()
  userName = ""
  password = ""
  errorMessage = ""

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.errorMessage = ""
    this.params = this.params.set('email', this.userName)
      .set('password', this.password)
      .set('type', 'customer')

    this.customerService.login(this.params)

    this.customerService.errorChannel.subscribe(errorMessage => {
      this.errorMessage = errorMessage
    })
  }

  onBackClicked() {
    this.router.navigate([""])
  }
}

