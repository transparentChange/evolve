import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../env-standin'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    async ngOnInit() {
        console.log("hello");
        await this.saveBookmarks();
    }

    async saveBookmarks() {
        // call api with
        const tree = await browser.bookmarks.getTree();
        let {dateAdded, title, url, children} = tree[0];

        let newTree: any = {dateAdded, title, url, children}
        newTree = this.extractFields(newTree);
        console.log(newTree);

        const postUrl = environment.lumenUrl + '/bookmarks';
        return this.http.post<any>(postUrl, {title: "second"}).subscribe(
        (data) => {
            console.log(data);
        },
        (error) => {
            console.log(error)
        });
    }

    extractFields(tree: any) {
        tree.children = tree.children.map((node: any) => {
            let {dateAdded, title, url, children} = node;
            if (children) {
                return this.extractFields({dateAdded, title, url, children});
            }
            return {dateAdded, title, url};
        });

        return tree;
    }

}
