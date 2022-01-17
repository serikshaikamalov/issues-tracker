import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'tag-input',
  templateUrl: `./tag-input.component.html`,
  styles: [``],
})
export class TagInputComponent implements OnInit {
  @Input() tagsDictionaries: string[] = [];
  tagsVM: string[] = [];

  /**
   * Current form array
   */
  @Input() tags!: FormArray;

  tagInput: string = '';

  ngOnInit(): void {
    this.tagsVM = [...this.tagsDictionaries];
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  tagChanged(tag: string) {
    this.tagsVM = this.tagsDictionaries.filter((x) =>
      x.toLocaleLowerCase().includes(tag.toLocaleLowerCase())
    );
  }

  addTag() {
    this.tags.push(new FormControl(this.tagInput));

    // reset
    this.tagInput = '';
  }
}
