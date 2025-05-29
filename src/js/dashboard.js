// DOM Elements
const statsContainer = document.querySelector('.stats-grid');
const ordersTable = document.querySelector('.recent-orders tbody');

// Sample Data (Will be replaced with real API calls)
const dashboardData = {
  stats: [
    { id: 1, value: '$12,427', label: 'Revenue', trend: '+12%' },
    { id: 2, value: '1,892', label: 'Orders', trend: '+5%' },
    { id: 3, value: '72%', label: 'Conversion', trend: '+3%' }
  ],
  orders: [
    { id: '#ORD-007', customer: 'Alex Johnson', status: 'Delivered', amount: '$128' },
    { id: '#ORD-008', customer: 'Sarah Miller', status: 'Processing', amount: '$254' },
    { id: '#ORD-009', customer: 'Mike Peterson', status: 'Pending', amount: '$87' }
  ]
};

// Render Stats Cards
function renderStats() {
  statsContainer.innerHTML = dashboardData.stats.map(stat => `
    <div class="stat-card">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
      <div class="stat-trend positive">↑ ${stat.trend}</div>
    </div>
  `).join('');
}

// Render Orders Table
function renderOrders() {
  ordersTable.innerHTML = dashboardData.orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
      <td>${order.amount}</td>
    </tr>
  `).join('');
}

// Initialize Chart
function initChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  // Chart.js implementation will go here
  console.log('Chart initialized');
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderOrders();
  initChart();
  
  // Responsive sidebar toggle
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.dashboard-sidebar').classList.toggle('collapsed');
  });
});