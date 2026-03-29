import { MoreHorizontal, Search, Filter } from 'lucide-react';

export function Orders() {
  const orders = [
    { id: 'ORD-1001', customer: 'Sarah Jenkins', amount: '$45.00', status: 'Pending', date: 'Oct 24, 2026', items: 1 },
    { id: 'ORD-1002', customer: 'Michael Chen', amount: '$150.00', status: 'Processing', date: 'Oct 23, 2026', items: 3 },
    { id: 'ORD-1003', customer: 'Emma Watson', amount: '$30.00', status: 'Shipped', date: 'Oct 23, 2026', items: 2 },
    { id: 'ORD-1004', customer: 'David Kim', amount: '$95.00', status: 'Delivered', date: 'Oct 22, 2026', items: 1 },
    { id: 'ORD-1005', customer: 'Olivia Martinez', amount: '$210.00', status: 'Delivered', date: 'Oct 20, 2026', items: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-display text-luxury-black">Orders Management</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-luxury-dark/50" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="block w-full pl-10 pr-3 py-2 border border-luxury-sand rounded-md text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-luxury-sand rounded-md text-sm font-medium text-luxury-dark hover:bg-luxury-sand/30 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-luxury-sand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-luxury-sand">
            <thead className="bg-luxury-sand/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Total</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-luxury-sand">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-luxury-sand/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-black">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase tracking-wider
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-luxury-dark/50 hover:text-luxury-gold transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-luxury-sand flex items-center justify-between">
          <p className="text-sm text-luxury-dark/70">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
          </p>
          <div className="flex space-x-2 border border-luxury-sand rounded overflow-hidden">
            <button className="px-3 py-1 bg-white hover:bg-luxury-sand transition-colors text-luxury-dark text-sm border-r border-luxury-sand border-collapse border-spacing-0 border-spacing-x-0 border-spacing-y-0 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-white hover:bg-luxury-sand transition-colors text-luxury-dark text-sm border-l border-luxury-sand border-spacing-0 border-spacing-x-0 border-spacing-y-0 border-collapse">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
