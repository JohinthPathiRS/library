import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPayComponent } from './show-pay.component';

describe('ShowPayComponent', () => {
  let component: ShowPayComponent;
  let fixture: ComponentFixture<ShowPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
