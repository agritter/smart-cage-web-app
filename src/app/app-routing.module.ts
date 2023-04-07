import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './audio/audio.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthorizationGuard } from './authorization.guard';
import { HomeComponent } from './home/home.component';
import { LightComponent } from './light/light.component';

const routes: Routes = [
  { path: 'signIn', component: AuthenticationComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [() => inject(AuthorizationGuard).canActivate()],

    children: [
      { path: "light", component: LightComponent },
      { path: "audio", component: AudioComponent },
      { path: '**', redirectTo: "audio" },
    ]
  },
  { path: '**', redirectTo: "light" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
