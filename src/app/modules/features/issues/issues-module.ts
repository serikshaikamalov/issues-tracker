import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesPageComponent } from './pages/issues-page/issues-page';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesMockService } from './services/issues-mock.service';
import { HttpClientModule } from '@angular/common/http';
import { IssuesService } from './services/issues.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsService } from './services/tags.service';
import { TagsMockService } from './services/tags-mock.service';
import { IssueFilterFormComponent } from './components/issue-filter-form/issue-filter-form.component';
import { TagInputItemComponent } from './components/tag-input-item/tag-input-item.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';

@NgModule({
  declarations: [
    IssuesPageComponent,
    IssueFormComponent,
    IssueListComponent,
    IssueFilterFormComponent,
    TagInputItemComponent,
    TagInputComponent,
    
  ],
  imports: [
    CommonModule,
    IssuesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
  providers: [
    {
      provide: IssuesService,
      useClass: IssuesMockService,
    },
    {
      provide: TagsService,
      useClass: TagsMockService,
      deps: [IssuesService],
    },
  ],
})
export class IssuesModule {}
