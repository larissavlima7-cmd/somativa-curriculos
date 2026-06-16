import { Routes } from '@angular/router';
import { Curriculos } from './view/curriculos/curriculos';
import { TodosCurriculos } from './view/todos-curriculos/todos-curriculos';

export const routes: Routes = [
  { path: '', component: Curriculos },
  { path: 'curriculos', component: TodosCurriculos},
];
