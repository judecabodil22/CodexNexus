import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Calendar, Tag, DollarSign, Save, X, Search, Coffee, Car, Home, Zap, Film, ShoppingBag, Heart, HelpCircle } from 'lucide-react';

const CategoryIcons = {
  Food: Coffee,
  Transport: Car,
  Housing: Home,
  Utilities: Zap,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Health: Heart,
  Other: HelpCircle
};

export default function CRUD({ expenses, onRefresh, showToast, token }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingId || 0
    };

    try {
      const url = editingId ? `/api/Expenses/${editingId}` : '/api/Expenses';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expense)
      });

      if (response.ok || response.status === 204) {
        onRefresh();
        resetForm();
        showToast(editingId ? 'Transaction updated successfully!' : 'Transaction added successfully!');
      } else {
        showToast('Failed to save transaction.', 'error');
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      showToast('An error occurred.', 'error');
    }
  };

  const resetForm = () => {
    setFormData({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (expense) => {
    setFormData({
      description: expense.description || '',
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split('T')[0]
    });
    setEditingId(expense.id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      const response = await fetch(`/api/Expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        onRefresh();
        showToast('Transaction deleted.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      showToast('Failed to delete transaction.', 'error');
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
            />
          </div>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="btn-primary-custom flex items-center gap-2 whitespace-nowrap"
          >
            {isFormVisible ? <X size={20} /> : <Plus size={20} />}
            {isFormVisible ? 'Close' : 'Add New'}
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className={`transition-all duration-300 overflow-hidden ${isFormVisible ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            {editingId ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Tag className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="input-field pl-10"
                  required
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  step="0.01"
                  className="input-field pl-10"
                  required
                />
              </div>
              <div className="relative">
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field appearance-none"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {Object.keys(CategoryIcons).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-4 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={resetForm} className="btn-secondary-custom">Cancel</button>
              <button type="submit" className="btn-primary-custom flex items-center gap-2">
                <Save size={18} />
                {editingId ? 'Update Transaction' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transactions List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Amount</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => {
                  const Icon = CategoryIcons[expense.category] || HelpCircle;
                  return (
                    <tr key={expense.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                            <Icon size={18} />
                          </div>
                          <span className="font-medium text-slate-700">{expense.category}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-600">{expense.description}</td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(expense.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4 text-right font-bold text-slate-700">
                        -${expense.amount.toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(expense)} className="btn-icon text-blue-500 hover:bg-blue-50" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(expense.id)} className="btn-icon text-red-500 hover:bg-red-50" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={48} className="text-slate-200" />
                      <p>No transactions found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}