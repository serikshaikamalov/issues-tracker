import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IIssue } from '../../interfaces/issue.interface';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  /**
   * All tags from issues
   */
  @Input() tagsDictionaries: string[] = [];

  createForm: FormGroup;
  destroy$: Subject<boolean> = new Subject();
  @Output() onSubmit: EventEmitter<IIssue> = new EventEmitter();

  constructor(private fb: FormBuilder, private service: IssuesService) {
    this.createForm = this.fb.group({
      title: new FormControl([''], [Validators.required, Validators.required]),
      text: new FormControl([''], [Validators.required]),
      tags: new FormArray([new FormControl('bugs')]),
    });
  }

  get tags(): FormArray {
    return this.createForm.get('tags') as FormArray;
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.createForm?.invalid) return;
    this.onSubmit.emit(this.createForm.getRawValue());
    // Reset form
    this.tags.clear();
    this.tags.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
