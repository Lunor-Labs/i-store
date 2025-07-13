import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { usePhones } from '../hooks/usePhones';
import { phoneModels, getStoragePriceMultiplier } from '../data/phoneModels';
import { Phone } from '../types/Phone';

interface AddPhoneFormProps {
  onClose: () => void;
  editPhone?: Phone;
}

const AddPhoneForm: React.FC<AddPhoneFormProps> = ({ onClose, editPhone }) => {
  const [formData, setFormData] = useState({
    imei: editPhone?.imei || '',
    model: editPhone?.model || '',
    color: editPhone?.color || '',
    storage: editPhone?.storage || '',
    price: editPhone?.price.toString() || '',
    imageUrl: editPhone?.imageUrl || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addPhone, updatePhone } = usePhones();
  
  const isEditing = !!editPhone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.imei || !formData.model || !formData.color || !formData.storage || !formData.price) {
        throw new Error('All fields are required');
      }

      if (!isEditing && formData.imei.length !== 15) {
        throw new Error('IMEI must be exactly 15 digits');
      }

      if (isEditing) {
        await updatePhone(formData.imei, {
          model: formData.model,
          color: formData.color,
          storage: formData.storage,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl
        });
      } else {
        await addPhone({
          imei: formData.imei,
          model: formData.model,
          color: formData.color,
          storage: formData.storage,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          status: 'available'
        });
      }

      setFormData({ imei: '', model: '', color: '', storage: '', price: '', imageUrl: '' });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isEditing ? 'update' : 'add'} phone`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-calculate price and image when model, storage changes
      if (name === 'model' || name === 'storage') {
        const selectedModel = phoneModels.find(m => m.name === (name === 'model' ? value : newData.model));
        if (selectedModel && newData.storage) {
          const multiplier = getStoragePriceMultiplier(newData.storage);
          newData.price = Math.round(selectedModel.basePrice * multiplier).toString();
          newData.imageUrl = selectedModel.imageUrl;
        }
        // Reset color when model changes
        if (name === 'model') {
          newData.color = '';
        }
      }
      
      return newData;
    });
  };

  const selectedModel = phoneModels.find(m => m.name === formData.model);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Edit iPhone' : 'Add New iPhone'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-slate-700 mb-1">
                Model Name
              </label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a model</option>
                {phoneModels.map(model => (
                  <option key={model.name} value={model.name}>{model.name}</option>
                ))}
              </select>
            </div>

            {selectedModel && (
              <>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-slate-700 mb-1">
                    Color
                  </label>
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a color</option>
                    {selectedModel.colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
            <div>
              <label htmlFor="imei" className="block text-sm font-medium text-slate-700 mb-1">
                IMEI Number
              </label>
              <input
                type="text"
                id="imei"
                name="imei"
                value={formData.imei}
                onChange={handleChange}
                maxLength={15}
                pattern="[0-9]{15}"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="123456789012345"
                disabled={isEditing}
                required
              />
              {!isEditing && (
                <p className="text-xs text-slate-500 mt-1">Must be exactly 15 digits</p>
              )}
            </div>

                <div>
                  <label htmlFor="storage" className="block text-sm font-medium text-slate-700 mb-1">
                    Storage
                  </label>
                  <select
                    id="storage"
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select storage</option>
                    {selectedModel.storageOptions.map(storage => (
                      <option key={storage} value={storage}>{storage}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
                Price (Rs)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="229900"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Price will auto-calculate based on model and storage</p>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Update Phone</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Add Phone</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhoneForm;