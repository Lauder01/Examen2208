import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MountainService, Mountain } from '../../services/mountain.service';

@Component({
  selector: 'app-mountain-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mountain-list.component.html',
  styleUrls: ['./mountain-list.component.css']
})
export class MountainListComponent implements OnInit {
  mountains: Mountain[] = [];
  page = 1;
  pageSize = 10;
  total = 0;
  filters = {
    name: '',
    location: '',
    minHeight: undefined as number | string | undefined,
    maxHeight: undefined as number | string | undefined
  };
  pageSizeOptions = [5, 10, 15, 20, 50];
  loading = false;
  error = '';

  constructor(
    private mountainService: MountainService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMountains();
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize) || 1;
  }

  loadMountains() {
    this.loading = true;
    this.error = '';

    // Convertir valores a números si existen, o undefined si están vacíos
    const minHeight = this.filters.minHeight !== null && this.filters.minHeight !== undefined && this.filters.minHeight !== ''
      ? Number(this.filters.minHeight) : undefined;
    const maxHeight = this.filters.maxHeight !== null && this.filters.maxHeight !== undefined && this.filters.maxHeight !== ''
      ? Number(this.filters.maxHeight) : undefined;

    const queryParams = {
      page: this.page,
      pageSize: this.pageSize,
      name: this.filters.name || undefined,
      location: this.filters.location || undefined,
      minHeight: minHeight,
      maxHeight: maxHeight
    };

    console.log('Enviando filtros:', queryParams);

    this.mountainService.getMountains(queryParams).subscribe({
      next: (res) => {
        this.mountains = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando montañas:', err);
        this.error = 'Error al cargar las montañas. Verificar que la API esté funcionando.';
        this.loading = false;
      }
    });
  }

  applyFilters(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.page = 1;
    this.loadMountains();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadMountains();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadMountains();
    }
  }

  clearFilters() {
    this.filters = {
      name: '',
      location: '',
      minHeight: undefined,
      maxHeight: undefined
    };
    this.page = 1;
    this.loadMountains();
  }

  trackByMountain(index: number, mountain: Mountain): number {
    return mountain.id;
  }

  onPageSizeChange() {
    this.page = 1;
    this.loadMountains();
  }

  viewMountainDetail(mountainId: number) {
    this.router.navigate(['/mountain', mountainId]);
  }
}
