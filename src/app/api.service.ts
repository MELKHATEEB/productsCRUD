import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const productApiUrl = "http://localhost:3000/api/v1/products";
const categoryApiUrl = "http://localhost:3000/api/v1/categories";
// const productApiUrl = "https://mo-test-sample.firebaseio.com/products.json";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(productApiUrl)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${productApiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct (product): Observable<Product> {
    return this.http.post<Product>(productApiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (id, product): Observable<any> {
    const url = `${productApiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<Product> {
    const url = `${productApiUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(categoryApiUrl)
      .pipe(
        tap(categories => console.log('Fetch categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${categoryApiUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => console.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  addCategory (category): Observable<Category> {
    return this.http.post<Category>(categoryApiUrl, category, httpOptions).pipe(
      tap((category: Category) => console.log(`added category w/ id=${category._id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  updateCategory (id, category): Observable<any> {
    const url = `${categoryApiUrl}/${id}`;
    return this.http.put(url, category, httpOptions).pipe(
      tap(_ => console.log(`updated category id=${id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  deleteCategory (id): Observable<Category> {
    const url = `${categoryApiUrl}/${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
