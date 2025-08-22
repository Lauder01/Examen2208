import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MountainService, Mountain } from '../../services/mountain.service';

@Component({
  selector: 'app-mountain-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mountain-detail.component.html',
  styleUrls: ['./mountain-detail.component.css']
})
export class MountainDetailComponent implements OnInit {
  mountain: Mountain | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mountainService: MountainService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMountain(+id);
    }
  }

  loadMountain(id: number) {
    this.mountainService.getMountainById(id).subscribe({
      next: (mountain: Mountain) => {
        this.mountain = mountain;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading mountain:', error);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
