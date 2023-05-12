import { Component, OnInit } from '@angular/core';
import { BookmarksStoreService } from '../items/bookmarksstore.service';
import { BackgroundService } from './background.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor(private bookmarksStore: BookmarksStoreService, private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.bookmarksStore.initBookmarks();
    browser.pageAction.onClicked.addListener(this.backgroundService.handleClosed);
    browser.tabs.onUpdated.addListener(this.backgroundService.handleUpdated);
    browser.runtime.onMessage.addListener((data: any) => this.bookmarksStore.bookmarks = data);
    //browser.tabs.onRemoved.addListener(this.backgroundService.handleRemoved);
  }



}
