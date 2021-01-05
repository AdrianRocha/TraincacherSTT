import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRideComponent } from './search-ride.component';

describe('SearchRideComponent', () => {
  let component: SearchRideComponent;
  let fixture: ComponentFixture<SearchRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
