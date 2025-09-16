import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerModule } from './ui/container/container.module';
import { SharedModule } from './ui/@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './ui/common/navigation/navigation.component';
import { HeaderComponent } from './ui/common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
