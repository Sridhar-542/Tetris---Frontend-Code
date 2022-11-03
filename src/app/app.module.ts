import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DemographicInfoComponent } from './demographic-info/demographic-info.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InstructionsComponent } from './instructions/instructions.component';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MainInstructionsComponent } from './main-instructions/main-instructions.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { TutorialInstructionsComponent } from './tutorial-instructions/tutorial-instructions.component';
@NgModule({
  declarations: [AppComponent, BoardComponent, WelcomeComponent, DemographicInfoComponent, FeedbackComponent, InstructionsComponent, MainInstructionsComponent, ThankyouComponent, TutorialInstructionsComponent],
  imports: [BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,CardModule,
    PanelModule,
    CheckboxModule,
    FormsModule,
    RadioButtonModule,
    DialogModule,
    ScrollPanelModule,
    InputTextModule,
    SelectButtonModule],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
