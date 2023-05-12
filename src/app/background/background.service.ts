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

  handleClosed = (tabInfo: browser.tabs.Tab) => {
    this.handleUpdated(tabInfo.id!, null, tabInfo, Status.COMPLETED);
    browser.tabs.query({
      currentWindow: true,
      active: true,
    }).then((tabs) => {
      for (const tab of tabs) {
        browser.tabs.remove(tab.id!);
      }
    });
  }


  handleUpdated = (tabId: number, changeInfo: any, tabInfo: browser.tabs.Tab, status: Status = Status.VISITED) => {
    const id = this.bookmarksStore.getId(tabInfo.url!);
    console.log(id);
    console.log(tabInfo.url);
    if (id) {
      const url = `http://localhost:8080/lumen/setStatus/${id}`;
      this.http.put<any>(url, status).subscribe((data: Item) => {
        browser.tabs.query({
          currentWindow: true,
          url: "moz-extension://*/*"
        }).then((tabs) => {
          for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id!, data);
          }
        });
      });
    }
  }
}
