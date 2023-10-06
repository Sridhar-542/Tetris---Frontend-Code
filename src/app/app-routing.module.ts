import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { DemographicInfoComponent } from './demographic-info/demographic-info.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { MainInstructionsComponent } from './main-instructions/main-instructions.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { TutorialInstructionsComponent } from './tutorial-instructions/tutorial-instructions.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
{ path: 'tetris', component: BoardComponent },
{ path: '', redirectTo:'/home', pathMatch: 'full'},
{ path: 'home', component: WelcomeComponent},
{ path: 'info', component: DemographicInfoComponent },
{ path: 'feedback', component: FeedbackComponent },
{ path: 'instructions', component: InstructionsComponent},
{ path: 'tutInstructions', component: TutorialInstructionsComponent},
{path:'gameInstr',component:MainInstructionsComponent},
{path:'thankyou',component:ThankyouComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }