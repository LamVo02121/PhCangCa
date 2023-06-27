import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { FileMetaData } from '../model/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage) { }

  // save file to firestore
  saveMetaDataOfFile(fileObj: FileMetaData){
    const fileMeta = {
      id: '',
      name: fileObj.name,
      size: fileObj.size,
      url: fileObj.url,
    }
    fileMeta.id = this.fireStore.createId();
    this.fireStore.collection('/Upload').add(fileMeta);
  } 
  
  // show
  getAllFile(){
    return this.fireStore.collection('/Upload').snapshotChanges();

  }

  // delete
  deleteFile(fileMeta: FileMetaData){
    this.fireStore.collection('/Upload').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Upload/'+fileMeta.name).delete();
  }
}
