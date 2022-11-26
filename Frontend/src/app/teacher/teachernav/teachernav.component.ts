import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teachernav',
  templateUrl: './teachernav.component.html',
  styleUrls: ['./teachernav.component.css']
})
export class TeachernavComponent implements OnInit {
  email: any;
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
