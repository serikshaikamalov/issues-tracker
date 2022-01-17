import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-issue-filter-form',
  templateUrl: './issue-filter-form.component.html',
  styleUrls: ['./issue-filter-form.component.scss'],
})
export class IssueFilterFormComponent implements OnDestroy {
  @Input() tags: string[] = [];
  @Output() onTagChanged: EventEmitter<string> = new EventEmitter();
  filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      tag: new FormControl(),
    });

    this.tag.valueChanges.subscribe((v) => {
      this.onTagChanged.next(v);
    });
  }

  get tag(): FormControl {
    return this.filterForm.get('tag') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
