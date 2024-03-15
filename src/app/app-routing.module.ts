import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PsdchangeComponent } from './psdchange/psdchange.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { SugarmadeComponent } from './sugarmade/sugarmade.component';
import { JaggerymadeComponent } from './jaggerymade/jaggerymade.component';
import { DryfruitsComponent } from './dryfruits/dryfruits.component';
import { CombosavingComponent } from './combosaving/combosaving.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {path: 'register', component:RegisterComponent},
  { path: 'cart', component: CartComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'check-out', component: CheckoutComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'reset-psd', component: PsdchangeComponent },
  {path: 'account', component: AccountComponent},
  {path: 'sugarmade', component: SugarmadeComponent},
  {path:'jaggerymade', component: JaggerymadeComponent},
  {path: 'dryfruits', component: DryfruitsComponent},
  {path: 'combosaving', component: CombosavingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
