import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  items?: Item[];
  productSubscription?: Subscription

  private readonly messageListener:
  (message: any) => void;


  constructor(public bookmarksStore: BookmarksStoreService, public viewService: ViewService, private cd: ChangeDetectorRef) { 
    this.messageListener = this.bookmarksStore.update.bind(this.bookmarksStore);
  }

  ngOnInit(): void {
    browser.runtime.onMessage.addListener(this.messageListener);
    this.bookmarksStore.bookmarks$.subscribe((data: Item[]) => { this.items = data; this.cd.detectChanges()},
     (error) => console.log("error"),
     () => console.log("completed"));
     this.bookmarksStore.initBookmarks();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
