import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../category/item/item.entity';
import { BookmarksStoreService } from '../items/bookmarksstore.service';
import { ViewService } from '../view/view.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private tabMap: Map<number, Set<number>>;

  constructor(private bookmarksStore: BookmarksStoreService, 
    private viewService: ViewService,
    private http: HttpClient) { 
    this.tabMap = new Map<number, Set<number>>(); // update to Set<pair<number, statusStr>>
  }

  handleUpdated = (tabId: number, changeInfo: any, tabInfo: browser.tabs.Tab) => {
    if (tabInfo.url) { 
      const id = this.bookmarksStore.getId(tabInfo.url);
      if (id && !this.tabMap.has(tabId)) {
        this.tabMap.set(tabId, new Set<number>());
      }
      if (id) {
        this.tabMap.get(tabId)?.add(id);  
      }
      console.log(id);
      console.log(this.tabMap);
    }
  }

  handleRemoved = (tabId: number, removeInfo: any) => {
    const ids: Set<number> = this.tabMap.get(tabId)!;
    for (const id of ids) {
      const url = `http://localhost:8080/lumen/setStatus/${id}`;
      let e = Status.COMPLETED;
      this.http.put<any>(url, e).subscribe();
    }
  }
}
