import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  questionid: any;
  question: any;
  allQuestions: any;
  empty: any;
  load:any;
  msg: any = [];
  avail: boolean;
  quizid:any;
  obj:any;
  options:any[]= [];
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    if (this.teacherService.getQuizId() == undefined) {
      this.router.navigate(['/teacher/teacherhome']);
    }
    else {
      if (this.teacherService.getQuestionId() == undefined) {
        this.router.navigate(['/teacher/teacherhome']);
      }
      else {
        this.quizid = this.teacherService.getQuizId();
        this.questionid = this.teacherService.getQuestionId();
        this.getAllQuestions(this.quizid,this.questionid);
      }
    }
  }

  cancel() {
    this.router.navigate(['/teacher/seequestion']);
  }


  getAllQuestions(quizid,questionid) {
    this.teacherService.getAllQuestion(quizid)
      .subscribe(
        data => {
          if (data['msg']) {
            this.allQuestions = data['msg'];
            console.log(this.allQuestions);
            this.load = false;

            if (!this.allQuestions.length) {
              this.empty = true;

            }
            else {
              for(let i =0;i<this.allQuestions.length;i++)
              {
                if(this.allQuestions[i]._id == questionid)
                {
                  this.question = this.allQuestions[i];
                }
              }
              console.log(this.question.questionText);
              this.empty = false;
            }
          }
        },
        error => {
          this.router.navigate(['/error']);
        }
      )
  }
  updateQuestion(f: NgForm)
  {
    this.options.push({optionValue: '1',optionText:f.controls.optionA.value});
    this.options.push({optionValue: '2',optionText:f.controls.optionB.value});
    this.options.push({optionValue: '3',optionText:f.controls.optionC.value});
    this.options.push({optionValue: '4',optionText:f.controls.optionD.value});
    // console.log(this.options);
    this.obj = {questionid:this.questionid,quizid:this.quizid,options:this.options,questionText:f.controls.questionText.value,answer:f.controls.answer.value}
    // console.log(this.obj);
    // this.router.navigate(['/teacher/seequestion']);
    this.teacherService.editQuestion(this.obj)
      .subscribe(
        data => {
          this.router.navigate(['/teacher/seequestion']);
        },
        error =>
        {
          this.router.navigate(['/error']);
        }
      )
  }
}
