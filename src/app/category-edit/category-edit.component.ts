import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  categoryForm: FormGroup;
  _id:string='';
  cat_name:string='';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategory(this.route.snapshot.params['id']);
    this.categoryForm = this.formBuilder.group({
      'cat_name' : [null, Validators.required],
    });
  }

  getCategory(id) {
    this.api.getCategory(id).subscribe(data => {
      this._id = data._id;
      this.categoryForm.setValue({
        cat_name: data.cat_name,
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateCategory(this._id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/category-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  categoryDetails() {
    this.router.navigate(['/category-details', this._id]);
  }

}
