import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react';

export function Customers() {
  const customers = [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+254 712 345 678', orders: 4, spent: '$320.00', joined: 'Sep 10, 2026' },
    { id: '2', name: 'Michael Chen', email: 'm.chen@example.com', phone: '+254 722 987 654', orders: 1, spent: '$150.00', joined: 'Oct 02, 2026' },
    { id: '3', name: 'Emma Watson', email: 'emma.w@example.com', phone: '+254 733 456 123', orders: 12, spent: '$1,240.00', joined: 'Jan 15, 2026' },
    { id: '4', name: 'David Kim', email: 'dkim@example.com', phone: '+254 744 112 233', orders: 2, spent: '$140.00', joined: 'Oct 20, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-display text-luxury-black">Customer Directory</h1>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-luxury-dark/50" />
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            className="block w-full pl-10 pr-3 py-2 border border-luxury-sand rounded-md text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-luxury-sand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-luxury-sand">
            <thead className="bg-luxury-sand/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Customer Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Total Orders</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Total Spent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Joined Date</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-luxury-sand">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-luxury-sand/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold font-medium">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-luxury-black">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-luxury-dark/80 flex items-center gap-2 mb-1">
                      <Mail className="h-3 w-3" /> {customer.email}
                    </div>
                    <div className="text-sm text-luxury-dark/80 flex items-center gap-2">
                      <Phone className="h-3 w-3" /> {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">{customer.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{customer.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">{customer.joined}</td>
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
      </div>
    </div>
  );
}
