import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedquestionComponent } from './uploadedquestion.component';

describe('uploadedquestionComponent', () => {
  let component: UploadedquestionComponent;
  let fixture: ComponentFixture<UploadedquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
