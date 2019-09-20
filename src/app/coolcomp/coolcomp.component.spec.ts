import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolcompComponent } from './coolcomp.component';

describe('CoolcompComponent', () => {
  let component: CoolcompComponent;
  let fixture: ComponentFixture<CoolcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
