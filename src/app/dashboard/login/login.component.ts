import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../../services/subscribers.service';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { Router } from '@angular/router';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    providers: [SubscribersService]


})
export class LoginComponent implements OnInit {
    public subscribers: Array<Select2OptionData>;
    public options: Select2Options;
    private user: string;
    constructor(private service: SubscribersService, private _router: Router) { }

    ngOnInit() {
        this.service.getAll().subscribe(subscribers => this.subscribers = subscribers.map(subscriber => {
            return {
                id: subscriber.id,
                text: subscriber.nickname,
                additional: {
                    image:'assets/image/user.png'
                }
            }
        }));
        this.options = {
            templateResult: this.templateResult,
            templateSelection: this.templateSelection
        }
    }

    // function for result template
    public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
        if (!state.id) {
            return state.text;
        }

        let image = '<span class="user_select_image"></span>';

        if (state.additional.image) {
            image = '<span class="user_select_image"><img src="' + state.additional.image + '"</span>';
        }

        return jQuery('<span>' + image + ' ' + state.text + '</span>');
    }

    // function for selection template
    public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
        if (!state.id) {
            return state.text;
        }

        return jQuery('<span>' + state.text + '</span>');
    }

    changed(e: any) {
        this.user = e.value;
    }

    login() {
		if (this.user) {
			this.service.login(this.user).subscribe(() => this._router.navigate(['/subscriber']));
        }

    }
}