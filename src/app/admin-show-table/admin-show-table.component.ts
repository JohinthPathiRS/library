

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-show-table',
  templateUrl: './admin-show-table.component.html',
  styleUrls: ['./admin-show-table.component.css']
})
export class AdminShowTableComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.http.get<any[]>('http://localhost:3000/books').subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  deleteBook(bookId: number): void {
    this.http.delete(`http://localhost:3000/books/${bookId}`).subscribe(
      () => {
        console.log('Book deleted successfully.');
        this.fetchBooks(); // Refresh the book list after deletion
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }
}
