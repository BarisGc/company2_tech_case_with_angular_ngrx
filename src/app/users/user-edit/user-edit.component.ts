import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from '../users.model';
// import { UsersService } from '../users.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../appStore/app.reducer';
import { map } from 'rxjs/operators';
import * as UsersActions from '../store/users.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  id!: number;
  disableID = true;
  editMode = false;
  userForm!: UntypedFormGroup;

  storeSub = Subscription.EMPTY;
  get coursesControls() {
    // get controls()
    // buraya dikkat et
    return (<UntypedFormArray>this.userForm.get('userCourses')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    // private usersService: UsersService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  onSubmit() {
    if (this.editMode) {
      // this.usersService.updateUserData(this.id, this.userForm.value);
      this.store.dispatch(
        new UsersActions.UpdateUser({
          id: this.id,
          updatedUserInformations: this.userForm.value,
        })
      );
      this.onCancel();
    } else {
      if (
        this.store
          .select('users')
          .pipe(
            map((userData) =>
              userData.tableParameters.nonFilteredUsersTableData.find(
                (user) => user.userID === this.userForm.value.userID
              )
            )
          )
        // this.usersService
        //   .getAllTableParameters()
        //   .nonFilteredUsersTableData.find(
        //     (user: any) => user.userID === this.userForm.value.userID
      ) {
        alert('User already exists');
      } else {
        // this.usersService.addUser(this.userForm.value);
        this.store.dispatch(
          new UsersActions.AddUser({
            user: this.userForm.value,
          })
        );
        this.onCancel();
      }
    }
  }

  onCancel() {
    console.log('oncancelnavigate çalıtşım ?');
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onDeleteCourse(index: number) {
    (<UntypedFormArray>this.userForm.get('userCourses')).removeAt(index);
    // this.usersService
    //   .getAllTableParameters()
    //   .nonFilteredUsersTableData.find((user: Users) => user.userID === this.id)
    //   .userCourses.splice(index, 1);
  }

  onAddCourse() {
    (<UntypedFormArray>this.userForm.get('userCourses')).push(
      new UntypedFormGroup({
        courseName: new UntypedFormControl(null, Validators.required),
        measuredAT: new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        completedAT: new UntypedFormControl(null, Validators.required),
      })
    );
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let userID;
    let userName;
    let userStatus;
    let userAge;
    let userJob;
    let userCourses = new UntypedFormArray([]);

    if (this.editMode) {
      // const user = this.usersService.getUser(this.id);
      this.storeSub = this.store
        .select('users')
        .pipe(
          map((usersState) => {
            return usersState.tableParameters.nonFilteredUsersTableData.find(
              (user: Users) => {
                return user.userID === this.id;
              }
            );
          })
        )
        .subscribe((user) => {
          userID = user?.userID;
          userName = user?.userName;
          userStatus = user?.userStatus;
          userAge = user?.userAge;
          userJob = user?.userJob;
          if (user) {
            for (let course of user.userCourses) {
              userCourses.push(
                new UntypedFormGroup({
                  courseName: new UntypedFormControl(
                    course.courseName,
                    Validators.required
                  ),
                  measuredAT: new UntypedFormControl(course.measuredAT, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                  completedAT: new UntypedFormControl(
                    course.completedAT,
                    Validators.required
                  ),
                })
              );
            }
          }
        });
    } else {
      this.disableID = false;
    }

    this.userForm = new UntypedFormGroup({
      userID: new UntypedFormControl(userID, Validators.required),
      userName: new UntypedFormControl(userName, Validators.required),
      userStatus: new UntypedFormControl(userStatus, Validators.required),
      userAge: new UntypedFormControl(userAge, Validators.required),
      userJob: new UntypedFormControl(userJob, Validators.required),
      userCourses: userCourses,
    });
  }
}
