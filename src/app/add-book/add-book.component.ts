

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book: any = {};

  constructor(private http: HttpClient) { }

  addBook() {
    this.http.post('http://localhost:3000/add-book', this.book)
      .subscribe(response => {
        console.log(response);
      });
  }
}
