import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name:string="";
  public QuestionList : any=[];
public currentQuestion:number=0;
public points:number=0;
counter:number=60;
correctAnswer:number=0;
wrongAnswer:number=0;
interval$:any;
progress:string="0";
isQuizCompleted:Boolean=false;

  faTimesCircle=faClock;

  constructor( private QuestionService:QuestionService){}

  ngOnInit(){
    this.name= localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
    this.QuestionService.getQuestionJson().subscribe(res=>{
      this.QuestionList=res.questions;
    })
  }
  nextQuestion(){
   this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;

  }
  answer(currentQ:number,op:any){

    if(currentQ === this.QuestionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }

    if(op.correct ){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
      this.resetCounter();
       this.getProgressPercent();

      },1000)

    }else{

     setTimeout(()=>{
       this.currentQuestion++;
      this.wrongAnswer++;
      this.resetCounter();
      this.getProgressPercent();
     },1000)
      


    }

  }
  startCounter(){
    this.interval$=interval(1000).subscribe(val =>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(()=>{this.interval$.unsubscribe();},600000
    )
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.QuestionList.length)*100).toString();
    return this.progress;
  }
}
