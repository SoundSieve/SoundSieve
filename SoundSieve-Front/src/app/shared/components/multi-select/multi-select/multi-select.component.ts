import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, AfterViewInit {

  faChevron = faChevronDown;
  faCheck = faCheck;
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select one or more...'
  @Output() valid = new EventEmitter<string>();
  @Output() values = new EventEmitter<string[]>();

  @ViewChild('selectBtn') selectBtn!: ElementRef;
  @ViewChild('textBtn') textBtn!: ElementRef;
  
  openSelect() {
    this.selectBtn.nativeElement.classList.toggle("open");
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("checked");

        let checked = document.querySelectorAll(".checked");
        if(checked && checked.length > 0) {
          this.textBtn.nativeElement.innerText = `${checked.length}`;
          this.valid.emit('valid');
          let values = [];
          checked.forEach((check: HTMLLIElement) => {
            values.push(check.innerText);
          })
          this.values.emit(values);
        } else {
          this.textBtn.nativeElement.innerText = this.placeholder;
          this.valid.emit('invalid');
        }
      })
    })
  }
}
