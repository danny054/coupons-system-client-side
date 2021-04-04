import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Coupon } from "../models/coupon.model";
import { Company } from "../models/company.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class StorageService {

    constructor(private http: HttpClient) {
    }

    login(params: HttpParams) {
        return this.http.post("http://localhost:8080/api/login", params, { responseType: 'text' })
    }

    getMyCoupons(token: string) {
        return this.http.get<Coupon[]>(`http://localhost:8080/api/coupons/customers?token=${token}`)
    }

    getCouponsForSale(token: string) {
        return this.http.get<Coupon[]>(`http://localhost:8080/api/coupons/for-sale?token=${token}`)
    }

    purchaseCoupon(token: string, couponId: number) {
        return this.http.post<Coupon>(`http://localhost:8080/api/coupons/purchase/${couponId}?token=${token}`, {})

    }

    getCompanyCoupons(token: string) {
        return this.http.get<Coupon[]>(`http://localhost:8080/api/coupons/companies?token=${token}`)
    }

    deleteCoupon(token: string, id: number) {
        return this.http.delete(`http://localhost:8080/api/coupons/delete-coupon/${id}?token=${token}`)
    }

    updateCustomer(customer: Customer, token: string) {
        return this.http.patch<Customer>(`http://localhost:8080/api/customers/update?token=${token}`, customer)
    }

    addCoupon(coupon: Coupon, token: string) {
        return this.http.post<Coupon>(`http://localhost:8080/api/coupons/add-coupon?token=${token}`, coupon)
    }

    updateCompany(company: Company, token: string) {
        return this.http.patch<Company>(`http://localhost:8080/api/companies/update?token=${token}`, company)
    }

    getCustomer(token: string) {
        return this.http.get<Customer>(`http://localhost:8080/api/customers/get-me?token=${token}`)
    }

    getCompany(token: string) {
        return this.http.get<Company>(`http://localhost:8080/api/companies/get-me?token=${token}`)
    }
}
