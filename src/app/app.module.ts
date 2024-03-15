import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './topbar/topbar.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CartService } from './pages/cart/cart.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PsdchangeComponent } from './psdchange/psdchange.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JaggerymadeComponent } from './jaggerymade/jaggerymade.component';
import { SugarmadeComponent } from './sugarmade/sugarmade.component';
import { DryfruitsComponent } from './dryfruits/dryfruits.component';
import { CombosavingComponent } from './combosaving/combosaving.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    CartComponent,
    TopbarComponent,
    FaqsComponent,
    CheckoutComponent,
    GalleryComponent,
    PsdchangeComponent,
    AccountComponent,
    RegisterComponent,
    JaggerymadeComponent,
    SugarmadeComponent,
    DryfruitsComponent,
    CombosavingComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    CartService,
    provideAnimationsAsync()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
