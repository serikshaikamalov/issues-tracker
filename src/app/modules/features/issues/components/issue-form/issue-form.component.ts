import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IIssue } from '../../interfaces/issue.interface';

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
  @Input() issue!: IIssue;
  issueForm!: FormGroup;
  @Output() onSubmit: EventEmitter<IIssue> = new EventEmitter();
  isPreview: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.issue);
    this.issueForm = this.createForm(this.issue);
  }

  createForm(issue: IIssue) {
    const tags: FormControl[] =
      this.issue?.tags?.map((x) => new FormControl(x)) || [];

    return this.fb.group({
      id: new FormControl(issue?.id),
      title: new FormControl(issue?.title, [
        Validators.required,
        Validators.required,
      ]),
      text: new FormControl(issue?.text, [Validators.required]),
      tags: new FormArray(tags),
    });
  }

  get text(): FormControl {
    return this.issueForm.get('text') as FormControl;
  }

  get tags(): FormArray {
    return this.issueForm.get('tags') as FormArray;
  }

  submit(): void {
    console.log('IssueFormComponent', this.issueForm.getRawValue());

    if (this.issueForm?.invalid) return;
    this.onSubmit.emit(this.issueForm.getRawValue());
    // Reset form
    if (!this.issue?.id) {
      this.issueForm.reset();
      this.tags.clear();
    }
  }

  cancel(): void {}
}
