import { createElement, toggleClass } from './utils/dom.js';
import { validateForm } from './utils/form.js';

// DOM Elements
const productsTable = document.getElementById('productsTableBody');
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const closeModal = document.querySelector('.close');
const imagePreview = document.getElementById('imagePreview');
const imageUpload = document.getElementById('productImage');

// Sample Data (Replace with API calls later)
let products = JSON.parse(localStorage.getItem('products')) || [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 89.99,
    stock: 25,
    status: 'active',
    description: 'Noise-cancelling wireless headphones'
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 120.00,
    stock: 3,
    status: 'low-stock',
    description: 'Lightweight running shoes'
  }
];

const categories = ['Electronics', 'Clothing', 'Footwear', 'Home & Kitchen', 'Beauty'];

// Initialize Products Page
document.addEventListener('DOMContentLoaded', () => {
  renderProductsTable();
  populateCategoryDropdown();
  
  // Event Listeners
  addProductBtn.addEventListener('click', openProductModal);
  closeModal.addEventListener('click', closeProductModal);
  productForm.addEventListener('submit', handleProductSubmit);
  imageUpload.addEventListener('change', handleImageUpload);
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });
});

// Render Products Table
function renderProductsTable() {
  productsTable.innerHTML = '';
  
  products.forEach(product => {
    const row = createTableRow(product);
    productsTable.appendChild(row);
  });
}

// Create Table Row for Product
function createTableRow(product) {
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td>#${product.id}</td>
    <td>
      <div class="product-info">
        <img src="${product.image || '../public/images/placeholder.jpg'}" alt="${product.name}" width="40">
        <span>${product.name}</span>
      </div>
    </td>
    <td>${product.category}</td>
    <td>$${product.price.toFixed(2)}</td>
    <td>${product.stock}</td>
    <td><span class="status-badge ${product.status}">${getStatusText(product.status)}</span></td>
    <td class="action-buttons">
      <button class="btn-icon edit-btn" data-id="${product.id}">
        <i class="icon-edit"></i>
      </button>
      <button class="btn-icon delete-btn" data-id="${product.id}">
        <i class="icon-trash"></i>
      </button>
    </td>
  `;
  
  // Add event listeners to action buttons
  row.querySelector('.edit-btn').addEventListener('click', () => editProduct(product.id));
  row.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));
  
  return row;
}

// Get Status Text
function getStatusText(status) {
  const statusMap = {
    'active': 'Active',
    'draft': 'Draft',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock'
  };
  return statusMap[status] || status;
}

// Open Product Modal
function openProductModal(editMode = false, product = null) {
  if (editMode && product) {
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
    
    // Set category
    const categorySelect = document.getElementById('productCategory');
    for (let option of categorySelect.options) {
      if (option.value === product.category) {
        option.selected = true;
        break;
      }
    }
    
    // Set image preview
    if (product.image) {
      imagePreview.innerHTML = `<img src="${product.image}" alt="Preview">`;
    }
  } else {
    document.getElementById('modalTitle').textContent = 'Add New Product';
    productForm.reset();
    imagePreview.innerHTML = '';
  }
  
  productModal.style.display = 'flex';
}

// Close Product Modal
function closeProductModal() {
  productModal.style.display = 'none';
}

// Handle Form Submission
function handleProductSubmit(e) {
  e.preventDefault();
  
  if (!validateForm(productForm)) {
    return;
  }
  
  const productId = document.getElementById('productId').value;
  const productData = {
    id: productId ? parseInt(productId) : Date.now(),
    name: document.getElementById('productName').value,
    price: parseFloat(document.getElementById('productPrice').value),
    stock: parseInt(document.getElementById('productStock').value),
    category: document.getElementById('productCategory').value,
    description: document.getElementById('productDescription').value,
    status: document.getElementById('productStock').value > 5 ? 'active' : 'low-stock'
  };
  
  // Handle image upload
  if (imageUpload.files.length > 0) {
    const file = imageUpload.files[0];
    productData.image = URL.createObjectURL(file);
  }
  
  if (productId) {
    // Update existing product
    const index = products.findIndex(p => p.id === parseInt(productId));
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
    }
  } else {
    // Add new product
    products.push(productData);
  }
  
  // Update localStorage
  localStorage.setItem('products', JSON.stringify(products));
  
  // Refresh table
  renderProductsTable();
  closeProductModal();
}

// Edit Product
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    openProductModal(true, product);
  }
}

// Delete Product
function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductsTable();
  }
}

// Handle Image Upload
function handleImageUpload() {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    }
    
    reader.readAsDataURL(this.files[0]);
  }
}

// Populate Category Dropdown
function populateCategoryDropdown() {
  const categorySelect = document.getElementById('productCategory');
  const filterSelect = document.getElementById('categoryFilter');
  
  categories.forEach(category => {
    const option = createElement('option', null, category);
    option.value = category;
    categorySelect.appendChild(option.cloneNode(true));
    
    const filterOption = option.cloneNode(true);
    filterSelect.appendChild(filterOption);
  });
}