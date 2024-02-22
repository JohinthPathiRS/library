// show-books.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  filterValue: string = '';
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<any[]>('http://localhost:3000/books').subscribe(
      (data) => {
        this.books = data;
        this.filteredBooks = [...this.books];
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  decrementBookCount(bookId: number) {
    this.http.post(`http://localhost:3000/decrement-book/${bookId}`, {}).subscribe(
      () => {
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1 && this.books[bookIndex].BookCount > 0) {
          this.books[bookIndex].BookCount--;
          this.filteredBooks = [...this.books];
        }
      },
      (error) => {
        console.error('Error decrementing book count:', error);
      }
    );
  }

  applyFilter(event: any) {
    const filterValue = event.target.value || '';
    this.filterValue = filterValue;
    this.filteredBooks = this.books.filter(book =>
      book.Title.toLowerCase().includes(filterValue.toLowerCase()) ||
      book.Author.toLowerCase().includes(filterValue.toLowerCase())||
      book.Genre.toLowerCase().includes(filterValue.toLowerCase())||
      book.Subject.toLowerCase().includes(filterValue.toLowerCase())
    );
    this.currentPage = 1;
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  get visibleBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBooks.slice(startIndex, endIndex);
  }
}
