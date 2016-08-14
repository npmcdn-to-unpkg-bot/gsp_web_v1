import { Component, Input} from '@angular/core';
import { MapSection } from './map-section';
// import { SectionUpdateFormComponent } from './section-update-form.component';

@Component({
    selector: 'modal-container',
    templateUrl: './app/templates/modal-container.component.html',
})
export class ModalContainerComponent
{
  @Input() title: string;
  @Input() myModalIsVisible: boolean;
  //@Input() contentString: string = 'beginDummyData';
  @Input() componentName: string;
  @Input() selectedSection: MapSection;

  showModalContainer(title: string)
  {
    this.title = title;
    this.myModalIsVisible = true;
  }

  hideModalContainer()
  {
    this.myModalIsVisible = false;
  }
}