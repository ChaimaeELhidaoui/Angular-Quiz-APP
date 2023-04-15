import { Component } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faComment =  faCircleQuestion;
  

}
