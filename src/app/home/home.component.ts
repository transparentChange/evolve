import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient, private s: AuthService) {
    }

    async ngOnInit() {
        console.log("hello");
        
        //this.s.login("matthew", "sk").subscribe;
        //await this.saveBookmarks();
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

        const putUrl = environment.lumenUrl + '/bookmarkTree';
        return this.http.put(putUrl, newTree, {responseType: "text"}).subscribe(
        (data) => {
            console.log(data);
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
