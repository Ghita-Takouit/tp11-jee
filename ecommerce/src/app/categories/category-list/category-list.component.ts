import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.list().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories', err)
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      this.categoryService.delete(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error('Error deleting category', err)
      });
    }
  }
}
