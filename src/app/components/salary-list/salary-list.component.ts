import { Component, OnInit } from '@angular/core';
import { Salaries, SalaryCalcule } from 'src/app/model/user.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})
export class SalaryListComponent implements OnInit {
  public title: string;
  public isAdd: boolean;
  public salaryList: Array<Salaries>;
  public selectedSalary: Salaries;
  public salaryCalcule: SalaryCalcule;

  constructor(private api: ApiService) {
    this.title = 'Lista de Salários';
    this.isAdd = true;
    this.salaryList = new Array();
    this.salaryCalcule  = {"cpf": "", "salaryAverage": "", "discountAverage": "", "bigestSalary": "", "lowestSalary": ""};
    this.selectedSalary = {"cpf": "", "date": "", "salary": "", "discount": ""};
  }

  ngOnInit(): void {
    this.refreshListSalary();
  }

  private refreshListSalary() {
    this.api.getSalaries().subscribe((salaryList) => {
      this.salaryList = new Array();
      this.salaryList.push(...salaryList);
      this.salaryCalculus()
    }, (error) => {
      console.error(error);
    });
  }

  addItem(): void {
    this.api.createSalaries(this.selectedSalary)
      .subscribe(
        response => {
          console.log('create: ', response);
          this.refreshListSalary();
        },
        error => {
          console.log(error);
        });

  }

  selectItem(item: Salaries): void {
    this.isAdd = false;
    this.selectedSalary = item;
  }


  updateItem(): void {
    this.api.updateSalaries(this.selectedSalary.id, this.selectedSalary)
      .subscribe(
        response => {
          console.log('Update: ', response);
          this.refreshListSalary();
        },
        error => {
          console.log(error);
        });
  }

  cancelUpdate(): void {
    this.isAdd = true;
    this.selectedSalary = {"cpf": "", "date": "", "salary": "", "discount": ""};
  }

  removeItem(itemId: string): void {
    this.api.deleteSalaries(itemId)
      .subscribe(
        response => {
          console.log('delete: ', response);
          this.refreshListSalary();
        },
        error => {
          console.log(error);
        });
  }

  salaryCalculus():void{
    this.salaryCalcule= {"cpf": "", "salaryAverage": "", "discountAverage": "", "bigestSalary": "", "lowestSalary": ""};
    this.api.getBigestSalary().subscribe((salary) => {
      this.salaryCalcule.bigestSalary = salary.salary;

      this.api.getLowestSalary().subscribe((salary) => {
        this.salaryCalcule.lowestSalary = salary.salary;

        this.api.getDiscountAverage().subscribe((salary) => {
          this.salaryCalcule.discountAverage = salary.average;

          this.api.getSalaryAverage().subscribe((salary) => {
            this.salaryCalcule.salaryAverage = salary.average;
          }, (error) => {
            console.error('Error geting object');
            console.error(error);
          });

        }, (error) => {
          console.error('Error geting object');
          console.error(error);
        });

      }, (error) => {
        console.error('Error geting object');
        console.error(error);
      });

    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });
  }

}
