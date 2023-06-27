import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { FormCgcaComponent } from '../forms/form-cgca/form-cgca.component';
import { CgcaService } from '../service/cgca.service';

@Component({
  selector: 'app-cang',
  templateUrl: './cang.component.html',
  styleUrls: ['./cang.component.scss']
})
export class CangComponent {
  public get dialog(): MatDialog {
    return this._dialog;
  }
  public set dialog(value: MatDialog) {
    this._dialog = value;
  }
  color = "#77B72D";
  color2 = "#4D8649";
  w = "#fff";
  text="center";
  displayedColumns: string[] = ['id', 'tenCang', 'loai','description', 'diaChi' , 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _dialog: MatDialog, 
    private cgService: CgcaService,
    private coreService: CoreService,
  ){
    
  }
    
  ngOnInit(): void {
    this.getListTs(); 
    console.log(this.getListTs())
  }

  openAddForm(){
    const dialogRef = this.dialog.open(FormCgcaComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getListTs();
        }
      }
    });
    
  }

  getListTs(){
    this.cgService.getList().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource);
      },
      error: console.log,
    })
  }

  delete(id: number){
    this.cgService.delete(id).subscribe({
      next: (res) => {
        const message =  "Đã xóa";
        // this.coreService.openSnackBar(message, 'done');
        this.coreService.openSnackBar(message);
        this.getListTs();
      },
      error: console.log,
    })
  }

  openEditForm(data: any){
    const dialogRef = this.dialog.open(FormCgcaComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getListTs();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
