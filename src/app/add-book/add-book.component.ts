import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      subject: ['', Validators.required],
      publishDate: ['', Validators.required],
      bookCount: ['', Validators.required]
    });
  }

  addBook() {
    
    const currentDate = new Date();
    const publishDate = new Date(this.bookForm.value.publishDate);

    if (publishDate > currentDate) {
      console.log('Cannot add a book with a future publish date.');
      return;
    }

    
    this.http.post('http://localhost:3000/add-book', this.bookForm.value)
      .subscribe(response => {
        console.log(response);
        this.bookForm.reset(); 
      });
  }
}
