export interface Phone {
  imei: string;
  id?: string;
  model: string;
  color: string;
  storage: string;
  price: number;
  imageUrl: string;
  status: 'available' | 'sold';
  soldDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhoneStats {
  totalDevices: number;
  soldCount: number;
  availableCount: number;
  totalRevenue: number;
  weeklySales: number;
  monthlySales: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}