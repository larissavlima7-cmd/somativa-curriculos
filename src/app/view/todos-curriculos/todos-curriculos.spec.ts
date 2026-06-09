import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosCurriculos } from './todos-curriculos';

describe('TodosCurriculos', () => {
  let component: TodosCurriculos;
  let fixture: ComponentFixture<TodosCurriculos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosCurriculos],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosCurriculos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
