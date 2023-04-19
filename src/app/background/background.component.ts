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

  ngOnInit(): void {
    console.log("what");
    this.bookmarksStore.initBookmarks();
    browser.tabs.onUpdated.addListener(this.backgroundService.handleUpdated);
    browser.tabs.onRemoved.addListener(this.backgroundService.handleRemoved);
  }



}
