import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { IIssue } from '../interfaces/issue.interface';
import { IssuesService } from './issues.service';

@Injectable()
export class IssuesMockService implements IssuesService {
  /**
   * List of issues.
   */
  data: IIssue[] = [
    {
      id: '1',
      title: 'This is a bag',
      text: 'This is a description of the item, it might describe a bug/task/comment, it can also display <a href=” www.google.com ”>Links</a>',

      tags: ['bug'],
    },
    {
      id: '2',
      title: 'This is an issue',
      text: 'This is a description of the item, it might describe a bug/task/comment, it can also display <a href=” www.google.com ”>Links</a>',

      tags: ['issue'],
    },
  ];

  constructor(private http: HttpClient) {}

  /**
   * @description Get issues
   */
  getAll(tag?: string): Observable<IIssue[]> {
    let response = this.data.concat();

    if (tag) {
      response = response.filter((x) =>
        x.tags
          .map((t) => t.toLocaleLowerCase())
          .includes(tag.toLocaleLowerCase())
      );
    }
    return of(response).pipe(delay(100));

    // Get data from json file, but impossible to save items into json.
    // return this.http
    //   .get<IIssue[]>('assets/mock/issues-data.json')
    //   .pipe(tap((response) => (this.data = response)));
  }

  get(id: string): Observable<IIssue> {
    const item: IIssue | undefined = this.data.find((x) => x.id === id);
    if (!item) {
      throw Error('not_found');
    }
    return of(item).pipe(delay(100));
  }

  /**
   * @description To save a new item(a bug/comment/tastk)
   */
  create(issue: IIssue): Observable<IIssue> {
    // Randomize issue id. We don't know concrete id of issue.
    issue.id = new Date().getTime().toString();
    this.data.push(issue);
    return of(issue);
  }

  update(id: string, issue: IIssue): Observable<IIssue> {
    const index = this.data.findIndex((x) => x.id === id);
    this.data[index] = issue;
    return of(issue);
  }

  /**
   * @description Delete issue from Storage
   * @param id
   * @returns removed issue's id
   */
  delete(id: string): Observable<string> {
    this.data = this.data.filter((x) => x.id != id);
    return of(id);
  }
}
