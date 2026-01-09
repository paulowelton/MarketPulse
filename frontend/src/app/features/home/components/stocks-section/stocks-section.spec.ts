import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksSection } from './stocks-section';

describe('StocksSection', () => {
  let component: StocksSection;
  let fixture: ComponentFixture<StocksSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
