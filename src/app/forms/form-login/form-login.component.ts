import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent{
  loginForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private coreService: CoreService,
    ){
      this.loginForm = this.fb.group({
        username: '',
        password: '',
        email: '',
        enabled: '',
        accountNonExpired: '',
        credentialsNonExpired: '',
        accountNonLocked: '',
      });
  }

  public login() {
    if (this.loginForm.valid) { 
        this.userService
          .valid(this.loginForm.value)
          .subscribe(res => {
              if(res.status){
                this.coreService.openSnackBar(res.message);
                console.log(res) 
                this.router.navigate(['index', {name: this.loginForm.value.username}])
                this.loginForm.reset();
              }else{
                this.coreService.openSnackBarLog(res.message);
              }
              
            },err => {
              this.coreService.openSnackBarLog("Tên đăng nhập không tồn tại"); 
          });
      }
    }
}
