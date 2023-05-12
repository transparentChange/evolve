import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../category/item/item.entity';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class BookmarksStoreService {
  constructor(private http: HttpClient) { 
  }
  
  private readonly _bookmarks = new BehaviorSubject<Item[]>([]);

  readonly bookmarks$ = this._bookmarks.asObservable();

  get bookmarks(): Item[] {
    return this._bookmarks.getValue();
  }

  set bookmarks(val: Item[]) {
    this._bookmarks.next(val);
  }

  initBookmarks() {  
    const url = "http://localhost:8080/lumen" + "/bookmarks";
    this.http.get<Item[]>(url).subscribe(data => {
      this.bookmarks = data;   
    });
  }

  update(newItem: Item) { 
    const listVal = this._bookmarks.getValue();
    const ind = listVal.findIndex(item => item.id == newItem.id);
    listVal[ind] = newItem;
    this.bookmarks = listVal;
  }

  addAll(newItems: Item[]) {
    let listVal = this._bookmarks.getValue();
    let itemsMap = new Map<number, Item>();
    for (const item of newItems) {
      itemsMap.set(item.id, item)
    }
    listVal.forEach((item: Item) => {
      if (itemsMap.has(item.id)) {
        itemsMap.delete(item.id); // ignore existing items
      }
    })
    for (const [id, item] of itemsMap) {
      listVal.push(item);
    }
    this.bookmarks = listVal;
    return listVal;
  }

  drop(event: any) {
    const url = `http://localhost:8080/lumen/move/${event.previousIndex}/${event.currentIndex}`;
    this.http.put<Item[]>(url, null).subscribe();
    moveItemInArray(this.bookmarks, event.previousIndex, event.currentIndex);
  }

  getId(url: string) {
    console.log(this.bookmarks);
    const bookmark = this.bookmarks.find(b => b.url == url);
    return bookmark ? bookmark.id : bookmark;
  }


}
