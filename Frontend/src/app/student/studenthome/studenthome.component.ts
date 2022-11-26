import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.css']
})
export class StudenthomeComponent implements OnInit {
  userid: any;
  allquiz: any;
  marks: any;
  public loading: any = true;
  public empty: any = true;
  constructor(private studentService: StudentService, private router: Router, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.loading = true
    this.empty = true
    this.webSocketService.listen('quizcrud').subscribe(
      (data) => {
        this.getdata()
      }
    )
    this.getdata();
  }

  getdata() {
    
    this.studentService.getAllQuiz()
      .subscribe(
        data => {
          if (data['quiz']) {
            this.loading = false;
            this.getmark();
            this.allquiz = data['quiz'];
            console.log(this.allquiz);
            // console.log(this.marks);
            if (!this.allquiz.length) {
              this.empty = true;
            }
            else {
              this.empty = false;
            }
          }
        },
        error => {
          this.router.navigate(['/error']);
        })
  }

  getmark() {
    this.studentService.getmark()
      .subscribe(
        data => {
          // console.log(data);
          if (data['mark']) {
            this.loading = false
            this.marks = data['mark']
            // if (!this.marks.length) {
            //   this.empty = true;
            // }
            // else {
              for(let i =0;i<this.allquiz.length;i++)
              {
                let flag = 0;
                for(let j = 0;j<this.marks.length;j++)
                {
                  if(this.allquiz[i].owneremail == this.marks[j].creatorEmail && this.allquiz[i]._id == this.marks[j].quizId)
                  {
                    flag = 1;
                    this.allquiz[i]['marks'] = this.marks[j].score;
                    this.allquiz[i]['taken'] = true;
                  }
                  if(this.marks[j].published == false)
                  {
                    this.allquiz[i]['marks'] = "-";
                  }
                }

                if(flag == 0)
                {
                  this.allquiz[i]['marks'] = "-";
                  this.allquiz[i]['taken'] = false;
                }
              // }
              // this.empty = false;
            }
          }
        },
        error => {
          this.router.navigate(['/error']);
        })
  }

  playquiz(item) {
    this.studentService.setQuizId(item._id);
    this.studentService.setCreatorEmail(item.owneremail);
    this.router.navigate(['/student/playquiz']);
  }
}
