import {
  AfterViewInit,
  Component,
  ContentChild, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  CheckSelfValid,
  DROPDOWN_EX_DEFAULT_SHOW_COUNT,
  DropdownExDisabledFn,
  DropdownExModel,
  DropdownExSelectEnableFn
} from '../shared.types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IfOpenService } from '@clr/angular/utils/conditional/if-open.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EspecialTempDirective } from '../directives/especial-temp.directive';
import { ItemTempDirective } from '../directives/item-temp.directive';
import { TitleTempDirective } from '../directives/title-temp.directive';

@Component({
  selector: 'lib-dropdown-ex',
  templateUrl: './dropdown-ex.component.html',
  styleUrls: ['./dropdown-ex.component.css'],
  animations: [
    trigger('check', [
      state('begin', style({backgroundColor: '#d28f00'})),
      state('end', style({backgroundColor: 'transparent'})),
      transition('begin => end', animate(500))
    ])
  ]
})
export class DropdownExComponent implements OnInit, OnChanges, AfterViewInit, CheckSelfValid {
  @ViewChild('dropdownEx') dropdownEx: object;
  @Input() dropdownItems: Array<any>;
  @Input() dropdownItemDisabledFn: DropdownExDisabledFn;
  @Input() dropdownItemSelectEnableFn: DropdownExSelectEnableFn;
  @Input() dropdownDisabled = false;
  @Input() dropdownTip = '';
  @Input() dropdownKey = '';
  @Input() dropdownIsRequired = false;
  @Input() dropdownMenuHeader = '';
  @Input() dropdownMinWidth = 180;
  @Input() dropdownModel: DropdownExModel = 'single';
  @Input() dropdownLabel = '';
  @Input() dropdownLabelWidth = 180;
  @Input() dropdownEspecialItem: any;
  @Input() dropdownActiveItems: Array<any>; /*Not empty*/
  @Input() dropdownActiveItem: any;
  @Output() dropdownChangeItem: EventEmitter<any>;
  @Output() dropdownEspecialClick: EventEmitter<any>;
  @ContentChild(EspecialTempDirective) especialTemp: EspecialTempDirective;
  @ContentChild(ItemTempDirective) itemTemp: ItemTempDirective;
  @ContentChild(TitleTempDirective) titleTemp: TitleTempDirective;
  private filterSubject: Subject<string>;
  private filterText = '';
  checkSelfAnimation: string;
  filteredDropdownItems: Array<any>;
  multipleSelectedItems: Array<any>;
  itemElements: HTMLCollectionOf<HTMLElement>;

  constructor(private el: ElementRef) {
    this.filteredDropdownItems = Array<any>();
    this.multipleSelectedItems = Array<any>();
    this.filterSubject = new Subject<string>();
    this.dropdownChangeItem = new EventEmitter();
    this.dropdownEspecialClick = new EventEmitter();
  }

  ngOnInit() {
    this.filterSubject.asObservable().pipe(debounceTime(300)).subscribe((filterText: string) => {
      if (this.isReadied) {
        if (filterText === '') {
          this.filteredDropdownItems = this.dropdownItems;
        } else {
          this.filteredDropdownItems = this.dropdownItems.filter((item, index) => {
            const text = this.itemElements.item(index).innerText;
            return filterText !== '' ? text.indexOf(filterText) > -1 : true;
          });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Reflect.has(changes, 'dropdownItems')) {
      this.filteredDropdownItems = this.dropdownItems;
      this.dropdownActiveItem = undefined;
    }
  }

  ngAfterViewInit(): void {
    this.itemElements = this.el.nativeElement.getElementsByClassName('dropdown-item-container');
  }

  get dropdownShowSearch(): boolean {
    return this.isReadied && this.dropdownItems.length > DROPDOWN_EX_DEFAULT_SHOW_COUNT;
  }

  get isEspecialTemplate(): boolean {
    return this.especialTemp !== undefined;
  }

  get isNormalTile(): boolean {
    return this.titleTemp === undefined;
  }

  get isSingleCustomTile(): boolean {
    return this.titleTemp !== undefined && this.dropdownModel === 'single';
  }

  get isMultipleCustomTile(): boolean {
    return this.titleTemp !== undefined && this.dropdownModel === 'multiple';
  }

  get isCustomTemplate(): boolean {
    return this.itemTemp !== undefined;
  }

  get isDefaultTemplate(): boolean {
    return this.itemTemp === undefined;
  }

  get hasNoDataForSearch(): boolean {
    return this.dropdownShowSearch &&
      this.filterText !== '' &&
      this.filteredDropdownItems.length === 0;
  }

  get isEmptyList(): boolean {
    return this.dropdownItems !== undefined && this.dropdownItems.length === 0;
  }

  get isReadied(): boolean {
    return this.dropdownItems !== undefined && !this.dropdownDisabled;
  }

  get isPreparing(): boolean {
    return this.dropdownItems === undefined;
  }

  get active(): boolean {
    /*Todo:this is bad method, but no way better than it at present.2018/1/3*/
    if (this.dropdownEx && Reflect.has(this.dropdownEx, 'ifOpenService')) {
      const openService = Reflect.get(this.dropdownEx, 'ifOpenService') as IfOpenService;
      return openService.open === undefined ? false : openService.open;
    } else {
      return false;
    }
  }

  get activeText(): string {
    if (!this.notSelect) {
      let tip = '';
      if (this.dropdownModel === 'single') {
        tip = this.getItemDescription(this.dropdownActiveItem);
      } else {
        this.dropdownActiveItems.forEach(item => tip += `${this.getItemDescription(item)};`);
      }
      return tip === '' ? this.dropdownTip : tip;
    } else {
      return this.dropdownTip;
    }
  }

  get notSelect(): boolean {
    if (this.dropdownModel === 'single') {
      return !this.dropdownActiveItem;
    } else {
      return !this.dropdownActiveItems || this.dropdownActiveItems.length === 0;
    }
  }

  itemDisplayNone(item: any): boolean {
    return this.filteredDropdownItems.indexOf(item) < 0;
  }

  filterExecute($event: KeyboardEvent) {
    this.filterText = ($event.target as HTMLInputElement).value;
    this.filterSubject.next(this.filterText);
  }

  itemActive(item: any): boolean {
    if (this.dropdownModel === 'single') {
      return this.activeText === this.getItemDescription(item);
    } else {
      return this.activeText.includes(`${this.getItemDescription(item)};`);
    }
  }

  itemDisabled(item): boolean {
    if (this.dropdownItemDisabledFn) {
      return this.dropdownItemDisabledFn(item);
    } else {
      return false;
    }
  }

  changeEspecialItemSelect() {
    this.dropdownEspecialClick.emit(this.dropdownEspecialItem);
  }

  changeItemSelect(item: any) {
    const changeFun = () => {
      if (typeof item === 'object') {
        const obj = {};
        Object.assign(obj, item);
        this.dropdownActiveItem = obj;
        this.dropdownChangeItem.emit(obj);
      } else {
        this.dropdownActiveItem = item;
        this.dropdownChangeItem.emit(item);
      }
    };
    if (this.dropdownItemSelectEnableFn) {
      this.dropdownItemSelectEnableFn(item).subscribe((isCanSelect: boolean) => {
        if (isCanSelect) {
          changeFun();
        }
      });
    } else {
      changeFun();
    }
  }

  setMultipleSelect(item: any) {
    if (this.multipleSelectedItems.find(value => value === item)) {
      const index = this.multipleSelectedItems.findIndex(value => value === item);
      this.multipleSelectedItems.splice(index, 1);
    } else {
      this.multipleSelectedItems.push(item);
    }
    this.dropdownChangeItem.emit(this.multipleSelectedItems);
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
    return this.dropdownIsRequired && !this.dropdownDisabled ? !this.notSelect : true;
  }
}
