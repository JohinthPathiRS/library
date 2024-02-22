import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-show-table',
  templateUrl: './admin-show-table.component.html',
  styleUrls: ['./admin-show-table.component.css']
})
export class AdminShowTableComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
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

  applyFilter(event: any): void {
    const filterValue = event?.target?.value || '';
    this.filteredBooks = filterValue
      ? this.books.filter((book) => this.isBookMatch(book, filterValue))
      : [...this.books];
  }

  private isBookMatch(book: any, filterValue: string): boolean {
    return (
      book.Title.toLowerCase().includes(filterValue.toLowerCase()) ||
      book.Author.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  get pagedBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBooks.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
