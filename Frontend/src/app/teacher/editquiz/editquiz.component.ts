import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-editquiz',
  templateUrl: './editquiz.component.html',
  styleUrls: ['./editquiz.component.css']
})
export class EditquizComponent implements OnInit {
  questionid: any;
  question: any;
  quiz: any;
  empty: any;
  load:any;
  msg: any = [];
  avail: boolean;
  quizid:any;
  obj:any;
  options:any[]= [];
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.teacherService.getQuizId())
        this.quizid = this.teacherService.getQuizId();
        this.questionid = this.teacherService.getQuestionId();
        this.getQuiz(this.quizid);
  }

  cancel() {
    this.router.navigate(['/teacher/uploadquiz']);
  }


  getQuiz(quizid) {
    this.teacherService.getquiz(quizid)
      .subscribe(
        data => {
          if (data['msg']) {
            this.quiz = data['msg'];
            this.load = false;
          }
        },
        error => {
          this.router.navigate(['/error']);
        }
      )
  }

  updateQuiz(f: NgForm) {
    this.teacherService.editquiz2(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          this.router.navigate(['/teacher/uploadquiz']);
        },
        error =>
        {
          this.router.navigate(['/error']);
        }
      )
  }
}
