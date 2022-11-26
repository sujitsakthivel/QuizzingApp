import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-getmarks',
  templateUrl: './getmarks.component.html',
  styleUrls: ['./getmarks.component.css']
})
export class GetmarksComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  name:any;
  public mark: any[];
  empty: boolean;
  public loading: any = true;
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.name = this.teacherService.getQuizName();
    console.log(this.name)
    this.loading = true
    this.empty = false;
    this.getdata();
  }


  getdata() {
    this.teacherService.getmark()
      .subscribe(
        data => {
          if (data['mark']) {
            this.loading = false
            this.mark = data['mark']
            console.log(data['mark'])
            if (!this.mark.length) {
              this.empty = true;
            }
            else {
              this.empty = false;
              this.mark["name"]=this.name
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
}
