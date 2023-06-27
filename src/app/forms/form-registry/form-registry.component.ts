import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-form-registry',
  templateUrl: './form-registry.component.html',
  styleUrls: ['./form-registry.component.scss']
})
export class FormRegistryComponent {
  registryForm = this.fb.group({
    username: '',
    password: '',
    password1: '',
    email: '',
    enabled: '',
    accountNonExpired: '',
    credentialsNonExpired: '',
    accountNonLocked: '',
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private coreService: CoreService,) {
  }

  public registry() {
    if (this.registryForm.valid) {
      if (this.registryForm.value.password == this.registryForm.value.password1) {
        this.userService.add(this.registryForm.value).subscribe({
          next: (res: any) => {
            this.registryForm.reset();
            const message = "Thêm thành công";
            this.coreService.openSnackBarLog(message);
          },
          error: (err: any) => {
            this.coreService.openSnackBarLog("Có lỗi");
          }
        });
      }
    }else{
      const message = "Mật khẩu nhập lại không khớp";
      this.coreService.openSnackBarLog(message);
    }
  }
}
