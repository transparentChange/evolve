import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    this.itemData.shortUrl = this.itemData.url.slice(slashInd + 2);

    const newInd = this.itemData.shortUrl.indexOf("/");
    this.itemData.favicon = this.itemData.shortUrl.slice(0, newInd) + "/favicon.ico";
    console.log(this.itemData);
  }

  onStatusChange(newStatus: string) {
    console.log(newStatus);
    const url = `${environment.lumenUrl}/setStatus/${this.itemData.id}`;
    console.log(url);
    this.http.put<any>(url, newStatus).subscribe(bookmark => {
      this.itemData = bookmark;
    });
  }

}
