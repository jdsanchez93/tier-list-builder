import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionalTierListItemComponent } from './positional-tier-list-item.component';

describe('PositionalTierListItemComponent', () => {
  let component: PositionalTierListItemComponent;
  let fixture: ComponentFixture<PositionalTierListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionalTierListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionalTierListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
