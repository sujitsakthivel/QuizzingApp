import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private quizid: any;
  private questionid: any;
  private delete:any;
  private creatoremail:any;
  private quizname:any;
  private edit:any;
  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000/teacher/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  createQuiz(body: any) {
    return this.http.post(this.baseUri + "createquiz", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getuploadquiz() {
    return this.http.get(this.baseUri + "getuploadquiz", { headers: this.headers });
  }

  gethomequiz() {
    return this.http.get(this.baseUri + "gethomequiz", { headers: this.headers });
  }

  seestudent() {
    return this.http.get(this.baseUri + "seestudent", { headers: this.headers });
  }

  

  blockuser(id) {
    return this.http.delete(this.baseUri + "blockuser/" + id, { headers: this.headers });
  }
  unblockuser(id) {
    return this.http.delete(this.baseUri + "unblockuser/" + id, { headers: this.headers });
  }


  setQuizId(id) {
    this.quizid = id;
  }

  setQuizName(name) {
    this.quizname = name;
  }

  getQuizName() {
    return this.quizname;
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

  deletequiz(id) {
    return this.http.delete(this.baseUri + "deletequiz/" + id, { headers: this.headers });
  }

  uploadquiz(body) {
    return this.http.post(this.baseUri + "uploadquiz", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  publish(body) {
    return this.http.post(this.baseUri + "publish", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editquiz(body) {
    return this.http.post(this.baseUri + "editquiz", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editquiz2(body) {
    return this.http.post(this.baseUri + "editquiz2", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  addQuestion(body) {
    return this.http.post(this.baseUri + "addquestion", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllQuestion(id) {
    return this.http.get(this.baseUri + "getallquestion/" + id, { headers: this.headers });
  }
  getquiz(id) {
    return this.http.get(this.baseUri + "getquiz/" + id, { headers: this.headers });
  }
  getmark() {
    return this.http.get(this.baseUri + "getmark/", { headers: this.headers });
  }

  getQuestion(id) {
    return this.http.get(this.baseUri + "getquestion/" + id, { headers: this.headers });
  }


  deleteQuestion(id) {
    return this.http.delete(this.baseUri + "deletequestion/" + id, { headers: this.headers });
  }

  editQuestion(body) {
    return this.http.post(this.baseUri + "editquestion", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editQuiz(body) {
    return this.http.post(this.baseUri + "editquestion", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  setDelete(data) {
    this.delete = data;
  }

  setEdit(data) {
    this.edit = data;
  }

  getDelete() {
    return this.delete;
  }
}
