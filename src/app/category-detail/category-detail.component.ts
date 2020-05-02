import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  category: Category = { _id: '', cat_name: '', updated_at: null  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getCategoryDetails(this.route.snapshot.params['id']);
  }

  getCategoryDetails(id) {
    this.api.getCategory(id)
      .subscribe(data => {
        this.category = data;
        console.log(this.category);
        this.isLoadingResults = false;
      });
  }

  deleteCategory(id) {
    this.isLoadingResults = true;
    this.api.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/categories']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
