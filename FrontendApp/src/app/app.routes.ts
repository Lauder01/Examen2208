import { Routes } from '@angular/router';
import { MountainListComponent } from './components/mountain-list/mountain-list.component';
import { MountainDetailComponent } from './components/mountain-detail/mountain-detail.component';

export const routes: Routes = [
	{ path: '', component: MountainListComponent },
	{ path: 'mountain/:id', component: MountainDetailComponent },
];
