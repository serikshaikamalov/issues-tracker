import { Component, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IIssue } from '../../interfaces/issue.interface';
import { IssuesService } from '../../services/issues.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-issues-page',
  templateUrl: './issues-page.html',
  styleUrls: ['./issues-page.scss'],
})
export class IssuesPageComponent implements OnInit {
  loadData$: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject();
  response?: IIssue[];
  /**
   * List of tags
   */
  tags: string[] = [];

  /**
   * Selected tag
   */
  tag?: string;

  constructor(private service: IssuesService, private tagService: TagsService) {
    this.loadData$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.service.getAll(this.tag);
        })
      )
      .subscribe((response) => {
        this.response = response;
        this.tags = this.tagService.getAll();
      });
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loadData$.next(true);
  }

  edit(issue: IIssue): void {
    this.service
      .update(issue.id, issue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reload();
      });
  }

  deleteIssue(id: string): void {
    this.service
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reload();
      });
  }

  onCreate(issue: IIssue) {
    this.service
      .create(issue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reload();
      });
  }

  onTagChanged(tag: string) {
    this.tag = tag;
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
