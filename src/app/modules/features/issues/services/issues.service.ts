import { Observable } from 'rxjs';
import { IIssue } from '../interfaces/issue.interface';

/**
 * Abscract class for any kind of Data Services(Mock, HTTP Service, LocalStorage)
 */
export abstract class IssuesService {
  abstract data: IIssue[];
  abstract getAll(tag?: string): Observable<IIssue[]>;
  abstract create(post: IIssue): Observable<IIssue>;
  abstract update(id: string, issue: IIssue): Observable<IIssue>;
  abstract delete(id: string): Observable<string>;
}
