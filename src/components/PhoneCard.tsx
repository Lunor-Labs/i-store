import React from 'react';
import { Phone } from '../types/Phone';
import { CheckCircle, XCircle, Palette, HardDrive, Edit, Trash2 } from 'lucide-react';

interface PhoneCardProps {
  phone: Phone;
  isAdmin?: boolean;
  onStatusChange?: (imei: string, status: 'available' | 'sold') => void;
  onEdit?: (phone: Phone) => void;
  onDelete?: (imei: string) => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, isAdmin = false, onStatusChange, onEdit, onDelete }) => {
  const isAvailable = phone.status === 'available';

  const handleStatusToggle = () => {
    if (onStatusChange) {
      onStatusChange(phone.imei, isAvailable ? 'sold' : 'available');
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${
      isAvailable ? 'border-green-200 hover:border-green-300' : 'border-slate-200'
    }`}>
      <div className="aspect-square overflow-hidden rounded-t-xl">
        <img 
          src={phone.imageUrl} 
          alt={phone.model}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{phone.model}</h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Palette className="h-3 w-3" />
                <span>{phone.color}</span>
              </div>
              <div className="flex items-center space-x-1">
                <HardDrive className="h-3 w-3" />
                <span>{phone.storage}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-mono">{phone.imei}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            {isAvailable ? 'Available' : 'Sold'}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-slate-500">Rs</span>
            <span className="text-xl font-bold text-slate-900">
              {phone.price.toLocaleString('en-LK')}
            </span>
          </div>
          
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit && onEdit(phone)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit phone"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete && onDelete(phone.imei)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete phone"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleStatusToggle}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAvailable
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                {isAvailable ? (
                  <>
                    <XCircle className="h-3 w-3" />
                    <span>Sold</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    <span>Available</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;