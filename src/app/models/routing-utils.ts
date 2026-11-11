import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { Microfrontend } from './microfrontend';
import { routes } from '../app.routes';

/**
 * Builds the routes for the microfrontends
 * @param options
 * @returns
 * @example
 **/
export function buildRoutes(options: Microfrontend[]): Routes {
    const lazyRoutes: Routes = options.map(o => ({
        path: o.routePath,
        loadChildren: () => loadRemoteModule(o).then(m => m[o.ngModuleName])
    }));
    const children = routes[1].children || [];
    routes[1].children = [...children, ...lazyRoutes]
    return routes;
}
