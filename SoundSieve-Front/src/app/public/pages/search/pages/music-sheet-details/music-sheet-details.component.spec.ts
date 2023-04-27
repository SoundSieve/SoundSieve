import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSheetDetailsComponent } from './music-sheet-details.component';

describe('MusicSheetDetailsComponent', () => {
  let component: MusicSheetDetailsComponent;
  let fixture: ComponentFixture<MusicSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSheetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
