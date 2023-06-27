import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageComponent } from './message/message.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { HangTsComponent } from './hang-ts/hang-ts.component';
import { PtComponent } from './pt/pt.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { FormsModule } from '@angular/forms';
import { FormPtComponent } from './forms/form-pt/form-pt.component';
import { FormTsComponent } from './forms/form-ts/form-ts.component';
import { FormCgcaComponent } from './forms/form-cgca/form-cgca.component';
import { CangComponent } from './cang/cang.component';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import { TestComponent } from './test/test.component';
import { FormLoginComponent } from './forms/form-login/form-login.component';
import { RootComponent } from './root/root.component';
import { FormRegistryComponent } from './forms/form-registry/form-registry.component';
import { FileManageComponent } from './file-manage/file-manage.component';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FormTsComponent,
    MessageComponent,
    HangTsComponent,
    PtComponent,
    MapboxComponent,
    FormPtComponent,
    FormCgcaComponent,
    FormLoginComponent,
    CangComponent,
    HomeComponent,
    TestComponent,
    FormLoginComponent,
    RootComponent,
    FormRegistryComponent,
    FileManageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTreeModule,
    MatSelectModule,
    

    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
