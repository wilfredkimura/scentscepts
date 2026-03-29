import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { name: 'Gross Revenue', value: '$12,450.00', change: '+12%', icon: DollarSign },
    { name: 'Total Orders', value: '145', change: '+5%', icon: ShoppingCart },
    { name: 'Active Customers', value: '1,024', change: '+18%', icon: Users },
    { name: 'Conversion Rate', value: '3.2%', change: '+1%', icon: TrendingUp },
  ];

  const recentOrders = [
    { id: 'ORD-1001', customer: 'Sarah Jenkins', amount: '$45.00', status: 'Pending', date: 'Oct 24, 2026' },
    { id: 'ORD-1002', customer: 'Michael Chen', amount: '$150.00', status: 'Processing', date: 'Oct 23, 2026' },
    { id: 'ORD-1003', customer: 'Emma Watson', amount: '$30.00', status: 'Shipped', date: 'Oct 23, 2026' },
    { id: 'ORD-1004', customer: 'David Kim', amount: '$95.00', status: 'Delivered', date: 'Oct 22, 2026' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded shadow-sm border border-luxury-sand relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Icon className="w-16 h-16" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-luxury-dark text-sm font-medium">{stat.name}</h3>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-display text-luxury-black">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Chart placeholder */}
        <div className="lg:col-span-2 bg-white rounded shadow-sm border border-luxury-sand p-6">
          <h3 className="text-luxury-black font-medium mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-luxury-sand/30 rounded border border-dashed border-luxury-sand">
             <p className="text-luxury-dark/50 text-sm">Revenue Chart Visualization (Coming Soon)</p>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white rounded shadow-sm border border-luxury-sand p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-luxury-black font-medium">Recent Orders</h3>
            <a href="/admin/orders" className="text-xs text-luxury-gold hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 hover:bg-luxury-sand/30 rounded transition-colors">
                <div>
                  <p className="text-sm font-medium text-luxury-black">{order.customer}</p>
                  <p className="text-xs text-luxury-dark/60">{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-luxury-black">{order.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
