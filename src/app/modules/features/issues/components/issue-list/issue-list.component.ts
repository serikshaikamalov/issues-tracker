import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIssue } from '../../interfaces/issue.interface';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent {
  @Input() data?: IIssue[];
  @Input() tags: string[] = [];
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<IIssue> = new EventEmitter();

  edit(issue: IIssue) {
    this.onEdit.emit(issue);
  }

  deleteIssue(id: string) {
    this.onDelete.emit(id);
  }
}
