import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../category/item/item.entity';
import { BookmarksStoreService } from '../items/bookmarksstore.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  items?: Item[];

  constructor(public bookmarksStore: BookmarksStoreService) { 

    
    
    //this.viewService.getBookmarks();
  }
  /*
  getBookmarks() {
    const url = "http://localhost:8080/lumen" + "/bookmarks";
    this.http.get<Item[]>(url).subscribe(data => {
      console.log(this.data);
      this.data = data;
    });
  }*/
}
