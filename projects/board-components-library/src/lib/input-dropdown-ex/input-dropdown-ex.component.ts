import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { CheckSelfValid, DropdownExDisabledFn, InputDropdownExModel } from '../shared.types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InputDropdownExSelectorDirective } from './input-dropdown-ex-selector.directive';

@Component({
  selector: 'lib-input-dropdown-ex',
  templateUrl: './input-dropdown-ex.component.html',
  styleUrls: ['./input-dropdown-ex.component.css'],
  animations: [
    trigger('check', [
      state('begin', style({backgroundColor: '#d28f00'})),
      state('end', style({backgroundColor: 'transparent'})),
      transition('begin => end', animate(500))
    ])
  ]
})
export class InputDropdownExComponent implements OnInit, OnChanges, CheckSelfValid {
  @Input() dropdownItems: Array<any>;
  @Input() dropdownModel: InputDropdownExModel = 'sync';
  @Input() dropdownItemDisabledFn: DropdownExDisabledFn;
  @Input() dropdownDisabled = false;
  @Input() dropdownKey = '';
  @Input() dropdownLabel = '';
  @Input() dropdownLabelMinWidth = '180';
  @Input() dropdownIsRequired = false;
  @Input() dropdownActiveItem: any; /*Not empty*/
  @Input() dropdownMenuHeader = '';
  @Input() inputPlaceholder = '';
  @Input() inputMinWidth = 180;
  @Output() dropdownRefreshItems: EventEmitter<string>;
  @Output() dropdownChangeItem: EventEmitter<any>;
  @ContentChildren(InputDropdownExSelectorDirective) contentTemp: QueryList<InputDropdownExSelectorDirective>;
  private subjectInputChange: Subject<string>;
  checkSelfAnimation: string;
  filteredDropdownItems: Array<any>;
  searchText = '';
  isSearching = false;

  constructor() {
    this.subjectInputChange = new Subject<string>();
    this.dropdownChangeItem = new EventEmitter();
    this.dropdownRefreshItems = new EventEmitter<string>();
    this.filteredDropdownItems = Array<any>();
  }

  ngOnInit() {
    this.subjectInputChange.asObservable()
      .pipe(debounceTime(500))
      .subscribe((searchText: string) => {
        this.dropdownRefreshItems.next(searchText);
        this.isSearching = true;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Reflect.has(changes, 'dropdownItems')) {
      this.filteredDropdownItems = this.dropdownItems;
      this.isSearching = false;
    }
  }

  get isCustomTemplate(): boolean {
    return this.contentTemp && this.contentTemp.length > 0;
  }

  get isAsyncModel() {
    return this.dropdownModel === 'async';
  }

  get hasNoDataForSearch(): boolean {
    return this.filteredDropdownItems.length === 0 && !this.isSearching;
  }

  get notSelect(): boolean {
    return !this.dropdownActiveItem;
  }

  get isEnabled(): boolean {
    return !this.dropdownDisabled;
  }

  itemDisabled(item): boolean {
    if (this.dropdownItemDisabledFn) {
      return this.dropdownItemDisabledFn(item);
    } else {
      return false;
    }
  }

  itemActive(item: any): boolean {
    return item === this.dropdownActiveItem;
  }

  changeItemSelect(item: any) {
    this.dropdownChangeItem.emit(item);
    this.searchText = this.getItemDescription(item);
  }

  refreshDropdownItems() {
    if (this.isAsyncModel) {
      this.dropdownItems.splice(0, this.dropdownItems.length);
      this.subjectInputChange.next(this.searchText);
    } else {
      this.filteredDropdownItems = this.dropdownItems.filter(value =>
        this.getItemDescription(value).includes(this.searchText));
    }
  }

  getItemDescription(item: any): string {
    if (typeof item === 'object') {
      return Reflect.has(item, this.dropdownKey) ?
        Reflect.get(item, this.dropdownKey) :
        item.toString();
    }
    return item ? item.toString() : '';
  }

  public checkSelf() {
    this.checkSelfAnimation = 'begin';
    setTimeout(() => this.checkSelfAnimation = 'end', 2000);
  }

  public get isValid(): boolean {
    return this.isEnabled && this.dropdownIsRequired ? !this.notSelect : true;
  }
}
