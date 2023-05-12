import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
import { AuthService } from '../auth/auth.service';
import { BookmarksStoreService } from '../items/bookmarksstore.service';
import { Item } from '../category/item/item.entity';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient, private s: AuthService, private bookmarksStore: BookmarksStoreService) {
    }

    async ngOnInit() {
        //this.s.login("matthew", "sk").subscribe;
        await this.saveBookmarks();
    }

    async saveBookmarks() {
        // call api with
        const tree = await browser.bookmarks.getTree();

        let {id, dateAdded, title, children} = tree[0];

        let newTree: any = {location: id, dateAdded, title, children}
        newTree = this.extractFields(newTree);
        console.log(newTree);
        newTree = this.flattenTree(newTree);
        console.log(newTree);

        const putUrl = "http://localhost:8080/lumen" + '/bookmarkTree';
        return this.http.put<Item[]>(putUrl, newTree).subscribe(
        (data: Item[]) => {
            console.log("data")
            console.log(data);
            const listVal = this.bookmarksStore.addAll(data);
            browser.runtime.sendMessage(listVal);
        },
        (error) => {
            console.log(error)
        });
    }

    extractFields(tree: any) {
        tree.children = tree.children.map((node: any) => {
            let {id, dateAdded, title, url, children} = node;
            if (children) {
                return this.extractFields({location: id, dateAdded, title, children});
            }
            return {dateAdded, title, url};
        });

        return tree;
    }

    // TODO: assign ids to nodes to fully describe tree
    flattenTree(tree: any): any[] {
        if (tree.url) {
            return [tree];
        }

        let arr: any[] = [];
        if (tree.children) {
            for (let child of tree.children) {
                arr = arr.concat(this.flattenTree(child));
            }
        }
        return arr;
    }

}
