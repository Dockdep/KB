import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticlesService } from '../../services/articles.service';
declare var $: any;
@Component({
    selector: 'article-list-cmp',
    moduleId: module.id,
    templateUrl: 'article-list.component.html',
    providers: [ArticlesService]
})

export class ArticleListComponent implements OnInit {
    model: Article[];
    showDialog: boolean;
    objDelete: Article;
    constructor(private dataService: ArticlesService) {
    }

    ngOnInit() {
        this.bindGrid();
    }
    bindGrid() {

        this.dataService.getAll().subscribe(data => this.model = data)
    }

    confirmDelete() {
        this.showDialog = false;
        this.delete(this.objDelete);
    }

    delete(item) {
        this.dataService.delete(item.id).subscribe(
            () => {
                this.handleSuccess();
                this.bindGrid();
            },
            (error) => {
                this.handleError(error);
            }
        );
    }

    private handleError(error: any): Promise<any> {

        $.notify({
            icon: "notifications",
            message: "An error occurred", error

        }, {
                type: 'danger',
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
        return Promise.reject(error.message || error);
    }


    private handleSuccess(): any {

        $.notify({
            icon: "notifications",
            message: "Data was successfully deleted"

        }, {
                type: 'success',
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

    }

}
