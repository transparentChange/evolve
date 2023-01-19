import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BookmarksStoreService } from '../items/bookmarksstore.service';
import { ViewService } from '../view/view.service';
import { Item } from './item/item.entity';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(public bookmarksStore: BookmarksStoreService, public viewService: ViewService) { }

  ngOnInit(): void {
    this.bookmarksStore.initBookmarks();
    //this.viewService.getBookmarks();
  }

}
