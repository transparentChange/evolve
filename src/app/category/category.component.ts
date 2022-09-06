import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from './item/item.entity';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  data: Item[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url = environment.lumenUrl + "/bookmarks";
    this.http.get<Item[]>(url).subscribe(data => {
      this.data = data;
    });
  }

}
