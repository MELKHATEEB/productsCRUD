import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'List of Categories' }
  },
  {
    path: 'category-details/:id',
    component: CategoryDetailComponent,
    data: { title: 'Category Details' }
  },
  {
    path: 'category-add',
    component: CategoryAddComponent,
    data: { title: 'Add Category' }
  },
  {
    path: 'category-edit/:id',
    component: CategoryEditComponent,
    data: { title: 'Edit Category' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
