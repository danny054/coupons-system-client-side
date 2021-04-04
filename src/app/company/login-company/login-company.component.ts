import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent implements OnInit {

  params = new HttpParams()
  userName = ""
  password = ""
  errorMessage = ""

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin() {
    this.params = this.params.set('email', this.userName)
      .set('password', this.password)
      .set('type', 'company')

    this.companyService.login(this.params)

    this.companyService.errorChannel.subscribe(errorMessage => {
      this.errorMessage = errorMessage
    })
  }
  onBackClicked() {
    this.router.navigate([""])
  }
}
