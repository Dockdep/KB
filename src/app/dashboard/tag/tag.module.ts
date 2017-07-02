import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TagListComponent } from './tag-list.component';
import { TagDetailComponent } from './tag-detail.component';
import { TagComponent } from './tag.component';
import { ModalPopupModule } from './../../shared/modal-popup/modalpopup.module';
import { TagRoutingModule }       from './tag-routing.module';
import { Select2Module } from 'ng2-select2/ng2-select2';

@NgModule({
  imports: [
      Select2Module,
      CommonModule,
      TagRoutingModule,
      ReactiveFormsModule,
      ModalPopupModule
  ],
  declarations: [
      TagComponent,
      TagDetailComponent,
      TagListComponent
  ]
})


export class TagModule { }

