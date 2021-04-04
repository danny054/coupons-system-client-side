import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Customer } from "../models/customer.model";
import { StorageService } from "../common/storage.service";
import { Coupon } from "../models/coupon.model";
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class CustomerService {

    private myCoupons: Coupon[]
    private couponsForSale: Coupon[]
    myCouponsChanged = new EventEmitter<Coupon[]>()
    forSaleCouponsChanged = new EventEmitter<Coupon[]>()
    customerEmitter = new EventEmitter<Customer>()
    errorChannel = new Subject<string>()

    constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) {
    }

    login(params: HttpParams) {
        this.storageService
            .login(params)
            .subscribe(token => {
                this.setToken(token)
                this.router.navigate(["/customer/login"], { relativeTo: this.route })
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying login to the server")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    setToken(token: string) {
        localStorage.setItem("token", token)
    }

    getCustomer() {
        this.storageService
            .getCustomer(localStorage.getItem("token"))
            .subscribe(customer => {
                this.customerEmitter.emit(customer)
            })
    }

    fetchMyCoupons() {
        this.storageService
            .getMyCoupons(localStorage.getItem("token"))
            .subscribe(coupons => {
                this.myCoupons = coupons
                this.onMyCouponsChanged()
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to fetch coupons from cloud!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    fetchCouponsForSale() {
        this.storageService
            .getCouponsForSale(localStorage.getItem("token"))
            .subscribe(coupons => {
                this.couponsForSale = coupons
                this.onForSaleCouponsChanged()
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to fetch coupons from cloud!")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    purchaseCoupon(id: number) {
        this.storageService
            .purchaseCoupon(localStorage.getItem("token"), id)
            .subscribe(coupon => {
                this.couponsForSale.splice(this.findIndexById(coupon), 1)
                this.onForSaleCouponsChanged()
                alert("The coupon purchase was successful")
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to purchase the coupon. please try again")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
    }

    findIndexById(coupon: Coupon): number {
        for (let i = 0; i < this.couponsForSale.length; i++) {
            const c = this.couponsForSale[i];

            if (c.id === coupon.id) {
                return i
            }
        }
        return 0
    }

    updateCustomer(customer: Customer) {
        this.storageService
            .updateCustomer(customer, localStorage.getItem("token"))
            .subscribe(customer => {
                this.customerEmitter.emit(customer)
                alert("Your details update was successful")
            }, error => {
                if (error.status === 0) {
                    this.errorChannel.next("There was an error trying to update your details.please try again")
                }
                else {
                    this.errorChannel.next(JSON.parse(error.error).message)
                }
            })
        this.router.navigate(["/customer/login"], { relativeTo: this.route })
    }

    getMyCoupons() {
        if (this.myCoupons) {
            return this.myCoupons.slice()
        }
        return null
    }

    getForSaleCoupons() {
        if (this.couponsForSale) {
            return this.couponsForSale.slice()
        }
        return null
    }

    onMyCouponsChanged() {
        this.myCouponsChanged.emit(this.getMyCoupons())
    }

    onForSaleCouponsChanged() {
        this.forSaleCouponsChanged.emit(this.getForSaleCoupons())
    }
}