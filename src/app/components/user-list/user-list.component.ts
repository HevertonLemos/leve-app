import { Component, OnInit } from '@angular/core';
import { User, SalaryCalcule } from 'src/app/model/user.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public title: string;
  public isAdd: boolean;
  public userList: Array<User>;
  public userCalcule: Array<SalaryCalcule>;
  public selectedUser: User;

  constructor(private api: ApiService) {
    this.title = 'Lista de Usuários';
    this.isAdd = true;
    this.userList = new Array();
    this.userCalcule  = new Array();
    this.selectedUser = {"name": "", "birtday": "", "cpf": ""};
  }

  ngOnInit(): void {
    this.refreshListUsers();
  }

  private refreshListUsers() {
    this.api.getUsers().subscribe((userList) => {
      this.userList = new Array();
      this.userCalcule = new Array();
      userList.forEach((item) => {
        this.userList?.push(item);
        this.userCalculus(item.cpf);
      });

    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });
  }

  addItem(): void {
    this.api.createUser(this.selectedUser)
      .subscribe(
        response => {
          console.log('create: ', response);
          this.refreshListUsers();
        },
        error => {
          console.log(error);
        });
  }

  selectItem(user: User): void {
    this.isAdd = false;
    this.selectedUser = user;
  }


  updateItem(): void {
    this.api.updateUser(this.selectedUser.cpf, this.selectedUser)
      .subscribe(
        response => {
          console.log('Update: ', response);
          this.refreshListUsers();
        },
        error => {
          console.log(error);
        });
  }

  cancelUpdate(): void {
    this.isAdd = true;
    this.selectedUser = {"name": "", "birtday": "", "cpf": ""};
  }

  removeItem(itemId: string): void {
    this.api.deleteUser(itemId)
      .subscribe(
        response => {
          console.log('delete: ', response);
          this.refreshListUsers();
        },
        error => {
          console.log(error);
        });
  }


  userCalculus(itemId: string):void{
    let itemTmp:SalaryCalcule;
    itemTmp= {"cpf": "", "salaryAverage": "", "discountAverage": "", "bigestSalary": "", "lowestSalary": ""};
    this.api.getBigestSalaryUser(itemId).subscribe((salary) => {
      itemTmp.cpf = itemId;
      itemTmp.bigestSalary = salary.salary;

      this.api.getLowestSalaryUser(itemId).subscribe((salary) => {
        itemTmp.lowestSalary = salary.salary;

        this.api.getDiscountAverageUser(itemId).subscribe((salary) => {
          itemTmp.discountAverage = salary.average;

          this.api.getSalaryAverageUser(itemId).subscribe((salary) => {
            itemTmp.salaryAverage = salary.average;

            this.userCalcule.push(itemTmp)
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

  getBigest(itemId: string): void {
    let value:string;
    this.api.getBigestSalaryUser(itemId).subscribe((salary) => {
      value = salary.salary;
      return value;
    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });

  }

  getLowest(itemId: string): void {
    let value;
    this.api.getLowestSalaryUser(itemId).subscribe((salary) => {
      value = salary.salary;
    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });
    return value;
  }

  getDiscountAverage(itemId: string): void {
    let value;
    this.api.getDiscountAverageUser(itemId).subscribe((salary) => {
      value = salary.average;
    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });
    return value;
  }

  getSalaryAverage(itemId: string): void {
    let value;
    this.api.getSalaryAverageUser(itemId).subscribe((salary) => {
      value = salary.average;
    }, (error) => {
      console.error('Error geting object');
      console.error(error);
    });
    return value;
  }

}
