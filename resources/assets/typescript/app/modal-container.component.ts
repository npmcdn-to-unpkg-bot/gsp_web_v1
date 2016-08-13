import { Component, Input, OnChanges, SimpleChange} from '@angular/core';
// import { SectionUpdateFormComponent } from './section-update-form.component';

@Component({
    selector: 'modal-container',
    templateUrl: './app/modal-container.component.html',
})
export class ModalContainerComponent implements OnChanges
{
  @Input() title: string;
  @Input() myModalIsVisible: boolean;
  @Input() contentString: string = 'beginDummyData';
  @Input() contentType: string = 'simple_string';

  showModalContainer(title: string)
  {
    this.title = title;
    this.myModalIsVisible = true;
  }

  hideModalContainer()
  {
    this.myModalIsVisible = false;
  }

  
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    /*
    for (let propName in changes) {
      let changedProp = changes[propName];
      let from = JSON.stringify(changedProp.previousValue);
      let to =   JSON.stringify(changedProp.currentValue);
      this.myModalIsVisible=!this.myModalIsVisible;
      debugger;
      // log.push( `${propName} changed from ${from} to ${to}`);
    }
    */
  }

  // WTF, this is triggered on the value change in parent, but not ngOnChanges
  ngDoCheck() {
    this.myModalIsVisible=this.myModalIsVisible;
    //debugger;  
  }
}