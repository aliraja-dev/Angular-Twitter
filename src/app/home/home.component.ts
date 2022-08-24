import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('f', { static: false }) form!: NgForm;
  posts: Post[] = [];
  constructor(private dataSvc: DataServiceService) { }

  ngOnInit(): void {
    this.dataSvc.getAllPosts().subscribe(res => {
      console.log(res);
      this.posts = res;
    });
  }
  onSubmit() {
    console.log('submit' + this.form.value.post);
    //TODO Call the backend to save the post
    this.posts.push({ user: "Ali", post: this.form.value.post });
    this.dataSvc.addPost({ user: "Ali", post: this.form.value.post }).subscribe(res => {
      console.log(res);
    });
  }

  //TODO bring back the posts from backend

}
