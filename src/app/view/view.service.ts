import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../category/item/item.entity';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  data: Item[] = [];

  constructor(private http: HttpClient) { }

  getBookmarks() {
    const url = "http://localhost:8080/lumen" + "/bookmarks";
    this.http.get<Item[]>(url).subscribe(data => {
      console.log(this.data);
      this.data = data;
    });
  }
}
