import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public avail: boolean = false;
  private quizid: any;
  private creatoremail:any;
  private questionid: any;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000/student/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  addTaken(body: any) {
    return this.http.post(this.baseUri + "addTaken", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllQuiz() {
    return this.http.get(this.baseUri + "getallquiz", { headers: this.headers });
  }

  getmark() {
    return this.http.get(this.baseUri + "getmark/", { headers: this.headers });
  }
  
  setQuizId(id) {
    this.quizid = id;
  }

  setCreatorEmail(email) {
    this.creatoremail = email;
  }

  getCreatorEmail() {
    return this.creatoremail ;
  }

  setQuestionId(id) {
    this.questionid = id;
  }

  getQuestionId() {
    return this.questionid;
  }

  getQuizId() {
    return this.quizid;
  }
  getAllQuestion(id) {
    return this.http.get(this.baseUri + "getallquestion/" + id, { headers: this.headers });
  }
  getQuestion(id) {
    return this.http.get(this.baseUri + "getquestion/" + id, { headers: this.headers });
  }

  block()
  {
    return this.http.put(this.baseUri + "blockme", {}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
