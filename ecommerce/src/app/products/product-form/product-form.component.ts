import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../product.service';
import { CategoryService } from '../../categories/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, stock: 0 };
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.productService.get(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.selectedCategoryId = data.category?.id || null;
        },
        error: (err) => console.error('Error loading product', err)
      });
    }
  }

  loadCategories(): void {
    this.categoryService.list().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories', err)
    });
  }

  onSubmit(): void {
    const productToSave: any = {
      name: this.product.name,
      price: this.product.price,
      stock: this.product.stock,
      category: this.selectedCategoryId ? { id: this.selectedCategoryId } : null
    };

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, productToSave).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error updating product', err)
      });
    } else {
      this.productService.create(productToSave).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error creating product', err)
      });
    }
  }
}
