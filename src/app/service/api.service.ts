import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Average, Salaries, User } from '../model/user.model';
import { Observable } from 'rxjs';


const baseAddress = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpClient) { }

  // User
  public createUser(data:User) {
    return this.httpService.post(`${baseAddress}/users`, data);
  }

  public getUsers(): Observable<User[]>  {
    return this.httpService.get<User[]>(`${baseAddress}/users`);
  }

  public getUser(cpf:string): Observable<User> {
    return this.httpService.get<User>(`${baseAddress}/users/${cpf}/`);
  }

  public updateUser(cpf:string, data:User) {
    return this.httpService.put(`${baseAddress}/users/${cpf}/`, data);
  }

  public deleteUser(cpf:string) {
    return this.httpService.delete(`${baseAddress}/users/${cpf}/`);
  }

  // Salaries
  public createSalaries(data:Salaries) {
    return this.httpService.post(`${baseAddress}/salaries`, data);
  }

  public getSalaries(): Observable<Salaries[]>  {
    return this.httpService.get<Salaries[]>(`${baseAddress}/salaries`);
  }

  public getSalary(cpf:string): Observable<Salaries[]> {
    return this.httpService.get<Salaries[]>(`${baseAddress}/salaries/${cpf}/`);
  }

  public updateSalaries(id:string, data:Salaries) {
    return this.httpService.put(`${baseAddress}/salaries/${id}/`, data);
  }

  public deleteSalaries(id:string) {
    return this.httpService.delete(`${baseAddress}/salaries/${id}/`);
  }

  public getSalaryAverage(): Observable<Average> {
    return this.httpService.get<Average>(`${baseAddress}/salaries-average`);
  }

  public getSalaryAverageUser(cpf:string): Observable<Average> {
    return this.httpService.get<Average>(`${baseAddress}/salaries-average/${cpf}/`);
  }

  public getBigestSalary(): Observable<Salaries> {
    return this.httpService.get<Salaries>(`${baseAddress}/bigest-salary`);
  }

  public getBigestSalaryUser(cpf:string): Observable<Salaries> {
    return this.httpService.get<Salaries>(`${baseAddress}/bigest-salary/${cpf}/`);
  }

  public getLowestSalary(): Observable<Salaries> {
    return this.httpService.get<Salaries>(`${baseAddress}/lowest-salary`);
  }

  public getLowestSalaryUser(cpf:string): Observable<Salaries> {
    return this.httpService.get<Salaries>(`${baseAddress}/lowest-salary/${cpf}/`);
  }

  // Discount
  public getDiscountAverage(): Observable<Average> {
    return this.httpService.get<Average>(`${baseAddress}/discount-average`);
  }

  public getDiscountAverageUser(cpf:string): Observable<Average>  {
    return this.httpService.get<Average>(`${baseAddress}/discount-average/${cpf}/`);
  }

}
