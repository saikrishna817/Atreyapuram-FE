import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarmadeComponent } from './sugarmade.component';

describe('SugarmadeComponent', () => {
  let component: SugarmadeComponent;
  let fixture: ComponentFixture<SugarmadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SugarmadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SugarmadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
