import {Component, OnInit, Input,
    Output, OnChanges, EventEmitter, trigger, state, style, animate, transition} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'modal-popup',
    templateUrl: 'modalpopup.component.html',
    // styles:
    animations: [
        trigger('animation', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})

export class ModalPopupComponent implements OnInit {
    @Input() closable = true;
    @Input() title :string;
    
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

}