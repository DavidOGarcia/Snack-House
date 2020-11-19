import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDPageComponent } from './crud-page.component';

describe('CRUDPageComponent', () => {
  let component: CRUDPageComponent;
  let fixture: ComponentFixture<CRUDPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRUDPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
