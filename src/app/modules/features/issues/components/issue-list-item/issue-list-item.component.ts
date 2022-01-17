import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIssue } from '../../interfaces/issue.interface';

export enum IssueMode {
  view = 'view',
  edit = 'edit',
}

@Component({
  selector: 'app-issue-list-item',
  templateUrl: './issue-list-item.component.html',
  styleUrls: ['./issue-list-item.component.scss'],
})
export class IssueListItemComponent {
  @Input() issue!: IIssue;
  @Input() tags: string[] = [];

  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<IIssue> = new EventEmitter();

  mode: IssueMode = IssueMode.view;

  showEditor(): void {
    this.mode = IssueMode.edit;
  }
  deleteIssue(id: string): void {
    this.onDelete.emit(id);
  }
  onCreate(issue: IIssue) {
    this.onEdit.emit(issue);
    this.mode = IssueMode.view;
  }
}
