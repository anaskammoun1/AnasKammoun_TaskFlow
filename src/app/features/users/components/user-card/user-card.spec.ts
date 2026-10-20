import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';
import { USERS } from '../../data/users.data';
import { PROJECTS } from '../../../projects/data/projects.data';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    fixture.componentRef.setInput('user', USERS[0]);
    fixture.componentRef.setInput('projects', PROJECTS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
