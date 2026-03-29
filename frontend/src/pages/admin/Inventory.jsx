import { Plus, Search, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

export function Inventory() {
  const products = [
    { id: '1', name: 'Midnight Oud', brand: 'Scentcepts Exclusive', stock: 45, d_price: 15.00, f_price: 150.00, status: 'Active' },
    { id: '2', name: 'Velvet Rose', brand: 'Maison', stock: 12, d_price: 12.50, f_price: 120.00, status: 'Active' },
    { id: '3', name: 'Sandalwood Whisper', brand: 'Luxe Fragrance', stock: 28, d_price: 18.00, f_price: 180.00, status: 'Active' },
    { id: '4', name: 'Oceanic Citrus', brand: 'Aqua', stock: 0, d_price: 10.00, f_price: 95.00, status: 'Out of Stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-display text-luxury-black">Inventory</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-luxury-black text-white rounded-md text-sm font-medium hover:bg-luxury-gold transition-colors">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-luxury-sand overflow-hidden">
        <div className="p-4 border-b border-luxury-sand flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-luxury-dark/50" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-luxury-sand rounded-md text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-cream/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-luxury-sand">
            <thead className="bg-luxury-sand/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Brand</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Decant</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Full Bottle</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-luxury-dark uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-luxury-sand">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-luxury-sand/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-luxury-black">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${product.stock < 10 && product.stock > 0 ? 'text-yellow-600' : product.stock === 0 ? 'text-red-600' : 'text-luxury-black'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">${product.d_price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark/80">${product.f_price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase tracking-wider
                      ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-luxury-dark/50 hover:text-luxury-gold transition-colors" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-luxury-dark/50 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
