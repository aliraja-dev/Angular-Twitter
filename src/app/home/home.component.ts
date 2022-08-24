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
    this.dataSvc.postsSubject.subscribe(posts => { console.log(posts); this.posts = posts; });
    this.dataSvc.getAllPosts().subscribe(res => {
      this.dataSvc.postsSubject.next(res);
    });
  }
  onSubmit() {
    console.log('submit' + this.form.value.post);
    //TODO Call the backend to save the post
    //this.posts.push({ user: "Ali", post: this.form.value.post });
    this.dataSvc.addPost({ user: "Ali", post: this.form.value.post }).subscribe(res => {
      console.log(res);
      if (res.acknowledged && res.insertedId !== undefined) {
        this.posts.push({ user: "Ali", post: this.form.value.post, _id: res.insertedId });
      }
    });
  }
  onDelete(_id: string) {
    //TODO we need to id of the post to delete
    if (_id !== null && confirm("Are you sure you want to delete this post?")) {
      this.dataSvc.deletePost(_id).subscribe(res => {
        console.log(res);
        //TODO remove from the array using the ID as filter
        this.posts = this.posts.filter(post => post._id !== _id);
      }
      );
    }
  }

  onEdit() {
    //TODO we need to id of the post to edit, and then open a modal to edit it

  }
  //TODO bring back the posts from backend

}
