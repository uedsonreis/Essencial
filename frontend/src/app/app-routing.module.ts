import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductSaveComponent } from './components/product/product-save/product-save.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/create", component: ProductSaveComponent },
    { path: "products/update/:id", component: ProductSaveComponent },
    { path: "products/delete/:id", component: ProductDeleteComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}