import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../category/item/item.entity';

@Injectable()
export class BookmarksStoreService {
  constructor(private http: HttpClient) { }
  
  private readonly _bookmarks = new BehaviorSubject<Item[]>([]);

  readonly bookmarks$ = this._bookmarks.asObservable();

  get bookmarks(): Item[] {
    return this._bookmarks.getValue();
  }

  private set bookmarks(val: Item[]) {
    this._bookmarks.next(val);
  }

  initBookmarks() {
    const url = "http://localhost:8080/lumen" + "/bookmarks";
    this.http.get<Item[]>(url).subscribe(data => {
      this.bookmarks = data;
    });
  }

  getId(url: string) {
    console.log(this.bookmarks);
    console.log(url);
    const bookmark = this.bookmarks.find(b => b.url == url);
    return bookmark ? bookmark.id : bookmark;
  }


}
