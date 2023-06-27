import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TsService } from '../service/ts.service';
import { CoreService } from '../core/core.service';
import { FormTsComponent } from '../forms/form-ts/form-ts.component';

@Component({
  selector: 'app-hang-ts',
  templateUrl: './hang-ts.component.html',
  styleUrls: ['./hang-ts.component.scss']
})
export class HangTsComponent {
  color = "#77B72D";
  color2 = "#4D8649";
  w = "#fff";
  text="center";
  displayedColumns: string[] = ['id', 'tenLoai', 'img', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private dialog: MatDialog, 
    private tsService: TsService,
    private coreService: CoreService,
  ){
    
  }
    
  ngOnInit(): void {
    this.getListTs(); 
  }

  openAddTsForm(){
    const dialogRef = this.dialog.open(FormTsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getListTs();
        }
      }
    });
    
  }

  getListTs(){
    this.tsService.getListTs().subscribe({
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
    this.tsService.deleteHangTs(id).subscribe({
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
    const dialogRef = this.dialog.open(FormTsComponent,{
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
