import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsdchangeComponent } from './psdchange.component';

describe('PsdchangeComponent', () => {
  let component: PsdchangeComponent;
  let fixture: ComponentFixture<PsdchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsdchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsdchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
