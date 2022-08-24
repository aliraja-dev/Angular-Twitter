import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DataServiceService {
  API_URL: string = 'http://localhost:3000/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'localhost',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.API_URL + 'records').pipe(
      map((responseData: any) => {
        const postsArray: Post[] = [];
        for (let post of responseData) {
          postsArray.push({ ...post, id: post["_id"]! })
        }
        return postsArray;
      })
    );

  }

  addPost(post: Post) {
    return this.http.post(this.API_URL + 'record/add', post);
  }

  // deleteTaskfromMongoDb(id: string) {
  //   return this.http.delete('http://localhost:5000/' + id);
  // }
  // editTaskOnMongoDb(id: string, data: Task) {
  //   return this.http.post('http://localhost:5000/update/' + id, data);
  // }
}
