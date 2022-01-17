import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIssue } from '../../interfaces/issue.interface';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  @Input() data?: IIssue[];
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  edit(id: string) {
    this.onEdit.emit(id);
  }

  deleteIssue(id: string) {
    this.onDelete.emit(id);
  }
}
