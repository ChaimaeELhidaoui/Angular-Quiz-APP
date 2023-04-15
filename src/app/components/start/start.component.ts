import { Component ,OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit{

  @ViewChild("name") nameKey!:ElementRef;

  ngOnInit(): void {

  }
  startQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }

}
