export interface SalaryCalcule {
  cpf: string;
  salaryAverage: string;
  discountAverage: string;
  bigestSalary: string;
  lowestSalary: string;
}

export interface User {
  id?: any;
  cpf: string;
  name: string;
  birtday: string;
}

export interface Salaries {
  id?: any;
  cpf: string;
  date: string;
  salary: string;
  discount: string;
}

export interface Average {
  average: string;
  total: string;
  qtd: string;
}
