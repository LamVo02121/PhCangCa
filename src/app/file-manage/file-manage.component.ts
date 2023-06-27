import { Component, OnInit } from '@angular/core';
import { FileMetaData } from '../model/file-meta-data';
import { FileService } from '../service/file.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.scss']
})
export class FileManageComponent implements OnInit {
  selectedFile!: FileList;
  currentFileUpload!: FileMetaData;
  percent = 0;

  listOfFile: FileMetaData[] = [];

  constructor(
    private fileService: FileService,
    private fireStorage: AngularFireStorage
  ) {

  }
  ngOnInit(): void {
    // console.log("vsdvsd")
    this.getAllFile();
  }

  selectFile(event: any) {
    this.selectedFile = event.target.files;
  }

  uploadFile() {
    this.currentFileUpload = new FileMetaData(this.selectedFile[0]);
    const path = 'Upload/' + this.currentFileUpload.file.name;

    // console.log(this.currentFileUpload.file.name)
    const checkname = this.listOfFile.find(item => item.name == this.currentFileUpload.file.name)
    if (!checkname) {
      const storageRef = this.fireStorage.ref(path);
      const uploadTask = storageRef.put(this.selectedFile[0]);

      uploadTask.snapshotChanges().pipe(finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadLink => {
          this.currentFileUpload.url = downloadLink;
          this.currentFileUpload.size = this.currentFileUpload.file.size;
          this.currentFileUpload.name = this.currentFileUpload.file.name;

          this.fileService.saveMetaDataOfFile(this.currentFileUpload);
          this.getAllFile();
        })
      })).subscribe((res: any) => {
        // console.log(res)
        this.percent = (res.bytesTransferred * 100 / res.totalBytes);
      }, err => {
        console.log(err);
      })
    }
  else 
    alert("File đã tồn tại");  
  }

  getAllFile() {
    this.fileService.getAllFile().subscribe(res => {
      // console.log(res[0].payload.doc.data().)
      this.listOfFile = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      return res;
    }, err => {
      console.log(err);
    })
  }

  deleteFile(file: FileMetaData) {
    if (window.confirm('Bạn có chắc muốn xóa ' + file.name + ' ?')) {
      this.fileService.deleteFile(file);
      this.getAllFile();
    }

  }


}
