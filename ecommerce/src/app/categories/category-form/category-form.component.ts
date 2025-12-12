import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  category: Category = { name: '', description: '' };
  isEditMode = false;
  categoryId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.categoryService.get(this.categoryId).subscribe({
        next: (data) => this.category = data,
        error: (err) => console.error('Error loading category', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.categoryId) {
      this.categoryService.update(this.categoryId, this.category).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => console.error('Error updating category', err)
      });
    } else {
      this.categoryService.create(this.category).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => console.error('Error creating category', err)
      });
    }
  }
}
