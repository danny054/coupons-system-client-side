import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Company } from "../models/company.model";
import { StorageService } from "../common/storage.service";
import { Coupon } from "../models/coupon.model";
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class CompanyService {

    private coupons: Coupon[]
    couponsChanged = new EventEmitter<Coupon[]>()
    companyEmitter = new EventEmitter<Company>()
    errorChannel = new Subject<string>()

    constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) {
    }

    login(params: HttpParams) {
        this.storageService
            .login(params)
            .subscribe(token => {
                this.setToken(token)
                this.router.navigate(["/company/login"], { relativeTo: this.route })
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying login to the server")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    fetchCoupons() {
        this.storageService
            .getCompanyCoupons(localStorage.getItem("token"))
            .subscribe(coupons => {
                this.coupons = coupons
                this.onCouponsChanged()
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to fetch coupons from cloud!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    deleteCoupon(coupon: Coupon) {
        this.storageService
            .deleteCoupon(localStorage.getItem("token"), coupon.id)
            .subscribe(() => {
                this.coupons.splice(this.coupons.indexOf(coupon), 1)
                this.onCouponsChanged()
                alert("Deleting the coupon was successful")
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to delete coupon from cloud!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    addCoupon(coupon: Coupon) {
        this.storageService
            .addCoupon(coupon, localStorage.getItem("token"))
            .subscribe(coupon => {
                alert("Adding the coupon was successful")
                this.coupons.unshift(coupon)
                this.onCouponsChanged()
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to add coupon to the cloud!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    updateCompany(company: Company) {
        this.storageService
            .updateCompany(company, localStorage.getItem("token"))
            .subscribe(company => {
                this.companyEmitter.emit(company)
                alert("Your details update was successful")
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to update the details!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
        this.router.navigate(["/company/login"], { relativeTo: this.route })
    }

    setToken(token: string) {
        localStorage.setItem("token", token)
    }

    getCoupons() {
        if (this.coupons) {
            return this.coupons.slice()
        }
        return null
    }

    onCouponsChanged() {
        this.couponsChanged.emit(this.getCoupons())
    }

    getCompany() {
        this.storageService
            .getCompany(localStorage.getItem("token"))
            .subscribe((company: Company) => {
                this.companyEmitter.emit(company)
            })
    }
}