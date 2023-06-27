import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
interface category{
  name: string;
  component: string;
  children?: category[];
}

const TREE_DATA: category[] = [
  {
    name: 'Danh mục',
    component: 'expand_more',
    children: [
      {name: 'Danh mục hàng thủy sản', component: 'hangTs'}, 
      {name: 'Quản lý mức thu phí', component: ''}, 
      {name: 'Quản lý phương tiện', component: 'phTien'},
      {name: 'Quản lý chủ phương tiện', component: ''},
      {name: 'Đăng ký tàu cá cập cảng', component: ''},
      {name: 'Giám sát tàu cá', component: ''},
      {name: 'Kiểm tra tàu cá rời cảng', component: ''},
      {name: 'Thu phí tàu cá cập cảng', component: ''},
      {name: 'Cấp biên nhận thủy sản bốc dỡ qua cảng', component: ''},
      {name: 'Xác nhận khối lượng còn lại', component: ''},
      {name: 'Thu phí ô cầu tàu và mặt khác', component: ''},
      {name: 'Quản lí cảng cá', component: 'cang'},
    ]  
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  component: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  title = 'PhCangCa';

  isOpen = true;
  nameHead = 'Trang chủ';
  nameBread = '';
  username = '';
  showAccount = false;
  isHovered = false;
  isHovered1 = false;

  constructor(
    private route: ActivatedRoute,
  ){
    // tree
    this.dataSourceTree.data = TREE_DATA;
  }

  
  // tree
  private transformer = (node: category, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      component: node.component,
    };
  };



  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSourceTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  // 
  
    
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      // console.log(data); 
      this.username = data.name;
    });
  }

  action(head: string, bread: string){
    this.nameHead = head;
    this.nameBread = bread;
  }
}
