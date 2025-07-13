import React from 'react';
import { Search, Filter, Shield, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PhoneCard from '../components/PhoneCard';
import { usePhones } from '../hooks/usePhones';

const ViewerPage: React.FC = () => {
  const { phones, loading } = usePhones();
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const availablePhones = phones.filter(phone => 
    phone.status === 'available' && 
    phone.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Available iPhones</h1>
            <p className="text-slate-600">Browse our current inventory of premium devices</p>
          </div>
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ml-4"
          >
            <Shield className="h-4 w-4" />
            <span>Store Login</span>
          </button>
        </div>


        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {availablePhones.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No phones found</h3>
            <p className="text-slate-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new inventory'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePhones.map((phone) => (
              <PhoneCard key={phone.imei} phone={phone} />
            ))}
          </div>
        )}

        <div className="text-center text-sm text-slate-500">
          Showing {availablePhones.length} available device{availablePhones.length !== 1 ? 's' : ''}
        </div>
      </div>
    </Layout>
  );
};

export default ViewerPage;