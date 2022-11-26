import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacherhome',
  templateUrl: './teacherhome.component.html',
  styleUrls: ['./teacherhome.component.css']
})
export class TeacherhomeComponent implements OnInit {

  msg: any = [];
  empty: boolean;
  avail: boolean;
  public quiz: any[];
  public loading: any = true;
  constructor(private teacherService: TeacherService, private router: Router) { }
  ngOnInit(): void {
    this.loading = true
    this.empty = false;
    this.getdata();
  }

  getdata() {
    this.teacherService.gethomequiz()
      .subscribe(
        data => {
          if (data['quiz']) {
            console.log(data)
            this.quiz = data['quiz']
            this.loading = false;
            // console.log(this.quiz.length);
            if (!this.quiz.length) {
              this.empty = true;

            }
            else {
              this.empty = false;
            }
          }

          // console.log(data);
          // this.router.navigate(['/teacher/teacherhome']);
        },
        error => {
          this.router.navigate(['/error']);
        }


      )

  }

  edit(quiz) {
    this.teacherService.editquiz(quiz._id)
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = false;
            return;
          }
          if (data['message']) {
            this.router.navigate(['/teacher/uploadquiz']);
          }
          else {
            this.msg = "something went wrong!!";
            this.avail = false;
            return;
          }
        },
        error => {
          this.router.navigate(['/error']);
        }


      )
  }

  marks(quiz){
    this.teacherService.setQuizId(quiz._id);
    // console.log(name);
    this.teacherService.setQuizName(quiz.quizname);
    this.router.navigate(['/teacher/getmarks']);
  }


  viewQuestion(q) {
    this.teacherService.setQuizId(q._id);
    this.teacherService.setQuizName(q.quizname);
    this.teacherService.setDelete(q.upload)
    this.router.navigate(['/teacher/uploadedquestion']);
  }

  delete(quiz) {
    window.alert("Quiz Deleted");
    this.teacherService.deletequiz(quiz._id)
      .subscribe(
        data => {

          // console.log(data);
          this.getdata();
          // this.router.navigate(['/teacher/teacherhome']);
        },
        error => {
          this.router.navigate(['/error']);
        }
      )
  }
  publish(quiz) {
    window.alert("Marks Published");
    this.teacherService.publish(quiz._id)
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
        },
        error => {
          this.router.navigate(['/error']);
        }


      )
  }
}
