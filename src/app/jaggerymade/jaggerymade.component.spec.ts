import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaggerymadeComponent } from './jaggerymade.component';

describe('JaggerymadeComponent', () => {
  let component: JaggerymadeComponent;
  let fixture: ComponentFixture<JaggerymadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JaggerymadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JaggerymadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
