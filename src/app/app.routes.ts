import { Routes } from '@angular/router';
import { NotLazyLoadedComponent } from './not-lazy-loaded/not-lazy-loaded.component';
import { paramsIdComponent } from './paramsId/paramsId.component';
import { QueryparamsComponent } from './queryparams/queryparams.component';

export const routes: Routes = [
    {
        path: 'custom', loadComponent: () => import('./lazy-loaded/lazy-loaded.component').then(m => m.LazyLoadedComponent)
    },
    {
        path: 'not-lazy-loaded', component: NotLazyLoadedComponent
    },
    {
        path: 'employees/:id', component: paramsIdComponent
    },
    {
        path: 'queryparams', component: QueryparamsComponent
    }
];
