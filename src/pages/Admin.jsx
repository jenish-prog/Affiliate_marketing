import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { ADMIN_PASSWORD } from '../lib/supabase'
import { fetchProducts, addProduct, updateProduct, deleteProduct, uploadImage } from '../lib/api'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    affiliate_url: '',
    platform: 'Amazon',
    category: 'Electronics',
    price: '',
    original_price: '',
    badge: ''
  })

  const platforms = ['Amazon', 'Flipkart', 'Meesho', 'Other']
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Other']
  const badges = ['', 'Hot Deal', 'New', 'Limited', 'Sale']

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadProducts()
    }
  }, [])

  const loadProducts = async () => {
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      loadProducts()
    } else {
      toast.error('Invalid password')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const url = await uploadImage(file)
      setFormData({ ...formData, image_url: url })
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error('Image upload failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
        toast.success('Product updated!')
      } else {
        await addProduct(formData)
        toast.success('Product added!')
      }
      setFormData({
        name: '',
        description: '',
        image_url: '',
        affiliate_url: '',
        platform: 'Amazon',
        category: 'Electronics',
        price: '',
        original_price: '',
        badge: ''
      })
      setEditingProduct(null)
      loadProducts()
    } catch (err) {
      toast.error('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData(product)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      toast.success('Product deleted!')
      loadProducts()
    } catch (err) {
      toast.error('Failed to delete product')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <Toaster />
        <form onSubmit={handleLogin} className="login-form">
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Toaster />
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        
        <div className="form-row">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            type="file"
            onChange={handleImageUpload}
            className="form-input"
            accept="image/*"
          />
          <input
            type="text"
            placeholder="Image URL (or upload above)"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            type="url"
            placeholder="Affiliate URL"
            value={formData.affiliate_url}
            onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
            className="form-input"
            required
          />
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="form-input"
          >
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="form-row">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="form-input"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text"
            placeholder="Price (e.g. ₹999)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Original Price (e.g. ₹1999)"
            value={formData.original_price}
            onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <select
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="form-input"
          >
            {badges.map(b => <option key={b} value={b}>{b || 'No Badge'}</option>)}
          </select>
          <button type="submit" className="submit-btn">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => {
              setEditingProduct(null)
              setFormData({
                name: '',
                description: '',
                image_url: '',
                affiliate_url: '',
                platform: 'Amazon',
                category: 'Electronics',
                price: '',
                original_price: '',
                badge: ''
              })
            }} className="cancel-btn">Cancel</button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h3>All Products ({products.length})</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Platform</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td><img src={product.image_url} alt="" className="table-image" /></td>
                  <td>{product.name}</td>
                  <td>{product.platform}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Admin