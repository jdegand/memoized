import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Person } from './person.model';

/*
const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
*/

/*

const fibonacci = (n: number, memo = {}) => {
  //@ts-ignore
  if(n in memo) return memo[n];
  if(n <= 2) return 1;
  //@ts-ignore
  memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
  //@ts-ignore
  return memo[n];
}

*/

const fibonacci = (n: number, memo: any = {}) => {
  if(n in memo) return memo[n];
  if(n <= 2) return 1;
  memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
  return memo[n];
}

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  template: `
    <h1 class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>
    <mat-form-field class="w-4/5">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label" />
    </mat-form-field>
    <mat-list class="flex w-full">
      <mat-list-item *ngFor="let person of persons">
        <div MatListItemLine class="flex justify-between">
          <h3>{{ person.name }}</h3>
          <mat-chip> {{ calculate(person.fib) }} </mat-chip>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Input() title = '';

  label = '';

  calculate(num: number) {
    return fibonacci(num);
  }
}