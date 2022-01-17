import { IssuesService } from './issues.service';
import { TagsService } from './tags.service';

export class TagsMockService implements TagsService {
  // Dependencies
  constructor(private service: IssuesService) {}

  getAll(): string[] {
    const result = new Set(
      this.service.data
        .map((x) => x.tags)
        .reduce((prev, curr) => {
          return [...prev, ...curr];
        }, [])
    );

    return Array.from(result);
  }
}
