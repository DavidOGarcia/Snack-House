import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuchesPageComponent } from './chuches-page.component';

describe('ChuchesPageComponent', () => {
  let component: ChuchesPageComponent;
  let fixture: ComponentFixture<ChuchesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuchesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
