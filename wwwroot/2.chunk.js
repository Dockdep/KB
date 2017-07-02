webpackJsonp([2],{

/***/ "../../../../../src/app/dashboard/tag/tag-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"modelForm\" class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header\" data-background-color=\"red\">\r\n                <h4 class=\"title\">Edit Tag</h4>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"modelForm\" (ngSubmit)=\"onSubmit()\">\r\n           \r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n              \r\n                  \r\n                            <div class=\"form-group form-black label-floating\">\r\n                                <label class=\"control-label\">Name</label>\r\n\r\n                                <input formControlName=\"name\" type=\"text\" class=\"form-control\" >\r\n                            \r\n                            </div>\r\n                            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\r\n                                {{ formErrors.name }}\r\n                            </div>\r\n               \r\n                          <div *ngIf=\"tags\" class=\"form-group form-black label-floating\">\r\n                            <label class=\"control-label\">Parent Tag</label>\r\n\r\n                            <select2 [value]=\"modelForm.value.parentId\" (valueChanged)=\"changed($event)\" [data]=\"tags\"></select2>\r\n\r\n                          </div>\r\n          \r\n\r\n                        </div>\r\n                    </div>\r\n     \r\n  \r\n                    <p class=\"btn btn-danger pull-right\" (click)=\"goBack()\">Back</p>\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!modelForm.valid\">Submit</button>\r\n\r\n\r\n                    <div class=\"clearfix\"></div>\r\n                </form>        \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_tag__ = __webpack_require__("../../../../../src/app/models/tag.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_tags_service__ = __webpack_require__("../../../../../src/app/services/tags.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_cookies_ng2_cookies__ = __webpack_require__("../../../../ng2-cookies/ng2-cookies.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_cookies_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_cookies_ng2_cookies__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TagDetailComponent = (function () {
    function TagDetailComponent(dataService, route, location, fb) {
        this.dataService = dataService;
        this.route = route;
        this.location = location;
        this.fb = fb;
        this.submitted = false;
        this.actionName = "Create";
        this.formErrors = {
            'name': '',
            'parentId': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
            }
        };
    }
    TagDetailComponent.prototype.onSubmit = function () {
        this.model = this.modelForm.value;
        this.model.subscriberId = this.user;
        this.save();
    };
    TagDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = __WEBPACK_IMPORTED_MODULE_9_ng2_cookies_ng2_cookies__["Cookie"].get('userId');
        this.getTags();
        this.route.params.switchMap(function (params) {
            if (params['id'] == 'Add') {
                return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(new __WEBPACK_IMPORTED_MODULE_6__models_tag__["a" /* Tag */]());
            }
            else {
                return _this.dataService.getOne(params['id']);
            }
        })
            .subscribe(function (data) {
            _this.model = data;
            _this.buildForm();
        });
    };
    TagDetailComponent.prototype.getTags = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (tags) { return _this.tags = tags.map(function (tag) {
            return {
                id: tag.id,
                text: tag.name,
            };
        }); });
    };
    TagDetailComponent.prototype.buildForm = function () {
        var _this = this;
        this.modelForm = this.fb.group({
            'id': [this.model.id],
            'name': [this.model.name, [
                    __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* Validators */].minLength(4),
                    __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* Validators */].maxLength(50)
                ]
            ],
            'parentId': [this.model.parentId]
        });
        this.modelForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    TagDetailComponent.prototype.changed = function (e) {
        this.modelForm.patchValue({ parentId: e.value });
    };
    TagDetailComponent.prototype.onValueChanged = function (data) {
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
    TagDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.model.id == undefined) {
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
    TagDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    TagDetailComponent.prototype.handleError = function (error) {
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
    TagDetailComponent.prototype.handleSuccess = function () {
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
    return TagDetailComponent;
}());
TagDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'tag-detail-cmp',
        template: __webpack_require__("../../../../../src/app/dashboard/tag/tag-detail.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_7__services_tags_service__["a" /* TagsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__services_tags_service__["a" /* TagsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_tags_service__["a" /* TagsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* Location */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* FormBuilder */]) === "function" && _d || Object])
], TagDetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=tag-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2> Tag </h2>\r\n<p>\r\n  <a [routerLink]=\"['Add']\" class=\"btn btn-primary\"> Add</a>\r\n</p>\r\n\r\n\r\n<!--issue : Not variables properly used as per standard like i should put Yes/No buttons\r\n in modalpopup component and that component should return me yes/no as output-->\r\n<modal-popup [(visible)]=\"showDialog\" title=\"Confirm\">\r\n  Are you Sure?\r\n  <hr>\r\n  <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"confirmDelete()\">Yes</button>\r\n  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"showDialog = false\">No</button>\r\n\r\n</modal-popup>\r\n\r\n<table class=\"table table-bordered\">\r\n  <thead>\r\n    <tr>\r\n      <th>id</th>\r\n      <th>name</th>\r\n      <th>Parent Tag</th>\r\n      <th>Edit</th>\r\n      <th>Delete</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let item of model\">\r\n      <td>{{item.id}}</td>\r\n      <td>{{item.name}}</td>\r\n      <td>{{item.parentId}}</td>\r\n      <td>\r\n        <a [routerLink]=\"['Edit', {id:item.id}]\">\r\n\r\n          <i class=\"glyphicon glyphicon-edit\"></i>\r\n        </a>\r\n      </td>\r\n      <td>\r\n        <!--<i (click)=\"deleteMaterial(material)\" class=\"glyphicon glyphicon-remove\"></i>-->\r\n        <!--assign material to object used for delete and \"showDialog\" to true which emits visible of Modal popup-->\r\n        <i (click)=\"showDialog=true; objDelete=item\"\r\n           class=\"glyphicon glyphicon-remove\" style=\"cursor:pointer\"></i>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tags_service__ = __webpack_require__("../../../../../src/app/services/tags.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TagListComponent = (function () {
    function TagListComponent(dataService) {
        this.dataService = dataService;
    }
    TagListComponent.prototype.ngOnInit = function () {
        this.bindGrid();
    };
    TagListComponent.prototype.bindGrid = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (data) { return _this.model = data; });
    };
    TagListComponent.prototype.confirmDelete = function () {
        this.showDialog = false;
        this.delete(this.objDelete);
    };
    TagListComponent.prototype.delete = function (item) {
        var _this = this;
        this.dataService.delete(item.id).subscribe(function () {
            _this.handleSuccess();
            _this.bindGrid();
        }, function (error) {
            _this.handleError(error);
        });
    };
    TagListComponent.prototype.handleError = function (error) {
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
    TagListComponent.prototype.handleSuccess = function () {
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
    };
    return TagListComponent;
}());
TagListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'tag-list-cmp',
        template: __webpack_require__("../../../../../src/app/dashboard/tag/tag-list.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_tags_service__["a" /* TagsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_tags_service__["a" /* TagsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_tags_service__["a" /* TagsService */]) === "function" && _a || Object])
], TagListComponent);

var _a;
//# sourceMappingURL=tag-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag_list_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_detail_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tag_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var dataRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__tag_component__["a" /* TagComponent */],
        children: [
            {
                path: '',
                children: [
                    {
                        path: ':id',
                        component: __WEBPACK_IMPORTED_MODULE_3__tag_detail_component__["a" /* TagDetailComponent */]
                    },
                    {
                        path: 'add',
                        component: __WEBPACK_IMPORTED_MODULE_3__tag_detail_component__["a" /* TagDetailComponent */]
                    },
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_2__tag_list_component__["a" /* TagListComponent */]
                    },
                ]
            }
        ]
    }
];
var TagRoutingModule = (function () {
    function TagRoutingModule() {
    }
    return TagRoutingModule;
}());
TagRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(dataRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], TagRoutingModule);

//# sourceMappingURL=tag-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n    <div class=\"container-fluid\">\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TagComponent = (function () {
    function TagComponent() {
    }
    TagComponent.prototype.ngOnInit = function () {
    };
    return TagComponent;
}());
TagComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'tag-cmp',
        template: __webpack_require__("../../../../../src/app/dashboard/tag/tag.component.html"),
    })
], TagComponent);

//# sourceMappingURL=tag.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/tag/tag.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_list_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tag_detail_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tag_component__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_modal_popup_modalpopup_module__ = __webpack_require__("../../../../../src/app/shared/modal-popup/modalpopup.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tag_routing_module__ = __webpack_require__("../../../../../src/app/dashboard/tag/tag-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_select2_ng2_select2__ = __webpack_require__("../../../../ng2-select2/ng2-select2.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_select2_ng2_select2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_select2_ng2_select2__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagModule", function() { return TagModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var TagModule = (function () {
    function TagModule() {
    }
    return TagModule;
}());
TagModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_8_ng2_select2_ng2_select2__["Select2Module"],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_7__tag_routing_module__["a" /* TagRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared_modal_popup_modalpopup_module__["a" /* ModalPopupModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__tag_component__["a" /* TagComponent */],
            __WEBPACK_IMPORTED_MODULE_4__tag_detail_component__["a" /* TagDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_3__tag_list_component__["a" /* TagListComponent */]
        ]
    })
], TagModule);

//# sourceMappingURL=tag.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/tag.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tag; });
var Tag = (function () {
    function Tag() {
    }
    return Tag;
}());

//# sourceMappingURL=tag.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map