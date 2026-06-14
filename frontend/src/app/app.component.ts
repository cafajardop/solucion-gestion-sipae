import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <h1>Prueba Técnica de Gestión SIPAE</h1>
      <nav>
        <a routerLink="/crear" routerLinkActive="active">Nueva institución</a>
        <a routerLink="/" routerLinkActive="active"
           [routerLinkActiveOptions]="{ exact: true }">Instituciones</a>
        <a routerLink="/solucion" routerLinkActive="active">Solución</a>
        <a routerLink="/tecnologias" routerLinkActive="active">Tecnologías</a>
        <a [href]="swaggerUrl" target="_blank" rel="noopener">Swagger</a>
        <a [href]="githubUrl" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  githubUrl = 'https://github.com/cafajardop/solucion-gestion-sipae';
  swaggerUrl = environment.apiUrl.replace(/\/api$/, '') + '/swagger';
}
