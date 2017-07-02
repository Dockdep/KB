import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagListComponent }        from './tag-list.component';
import { TagDetailComponent } from './tag-detail.component';
import { TagComponent } from './tag.component';


const dataRoutes: Routes = [
  {
    path: '',
    component: TagComponent,
    children: [
      {
        path: '',
        children: [
          { 
            path: ':id', 
            component: TagDetailComponent 
          },
          {
            path: 'add',
            component: TagDetailComponent
          },
          { 
            path: '', 
            component: TagListComponent
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
export class TagRoutingModule {}
