import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-studentnav',
  templateUrl: './studentnav.component.html',
  styleUrls: ['./studentnav.component.css']
})
export class StudentnavComponent implements OnInit {
email:any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('userid'));
    this.email=localStorage.getItem('userid');
  }
  logoutuser() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

}
