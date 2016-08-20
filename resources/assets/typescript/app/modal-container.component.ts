import { Component, Input} from '@angular/core';
import { MapSection } from './map-section';
import { AppSettings } from './app-settings';

@Component({
    selector: 'modal-container',
    templateUrl:  AppSettings.APP_RELATIVE_URL + '/app/templates/modal-container.component.html',
})
export class ModalContainerComponent
{
  @Input() title: string;
  @Input() myModalIsVisible: boolean;
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

  hideModalContainerWithMessage(eventPayloadMessage){
     //alert(eventPayloadMessage);
     this.myModalIsVisible = false;
  }
}