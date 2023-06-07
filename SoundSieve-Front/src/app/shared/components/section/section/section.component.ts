import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements AfterViewInit {
  @Input() sHeading!: string;
  @Input() sContent!: string;
  @Input() sBtnTitle!: string;
  @Input() sImg: boolean = false;
  @Input() sImgUrl!: string;
  @Input() sBtnUrl!: string;
  @Input() sBtn: boolean = true;
  @Input() sAlign!: 'left' | 'center' | 'right';

  @ViewChild('sectionContainer') sectionContainer: ElementRef;

  ngAfterViewInit(): void {
    this.setAlign();
  }

  setAlign() {
    switch(this.sAlign) {
      case 'left': 
        this.sectionContainer.nativeElement.classList.add('justify-content-end');
        this.sectionContainer.nativeElement.classList.add('left');
        break;
      case 'center':
        break;
      case 'right':
        this.sectionContainer.nativeElement.classList.add('justify-content-start');
        this.sectionContainer.nativeElement.classList.add('right');
        break;
    }
  }

}
