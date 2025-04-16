import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePopupComponent } from './response-popup.component';

describe('ResponsePopupComponent', () => {
  let component: ResponsePopupComponent;
  let fixture: ComponentFixture<ResponsePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
