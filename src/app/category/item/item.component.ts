import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from './item.entity';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const slashInd = this.itemData.url.indexOf("/");
    const urlPart = this.itemData.url.slice(slashInd + 2);

    const newInd = urlPart.indexOf("/");
    //this.itemData.favicon = this.itemData.shortUrl.slice(0, newInd) + "/favicon.ico";

    //this.itemData.favicon = this.itemData.url.slice(0, newInd + slashInd + 3) + "/favicon.ico";
    this.itemData.favicon =  `http://www.google.com/s2/favicons?domain=${this.itemData.url}`;
    console.log(this.itemData);
  }

  onStatusChange(newStatus: string) {
    console.log(newStatus);
    const url = `http://localhost:8080/lumen/setStatus/${this.itemData.id}`;
    console.log(url);
    let e = Status.VISITED;
    if (newStatus == 'COMPLETED') {
      e = Status.COMPLETED;
    }
    this.http.put<any>(url, e).subscribe(bookmark => {
      this.itemData = bookmark;
    });
  }

  get statuses() { return Status; }

}
