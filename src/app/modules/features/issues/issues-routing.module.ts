import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssuesPageComponent } from './pages/issues-page/issues-page';

const routes: Routes = [{ path: '', component: IssuesPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuesRoutingModule {}
