import { Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

export const routes: Routes = [
	{
		path: '',
		component: UserPageComponent
	},
	{
		path: '**',
		component: ErrorPageComponent
	}
];
