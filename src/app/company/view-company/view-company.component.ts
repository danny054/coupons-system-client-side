import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  errorMessage: string

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany()
    this.companyService.errorChannel.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    })
  }

  onClickDismissError() {
    this.errorMessage = ""
  }
}
