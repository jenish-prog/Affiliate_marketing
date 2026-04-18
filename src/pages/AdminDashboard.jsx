import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, LogOut, Package, Image as ImageIcon, Link as LinkIcon, DollarSign, Tag, TrendingUp, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchProducts, addProduct, updateProduct, deleteProduct, uploadImage } from '../lib/api';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    original_price: '',
    platform: 'Amazon',
    badge: '',
    affiliate_url: '',
    description: '',
    image_url: ''
  });
  const navigate = useNavigate();

  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Other'];
  const platforms = ['Amazon', 'Flipkart', 'Meesho', 'Other'];
  const badges = ['', 'Hot Deal', 'New', 'Limited', 'Sale'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    navigate('/admin');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: url }));
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Product updated!', { icon: '✅' });
      } else {
        await addProduct(formData);
        toast.success('Product added!', { icon: '✅' });
      }
      setIsModalOpen(false);
      loadProducts();
      resetForm();
    } catch (err) {
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted', { icon: '🗑️' });
      loadProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      original_price: '',
      platform: 'Amazon',
      badge: '',
      affiliate_url: '',
      description: '',
      image_url: ''
    });
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-72 bg-secondary text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/5">
          <div className="font-heading text-3xl font-extrabold tracking-tight">
            Deal<span className="text-primary">Hub</span>
          </div>
          <p className="text-gray-400 text-sm mt-2 font-medium">Admin Portal</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button className="w-full flex items-center gap-4 bg-primary/10 text-primary px-6 py-4 rounded-xl transition-colors font-bold tracking-wide">
            <Package size={22} /> Products
          </button>
          <button 
              onClick={openModal}
              className="w-full flex items-center gap-4 hover:bg-white/5 px-6 py-4 rounded-xl transition-colors text-gray-300 hover:text-white font-semibold"
            >
              <Plus size={22} /> Add New
            </button>
        </nav>
        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 text-red-400 hover:bg-red-500/10 px-6 py-4 rounded-xl transition-colors font-bold"
          >
            <LogOut size={22} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="font-heading text-4xl font-extrabold text-secondary mb-2 tracking-tight">Product Manager</h1>
              <p className="text-gray-500 font-medium">Manage your affiliate products and deals</p>
            </div>
            <button 
              onClick={openModal}
              className="btn-primary px-8 py-3.5 shadow-[0_8px_20px_rgba(255,107,53,0.3)] hover:-translate-y-1 transform transition-all font-bold tracking-wider flex items-center gap-2"
            >
              <Plus size={20} /> Add Product
            </button>
          </div>

          {/* Table */}
          <div className="bg-surface rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-border">
                    <th className="px-8 py-5 text-gray-400 font-bold uppercase tracking-wider text-sm">#</th>
                    <th className="px-8 py-5 text-gray-400 font-bold uppercase tracking-wider text-sm">Item</th>
                    <th className="px-8 py-5 text-gray-400 font-bold uppercase tracking-wider text-sm">Platform</th>
                    <th className="px-8 py-5 text-gray-400 font-bold uppercase tracking-wider text-sm">Price</th>
                    <th className="px-8 py-5 text-gray-400 font-bold uppercase tracking-wider text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {loading ? (
                    <tr><td colSpan="5" className="px-8 py-6 text-center text-gray-500">Loading...</td></tr>
                  ) : products.length === 0 ? (
                    <tr><td colSpan="5" className="px-8 py-6 text-center text-gray-500">No products found</td></tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p.id} className="hover:bg-primary-light/30 transition-colors group">
                        <td className="px-8 py-6 text-gray-400 font-medium">{p.id}</td>
                        <td className="px-8 py-6 flex items-center gap-5">
                          <img src={p.image_url || 'https://placehold.co/56x56/FF6B35/white?text=N/A'} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-border/50 shadow-sm" />
                          <div>
                            <div className="font-bold text-secondary line-clamp-1 max-w-[250px] mb-1">{p.name}</div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">{p.category}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center justify-center font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider ${
                              p.platform === 'Amazon' ? 'bg-[#FFF3E0] text-[#E65100]' : 
                              p.platform === 'Flipkart' ? 'bg-[#E3F2FD] text-[#1565C0]' : 
                              'bg-[#FCE4EC] text-[#AD1457]'
                            }`}>
                            {p.platform}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-bold text-secondary text-lg">{p.price}</div>
                          {p.original_price && <div className="text-gray-400 line-through text-sm font-medium">{p.original_price}</div>}
                        </td>
                        <td className="px-8 py-6 text-right whitespace-nowrap">
                          <button onClick={() => handleEdit(p)} className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-colors mr-3 shadow-sm" aria-label="Edit">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors shadow-sm" aria-label="Delete">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-surface relative z-10 w-full max-w-3xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="px-10 py-8 border-b border-border flex justify-between items-center bg-gray-50/50">
                <h2 className="font-heading text-2xl font-extrabold text-secondary tracking-tight">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 overflow-y-auto custom-scrollbar">
                <form id="productForm" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <Tag size={16} className="text-primary"/> Product Name
                      </label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary" placeholder="Enter product name" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary appearance-none bg-white">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <ImageIcon size={16} className="text-primary"/> Image Thumbnail
                      </label>
                      <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary" />
                      {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-xl" />}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-1">
                            <DollarSign size={16} className="text-accent"/> Price
                          </label>
                          <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="₹999" className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-medium text-secondary" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-gray-400">Original</label>
                          <input type="text" value={formData.original_price} onChange={(e) => setFormData({...formData, original_price: e.target.value})} placeholder="₹1999" className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-border focus:ring-4 focus:ring-gray-100 transition-all font-medium text-gray-400 line-through decoration-gray-300" />
                       </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                         <TrendingUp size={16} className="text-primary"/> Platform & Badge
                      </label>
                      <div className="grid grid-cols-2 gap-5">
                        <select value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary">
                          {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <select value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})} className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary">
                          {badges.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                         <LinkIcon size={16} className="text-primary"/> Affiliate Link
                      </label>
                      <input type="url" required value={formData.affiliate_url} onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})} placeholder="https://amazon.in/..." className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                      <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Highlight key features..." className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-secondary resize-none"></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-10 py-6 border-t border-border bg-gray-50 flex justify-end gap-4 mt-auto">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3.5 font-bold text-gray-500 hover:text-secondary hover:bg-gray-200 rounded-xl transition-all tracking-wide">
                  Cancel
                </button>
                <button form="productForm" type="submit" className="btn-primary px-10 py-3.5 font-bold tracking-wider shadow-[0_8px_20px_rgba(255,107,53,0.3)] hover:-translate-y-1 transform transition-all">
                  Save Product
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
