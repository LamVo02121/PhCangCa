import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PtService } from '../service/pt.service';
import { CoreService } from '../core/core.service';
import { FormPtComponent } from '../forms/form-pt/form-pt.component';

@Component({
  selector: 'app-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.scss']
})
export class PtComponent {
  color = "#77B72D";
  color2 = "#4D8649";
  w = "#fff";
  text="center";
  displayedColumns: string[] = ['id', 'tenPT', 'soHieuPT', 'id_LT',  'congSuat', 'trongTai', 'sucChua', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog, 
    private ptService: PtService,
    private coreService: CoreService,
  ){
    
  }
    
  ngOnInit(): void {
    this.getList(); 
  }

  openAddForm(){
    const dialogRef = this.dialog.open(FormPtComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getList();
        }
      }
    });
    
  }

  getList(){
    this.ptService.getListTs().subscribe({
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
    this.ptService.deleteHangTs(id).subscribe({
      next: (res) => {
        const message =  "Đã xóa";
        // this.coreService.openSnackBar(message, 'done');
        this.coreService.openSnackBar(message);
        this.getList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any){
    const dialogRef = this.dialog.open(FormPtComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getList();
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
