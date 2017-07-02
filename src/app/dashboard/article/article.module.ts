import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleComponent } from './article.component';
import { ModalPopupModule } from './../../shared/modal-popup/modalpopup.module';
import { ArticleRoutingModule }       from './article-routing.module';
import { Select2Module } from 'ng2-select2/ng2-select2';

@NgModule({
  imports: [
      Select2Module,
      CommonModule,
      ArticleRoutingModule,
      ReactiveFormsModule,
      ModalPopupModule
  ],
  declarations: [
      ArticleComponent,
      ArticleDetailComponent,
      ArticleListComponent
  ]
})


export class ArticleModule { }

