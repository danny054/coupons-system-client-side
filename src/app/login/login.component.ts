import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.type === "customer") {
      this.router.navigate(["/customer"], { relativeTo: this.route })
    }
    else if (this.type === "company") {
      this.router.navigate(["/company"], { relativeTo: this.route })
    } else {
      this.router.navigate(["/admin"], { relativeTo: this.route })
    }
  }
}
