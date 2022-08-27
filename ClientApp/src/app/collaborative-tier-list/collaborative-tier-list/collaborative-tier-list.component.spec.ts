import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborativeTierListComponent } from './collaborative-tier-list.component';

describe('CollaborativeTierListComponent', () => {
  let component: CollaborativeTierListComponent;
  let fixture: ComponentFixture<CollaborativeTierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborativeTierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborativeTierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
