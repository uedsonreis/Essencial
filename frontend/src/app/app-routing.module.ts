import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductSaveComponent } from './components/product/product-save/product-save.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [ AuthService ] },
    { path: "products", component: ProductsComponent, canActivate: [ AuthService ] },
    { path: "products/create", component: ProductSaveComponent, canActivate: [ AuthService ] },
    { path: "products/update/:id", component: ProductSaveComponent, canActivate: [ AuthService ] },
    { path: "products/delete/:id", component: ProductDeleteComponent, canActivate: [ AuthService ] },
    { path: "cart", component: CartComponent, canActivate: [ AuthService ] },
    { path: "login", component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}