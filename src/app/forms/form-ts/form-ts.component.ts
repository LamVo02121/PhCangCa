import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';
import { TsService } from 'src/app/service/ts.service';

@Component({
  selector: 'app-form-ts',
  templateUrl: './form-ts.component.html',
  styleUrls: ['./form-ts.component.scss']
})
export class FormTsComponent {
  // addForm: FormGroup;
  addForm = this.fb.group({
    tenLoai: '',
    img: ''
  });

  fileImg: any;

  constructor(
    private fb: FormBuilder,
    private tsService: TsService,
    private dialog: MatDialogRef<FormTsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private snackBar: MatSnackBar,
    ) {
    
  }

  ngOnInit(): void {
    this.addForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.addForm.valid) {
      if (this.data) {
        if(this.fileImg != null){
          this.addForm.value.img = this.fileImg.name;
        }
          this.tsService
          .updateHangTs(this.data.id, this.addForm.value)
          .subscribe({
            next: (val: any) => {
              const message = "Cập nhật thành công";
              this.coreService.openSnackBar(message);
              this.dialog.close(true);
            },
            error: (err: any) => {
              alert(err);
            }
          });
      } else {
        this.addForm.value.img = this.fileImg.name;
        // console.log(this.fileImg);
        this.tsService.addTs(this.addForm.value).subscribe({
          next: (val: any) => {
            const message = "Thêm thành công";
            this.coreService.openSnackBar(message);
            this.dialog.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }
    }

  }

  uploadImg(event: any) {
    this.fileImg = event.target.files[0];
  }
}
