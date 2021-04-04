import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css']
})
export class CompanyHeaderComponent implements OnInit {

  company: Company

  constructor(private companyServics: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyServics.getCompany()
    this.companyServics.companyEmitter.subscribe((company: Company) => {
      this.company = company
    })
  }

  onLogout() {
    this.companyServics.setToken("")
    this.router.navigate([""])
  }

  onEdit() {
    this.router.navigate(["/company/login/edit"], { relativeTo: this.route })
  }
}
