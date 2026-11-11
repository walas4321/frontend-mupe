import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="acceso-denegado-container">
      <div class="acceso-denegado-content">
        <div class="icono-container">
          <i class="fas fa-ban"></i>
        </div>
        <h1>Acceso Denegado</h1>
        <p class="mensaje-principal">
          No tiene permisos para acceder a esta sección del sistema.
        </p>
        <p class="mensaje-secundario">
          Si considera que esto es un error, contacte al administrador del sistema.
        </p>
        <div class="botones-container">
          <button
            type="button"
            class="btn btn-primary"
            (click)="volverInicio()">
            <i class="fas fa-home me-2"></i>
            Volver al Inicio
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            (click)="volverAtras()">
            <i class="fas fa-arrow-left me-2"></i>
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .acceso-denegado-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      padding: 20px;
    }

    .acceso-denegado-content {
      text-align: center;
      max-width: 500px;
      background: white;
      padding: 3rem 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .icono-container {
      font-size: 4rem;
      color: #dc3545;
      margin-bottom: 1.5rem;
    }

    h1 {
      color: #dc3545;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .mensaje-principal {
      font-size: 1.1rem;
      color: #495057;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .mensaje-secundario {
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .botones-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: 500;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-outline-secondary {
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #6c757d;
    }

    .btn-outline-secondary:hover {
      background-color: #6c757d;
      color: white;
    }

    @media (max-width: 768px) {
      .acceso-denegado-content {
        padding: 2rem 1rem;
      }

      .botones-container {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class AccesoDenegadoComponent {

  constructor(private router: Router) {}

  volverInicio(): void {
    this.router.navigate(['/panel']);
  }

  volverAtras(): void {
    window.history.back();
  }
}