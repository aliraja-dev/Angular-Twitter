import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, Subject, throwError } from 'rxjs';

export interface PostResponse {
  acknowledged: boolean;
  insertedId: string;
}
@Injectable({ providedIn: 'root' })
export class DataServiceService {
  API_URL: string = 'http://localhost:3000/';

  postsSubject = new Subject<Post[]>();

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': 'localhost',
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  // });
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.API_URL + 'records').pipe(
      map((responseData: any) => {
        const postsArray: Post[] = [];
        for (let post of responseData) {
          postsArray.push({ ...post, id: post["_id"]! })
        }
        this.postsSubject.next(postsArray);
        return postsArray;
      })
    );

  }

  addPost(post: Post) {
    return this.http.post<PostResponse>(this.API_URL + 'record/add', post);
  }

  deletePost(id: string) {
    return this.http.delete(this.API_URL + id);
  }

  editPost(id: string, data: Post) {
    return this.http.post<PostResponse>(this.API_URL + 'update/' + id, data);
  }
  getPost(id: string) {
    return this.http.get<Post>(this.API_URL + 'record/' + id);
  }
}
