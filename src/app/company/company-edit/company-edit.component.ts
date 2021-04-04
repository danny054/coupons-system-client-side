import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  @ViewChild("f") companyForm: NgForm

  company: Company

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyService.getCompany()
    this.companyService.companyEmitter.subscribe((company: Company) => {
      this.company = company
    })
  }

  onSubmit() {
    this.companyService.updateCompany(this.company)
    this.router.navigate(["/company/login"], { relativeTo: this.route })
  }

  onCancel() {
    this.router.navigate(["/company/login"], { relativeTo: this.route })
  }
}
