import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Tag } from '../../models/tag';
import { TagsService } from '../../services/tags.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Select2OptionData } from 'ng2-select2/ng2-select2';
import { Cookie } from "ng2-cookies/ng2-cookies";
declare var $: any;
@Component({
    selector: 'tag-detail-cmp',
    moduleId: module.id,
    templateUrl: 'tag-detail.component.html',
    providers: [TagsService]
})

export class TagDetailComponent implements OnInit{
    model: Tag;
    modelForm: FormGroup;
    submitted = false;
    actionName = "Create";
    tags: Select2OptionData[];
    user:string;
    constructor(
        private dataService: TagsService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder
    ) { }

    onSubmit() {
        this.model = this.modelForm.value;
        this.model.subscriberId = this.user;
        this.save();
    }

    ngOnInit(): void {
        this.user = Cookie.get('userId');
        this.getTags();
        this.route.params.switchMap((params: Params) => {
            if (params['id'] == 'Add') {
   
                return Observable.of(new Tag());
                } else {
                return this.dataService.getOne(params['id'])
                }
            })
            .subscribe(data =>
            {
                this.model = data;
                this.buildForm();
            });

    }

    getTags() {
        this.dataService.getAll().subscribe(tags => this.tags = tags.map(tag => {
            return {
                id: tag.id,
                text: tag.name,

            }
        }));
    }

    buildForm(): void {
        this.modelForm = this.fb.group({
            'id': [this.model.id],
            'name': [this.model.name, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50)
                ]
            ],
            'parentId': [this.model.parentId]
        });

        this.modelForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    public changed(e: any): void {
        this.modelForm.patchValue({ parentId: e.value }); 
    }

    onValueChanged(data?: any) {
        if (!this.modelForm) { return; }
        const form = this.modelForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }


    formErrors = {
        'name': '',
        'parentId':''
    };

    validationMessages = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        }
    };


    save(): void {
        if (this.model.id == undefined) {
            this.dataService.create(this.model)
                .subscribe(() => {
                    this.handleSuccess();
                    this.goBack();
                },
                (error) => {
                    this.handleError(error);
                });
        } else {
   
            this.dataService.edit(this.model)
                .subscribe(
                    () => {
                        this.handleSuccess();
                        this.goBack();
                    },
                    (error) => {
                        this.handleError(error);
                    }
                );
        }

    }

    goBack(): void {
        this.location.back();
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
            message: "Data was successfully saved"

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
