import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('f', { static: false }) form!: NgForm;
  post!: Post;
  postAvailable: boolean = false;
  constructor(private dataSvc: DataServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('id'))).subscribe(id => {
      console.log(id);
      if (id !== null) {
        this.dataSvc.getPost(id).subscribe(res => {
          this.post = res;
          console.log(this.post);
          this.postAvailable = true;
        });;
      }
    });
  }
  onSubmit(id: string | undefined) {
    if (id != undefined) {
      console.log('submited with: ' + this.form.value.post);
      this.dataSvc.editPost(id, { user: "Ali", post: this.form.value.post }).subscribe(res => {
        console.log(res);
        if (res.acknowledged !== undefined) {
          //tODO route to home page
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
