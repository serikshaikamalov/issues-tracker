import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'tag-input',
  templateUrl: `./tag-input.component.html`,
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent implements OnInit {
  @Input() tagsDictionaries: string[] = [];
  tagsVM: string[] = [];

  /**
   * Current form array
   */
  @Input() selectedTags!: FormArray;

  tagInput: string = '';

  /**
   * Flag as tags block
   */
  isTagDropdownVisible: boolean = false;

  /**
   * Validation for tag input field
   */
  MIN_INPUT_LENGTH: number = 1;

  ngOnInit(): void {
    this.hideTagOption();

    console.log({
      dict: this.tagsDictionaries,
      selected: this.selectedTags.getRawValue(),
    });

    this.tagsVM = [
      ...this.tagsDictionaries.filter(
        (x) => !this.selectedTags.getRawValue().includes(x)
      ),
    ];
  }

  /**
   * @description remove tag from selected list
   * @param index index of tag
   */
  removeTag(index: number) {
    this.selectedTags.removeAt(index);
  }

  tagChanged(search: string): void {
    console.log(this.tagsDictionaries);

    let result = this.tagsDictionaries.filter((d) =>
      d.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    // Exclude selected tags
    if (this.selectedTags.length > 0) {
      result = result.filter(
        (x) => this.selectedTags.getRawValue().indexOf(x) === -1
      );
    }

    this.tagsVM = result;
    console.log(this.tagsVM);
  }

  addTag(value: string): void {
    if (!value) return;

    console.log(this.selectedTags);
    

    // Add tag to selected list
    this.selectedTags.push(new FormControl(value));
    // Reset
    this.tagInput = '';
    this.tagChanged('');

    // Hide list
    this.hideTagOption();
  }

  showTagOption() {
    this.isTagDropdownVisible = true;
  }
  hideTagOption() {
    this.isTagDropdownVisible = false;
  }

  @HostListener('keyup.enter', ['$event'])
  onKeyPressed(event: KeyboardEvent) {
    console.log('TagInputComponent');

    console.log(event.key);
    if (event.key == 'Enter' && this.tagInput.length > this.MIN_INPUT_LENGTH) {
      this.addTag(this.tagInput);
    }
  }
}
