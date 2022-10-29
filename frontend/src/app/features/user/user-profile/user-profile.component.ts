import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@app/services/user.service';
import {GlobalConstants} from '@app/shared/global-constants';
import {ManageImageService} from '@app/services/manage-image.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  readonly DEFAULT_IMAGE = 'assets/img/images.png';
  id: any;
  user: any = {};
  changePasswordForm: FormGroup;
  editUserForm: FormGroup;

  uploadImageForm: FormGroup;
  imageIsChanged$ = new BehaviorSubject<boolean>(false);
  imageSource$ = new BehaviorSubject<any>(this.DEFAULT_IMAGE);
  disableDeleteImage$ = new BehaviorSubject<boolean>(true);

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private manageImageService: ManageImageService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id)
      .subscribe(value => {
        this.user = value;
        if (typeof this.user.image === 'string' && this.user.image.length > 0) {
          this.imageSource$.next(this.user.image);
          this.disableDeleteImage$.next(false);
        }
      });

    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])\S{6,12}$/)]],
        reNewPassword: [null, [Validators.required]],
      },
      {
        validators: this.mustMatch('newPassword', 'reNewPassword')
      }
    );

    this.editUserForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      lastName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(GlobalConstants.phoneRegex)]],
      username: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
    });

    this.uploadImageForm = this.formBuilder.group({
      image: ['']
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  updateUser() {
    console.log('user : ', this.user);
    this.userService.updateUser(this.user)
      .subscribe(value => {
          console.log('data : ', value);
        }
      );
  }

  changePassword() {
    console.log('user : ', this.user);
    this.userService.changePassword(this.user)
      .subscribe(value => {
          this.changePasswordForm.reset();
        }
      );
  }

  uploadImage() {
    this.manageImageService.uploadImage(this.user, this.uploadImageForm.value.image)
      .subscribe(value => {
        this.imageIsChanged$.next(false);
        this.disableDeleteImage$.next(false);
        console.log('response : ', value);
      });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      input.value = '';
      this.imageSource$.next((event.target as any).result);
    };
    reader.readAsDataURL(file);
    this.uploadImageForm.patchValue({image: file});
    this.uploadImageForm.updateValueAndValidity();
    this.imageIsChanged$.next(true);
  }

  deleteImage(id: any) {
    this.manageImageService.deleteImage(id)
      .subscribe(value => {
          this.imageSource$.next(this.DEFAULT_IMAGE);
          this.disableDeleteImage$.next(true);
        }
      );
  }

}
