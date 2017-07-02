import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent }        from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleComponent } from './article.component';


const dataRoutes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    children: [
      {
        path: '',
        children: [
          { 
            path: ':id', 
            component: ArticleDetailComponent 
          },
          {
            path: 'add',
            component: ArticleDetailComponent
          },
          { 
            path: '', 
            component: ArticleListComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(dataRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticleRoutingModule {}
