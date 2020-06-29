import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators';
import { Subject,throwError } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class PostsService{
  error=new Subject<string>();
  constructor(private http:HttpClient){}
  createAndStorePost(title:string,content:string){
    const postData:Post={
      title:title,
      content:content
    };
    this.http
    .post<{name:string}>(
      'https://ng-complete-guide-8c3dc.firebaseio.com/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    },error=>{
      this.error.next(error.message);
    });
  }
  fetchPost(){
   return this.http
    .get('https://ng-complete-guide-8c3dc.firebaseio.com/posts.json',{
      headers:new HttpHeaders({'Custom-Header':'Hello My Name Is Yash Sanghavi'}),
      params:new HttpParams().set('print','pretty')
    })
    .pipe(
      map((responseData:{[key:string]:Post})=>{
        const postsArray:Post[]=[];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key],id:key});
          }
        }
        return postsArray;
      }),
      catchError(errorRes=>{
        //Send To Analytics Server
        return throwError(errorRes);
      })
    );
  }

  deletePost(){
    return this.http.delete('https://ng-complete-guide-8c3dc.firebaseio.com/posts.json');
  }
}
