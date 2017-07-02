import { Component, OnInit } from '@angular/core';
import { Tag } from '../../models/tag';
import { TagsService } from '../../services/tags.service';
declare var $: any;
@Component({
    selector: 'tag-list-cmp',
    moduleId: module.id,
    templateUrl: 'tag-list.component.html',
    providers: [TagsService]
})

export class TagListComponent implements OnInit {
    model: Tag[];
    showDialog: boolean;
    objDelete: Tag;
    constructor(private dataService: TagsService) {
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
