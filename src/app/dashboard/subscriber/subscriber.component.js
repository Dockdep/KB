"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var Competitor_1 = require("../../models/Competitor");
var competitors_service_1 = require("../../services/competitors.service");
var forms_1 = require("@angular/forms");
var projects_service_1 = require("../../services/projects.service");
var CompetitorDetailComponent = (function () {
    function CompetitorDetailComponent(dataService, projectsService, route, location, fb) {
        this.dataService = dataService;
        this.projectsService = projectsService;
        this.route = route;
        this.location = location;
        this.fb = fb;
        this.submitted = false;
        this.actionName = "Create";
        this.formErrors = {
            'Name': '',
            'Url': '',
            'ProjectId': '',
        };
        this.validationMessages = {
            'Name': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
            },
            'Url': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
            },
            'ProjectId': {
                'required': 'Name is required.',
            }
        };
    }
    CompetitorDetailComponent.prototype.onSubmit = function () {
        this.model = this.modelForm.value;
        this.save();
    };
    CompetitorDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProjects();
        this.route.params.switchMap(function (params) {
            if (params['id'] == 'add') {
                return Observable_1.Observable.of(new Competitor_1.Competitor());
            }
            else {
                return _this.dataService.getOne(+params['id']);
            }
        })
            .subscribe(function (project) {
            _this.model = project;
            _this.buildForm();
        });
    };
    CompetitorDetailComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectsService.getAll().subscribe(function (projects) { return _this.projects = projects.map(function (project) {
            return {
                id: project.Id.toString(),
                text: project.Name,
            };
        }); });
    };
    CompetitorDetailComponent.prototype.buildForm = function () {
        var _this = this;
        this.modelForm = this.fb.group({
            'Id': [this.model.Id],
            'Name': [this.model.Name, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24)
                ]
            ],
            'Url': [this.model.Url, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24)
                ]],
            'ProjectId': [this.model.ProjectId, [
                    forms_1.Validators.required
                ]],
        });
        this.modelForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    CompetitorDetailComponent.prototype.onValueChanged = function (data) {
        if (!this.modelForm) {
            return;
        }
        var form = this.modelForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    CompetitorDetailComponent.prototype.changed = function (e) {
        this.modelForm.patchValue({ ProjectId: +e.value });
    };
    CompetitorDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.model.Id == undefined) {
            this.dataService.create(this.model)
                .subscribe(function () {
                _this.handleSuccess();
                _this.goBack();
            }, function (error) {
                _this.handleError(error);
            });
        }
        else {
            this.dataService.edit(this.model)
                .subscribe(function () {
                _this.handleSuccess();
                _this.goBack();
            }, function (error) {
                _this.handleError(error);
            });
        }
    };
    CompetitorDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    CompetitorDetailComponent.prototype.handleError = function (error) {
        $.notify({
            icon: "notifications",
            message: "An error occurred", error: error
        }, {
            type: 'danger',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
        return Promise.reject(error.message || error);
    };
    CompetitorDetailComponent.prototype.handleSuccess = function () {
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
    };
    return CompetitorDetailComponent;
}());
CompetitorDetailComponent = __decorate([
    core_1.Component({
        selector: 'competitor-detail-cmp',
        moduleId: module.id,
        templateUrl: 'competitor-detail.component.html',
        providers: [competitors_service_1.CompetitorsService, projects_service_1.ProjectsService]
    }),
    __metadata("design:paramtypes", [competitors_service_1.CompetitorsService,
        projects_service_1.ProjectsService,
        router_1.ActivatedRoute,
        common_1.Location,
        forms_1.FormBuilder])
], CompetitorDetailComponent);
exports.CompetitorDetailComponent = CompetitorDetailComponent;
//# sourceMappingURL=competitor-detail.component.js.map