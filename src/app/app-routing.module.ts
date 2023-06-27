import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangTsComponent } from './hang-ts/hang-ts.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { PtComponent } from './pt/pt.component';
import { CangComponent } from './cang/cang.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { FormLoginComponent } from './forms/form-login/form-login.component';
import { RootComponent } from './root/root.component';
import { FormRegistryComponent } from './forms/form-registry/form-registry.component';
import { FileManageComponent } from './file-manage/file-manage.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'index', component: RootComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'hangTs', component: HangTsComponent },
      { path: 'phTien', component: PtComponent },
      { path: 'map', component: MapboxComponent },
      { path: 'cang', component: CangComponent },
      { path: 'fileSystem', component: FileManageComponent },
    
    ]
  },
  { path: 'login', component: FormLoginComponent, 
  
  },
  { path: 'registry', component: FormRegistryComponent, 

  },
  // { path: 'fileSystem', component: FileManageComponent, 

  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
