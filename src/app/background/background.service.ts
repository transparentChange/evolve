import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, Status } from '../category/item/item.entity';
import { BookmarksStoreService } from '../items/bookmarksstore.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private tabMap: Map<number, Set<number>>;

  constructor(private bookmarksStore: BookmarksStoreService, 
    // private viewService: ViewService,
    private http: HttpClient) { 
    this.tabMap = new Map<number, Set<number>>(); // update to Set<pair<number, statusStr>>
  }

  handleClose = (tab: browser.tabs.Tab) => {
    browser.tabs.remove(tab.id!);
    const id = this.bookmarksStore.getId(tab.url!);
    const url = `http://localhost:8080/lumen/setStatus/${id}`;
    this.http.put<any>(url, Status.COMPLETED).subscribe();
  }


  handleUpdated = (tabId: number, changeInfo: any, tabInfo: browser.tabs.Tab) => {
    const id = this.bookmarksStore.getId(tabInfo.url!);
    if (id) {
      const url = `http://localhost:8080/lumen/setStatus/${id}`;
      this.http.put<any>(url, Status.VISITED).subscribe((data: Item) => {
      browser.tabs.query({
        currentWindow: true,
        active: true,
      }).then((tabs) => {
        for (const tab of tabs) {
          browser.tabs.sendMessage(tab.id!, data);
        }
      })     
      });
    }
  }
}
