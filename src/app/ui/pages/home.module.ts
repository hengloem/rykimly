import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';
import { ProgressModule } from '../common/progress/progress.module';
import { SuccessModule } from '../common/success/success.module';
import { AboutComponent } from './about/about.component';
import { SkillComponent } from './skill/skill.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { TrainingComponent } from './training/training.component';
import { LanguageComponent } from './language/language.component';
import { ReferenceComponent } from './reference/reference.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    SkillComponent,
    ExperienceComponent,
    EducationComponent,
    TrainingComponent,
    LanguageComponent,
    ReferenceComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ProgressModule,
    SuccessModule
  ],
  providers: [],
})
export class HomeModule { }
