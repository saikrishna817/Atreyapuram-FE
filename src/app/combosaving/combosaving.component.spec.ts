import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosavingComponent } from './combosaving.component';

describe('CombosavingComponent', () => {
  let component: CombosavingComponent;
  let fixture: ComponentFixture<CombosavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombosavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombosavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
