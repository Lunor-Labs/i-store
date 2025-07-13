import React, { useState } from 'react';
import { Plus, Smartphone, Package, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import PhoneCard from '../components/PhoneCard';
import AddPhoneForm from '../components/AddPhoneForm';
import { usePhones } from '../hooks/usePhones';
import { Phone } from '../types/Phone';

const AdminDashboard: React.FC = () => {
  const { phones, stats, loading, updatePhoneStatus, deletePhone } = usePhones();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState<Phone | undefined>(undefined);

  const handleStatusChange = async (imei: string, status: 'available' | 'sold') => {
    try {
      await updatePhoneStatus(imei, status);
    } catch (error) {
      console.error('Failed to update phone status:', error);
    }
  };

  const handleEdit = (phone: Phone) => {
    setEditingPhone(phone);
    setShowAddForm(true);
  };

  const handleDelete = async (imei: string) => {
    if (window.confirm('Are you sure you want to delete this phone?')) {
      try {
        await deletePhone(imei);
      } catch (error) {
        console.error('Failed to delete phone:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingPhone(undefined);
  };

  if (loading) {
    return (
      <Layout showAdminNav>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout showAdminNav>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Overview of your iPhone inventory</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add iPhone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Devices"
            value={stats.totalDevices}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Available"
            value={stats.availableCount}
            icon={Smartphone}
            color="green"
          />
          <StatsCard
            title="Sold"
            value={stats.soldCount}
            icon={TrendingUp}
            color="orange"
            subtitle={`${stats.weeklySales} this week`}
          />
          <StatsCard
            title="Total Revenue"
            value={`Rs ${stats.totalRevenue.toLocaleString('en-LK')}`}
            icon={DollarSign}
            color="purple"
            subtitle={`Rs ${stats.monthlyRevenue.toLocaleString('en-LK')} this month`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatsCard
            title="Weekly Sales"
            value={stats.weeklySales}
            icon={Calendar}
            color="green"
            subtitle={`Rs ${stats.weeklyRevenue.toLocaleString('en-LK')} revenue`}
          />
          <StatsCard
            title="Monthly Sales"
            value={stats.monthlySales}
            icon={Calendar}
            color="blue"
            subtitle={`Rs ${stats.monthlyRevenue.toLocaleString('en-LK')} revenue`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Inventory</h2>
            <span className="text-sm text-slate-500">{phones.length} total devices</span>
          </div>

          {phones.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No devices yet</h3>
              <p className="text-slate-500 mb-4">Start by adding your first iPhone to the inventory</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add First iPhone</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phones.slice(0, 6).map((phone) => (
                <PhoneCard
                  key={phone.imei}
                  phone={phone}
                  isAdmin
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddPhoneForm onClose={handleCloseForm} editPhone={editingPhone} />
      )}
    </Layout>
  );
};

export default AdminDashboard;