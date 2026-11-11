import { Component } from '@angular/core';
import { HeadersComponent } from "../../headers/headers.component";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-under-construction-component',
  standalone: true,
  imports: [HeadersComponent],
  templateUrl: './under-construction-component.component.html',
  styleUrl: './under-construction-component.component.scss'
})
export class UnderConstructionComponentComponent {

  pageName: string = 'Página';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) { }

  ngOnInit() {
    // Intenta obtener el nombre de la página desde los datos de la ruta
    this.route.data.subscribe(data => {
      if (data && data['title']) {
        this.pageName = data['title'];
      } else {
        // Intenta obtener desde el state del historial
        const navigation = this.route.snapshot.root.children[0];
        if (navigation && navigation.routeConfig && navigation.routeConfig.path) {
          // Formatea el slug para hacerlo más legible
          const path = navigation.routeConfig.path;
          this.pageName = this.formatPath(path);
        }
      }
    });

    // También verifica el historial del navegador para el título
    const currentNavigation = history.state;
    if (currentNavigation && currentNavigation.title) {
      this.pageName = currentNavigation.title;
    }
  }

  // Formatea un slug para hacerlo más legible
  formatPath(path: string): string {
    return path
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goBack() {
    this.location.back();
  }

}
