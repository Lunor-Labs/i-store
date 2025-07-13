import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Phone, PhoneStats } from '../types/Phone';

export const usePhones = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PhoneStats>({
    totalDevices: 0,
    soldCount: 0,
    availableCount: 0,
    totalRevenue: 0,
    weeklySales: 0,
    monthlySales: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'phones'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const phonesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        soldDate: doc.data().soldDate?.toDate()
      })) as Phone[];
      
      setPhones(phonesData);
      
      // Calculate stats
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const soldPhones = phonesData.filter(phone => phone.status === 'sold');
      const weeklySoldPhones = soldPhones.filter(phone => 
        phone.soldDate && phone.soldDate >= oneWeekAgo
      );
      const monthlySoldPhones = soldPhones.filter(phone => 
        phone.soldDate && phone.soldDate >= oneMonthAgo
      );
      
      const totalRevenue = soldPhones.reduce((sum, phone) => sum + phone.price, 0);
      const weeklyRevenue = weeklySoldPhones.reduce((sum, phone) => sum + phone.price, 0);
      const monthlyRevenue = monthlySoldPhones.reduce((sum, phone) => sum + phone.price, 0);
      
      setStats({
        totalDevices: phonesData.length,
        soldCount: soldPhones.length,
        availableCount: phonesData.filter(phone => phone.status === 'available').length,
        totalRevenue,
        weeklySales: weeklySoldPhones.length,
        monthlySales: monthlySoldPhones.length,
        weeklyRevenue,
        monthlyRevenue
      });
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPhone = async (phoneData: Omit<Phone, 'createdAt' | 'updatedAt'>) => {
    try {
      await addDoc(collection(db, 'phones'), {
        ...phoneData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error adding phone:', error);
      throw error;
    }
  };

  const updatePhoneStatus = async (imei: string, status: 'available' | 'sold') => {
    try {
      const phone = phones.find(p => p.imei === imei);
      if (!phone?.id) throw new Error('Phone not found');
      
      const phoneDoc = doc(db, 'phones', phone.id);
      const updateData: any = {
        status,
        updatedAt: new Date()
      };
      
      if (status === 'sold') {
        updateData.soldDate = new Date();
      } else {
        updateData.soldDate = null;
      }
      
      await updateDoc(phoneDoc, updateData);
    } catch (error) {
      console.error('Error updating phone status:', error);
      throw error;
    }
  };

  const updatePhone = async (imei: string, phoneData: Partial<Phone>) => {
    try {
      const phone = phones.find(p => p.imei === imei);
      if (!phone?.id) throw new Error('Phone not found');
      
      const phoneDoc = doc(db, 'phones', phone.id);
      await updateDoc(phoneDoc, {
        ...phoneData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating phone:', error);
      throw error;
    }
  };

  const deletePhone = async (imei: string) => {
    try {
      const phone = phones.find(p => p.imei === imei);
      if (!phone?.id) throw new Error('Phone not found');
      
      const phoneDoc = doc(db, 'phones', phone.id);
      await deleteDoc(phoneDoc);
    } catch (error) {
      console.error('Error deleting phone:', error);
      throw error;
    }
  };

  return {
    phones,
    stats,
    loading,
    addPhone,
    updatePhoneStatus,
    updatePhone,
    deletePhone
  };
};