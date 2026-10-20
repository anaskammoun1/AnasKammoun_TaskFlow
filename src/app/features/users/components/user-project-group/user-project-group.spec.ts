import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProjectGroup } from './user-project-group';
import { PROJECTS } from '../../../projects/data/projects.data';

describe('UserProjectGroup', () => {
  let component: UserProjectGroup;
  let fixture: ComponentFixture<UserProjectGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProjectGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProjectGroup);
    fixture.componentRef.setInput('project', PROJECTS[0]);
    fixture.componentRef.setInput('userId', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
