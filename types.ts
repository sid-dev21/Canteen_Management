
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  CANTEEN_MANAGER = 'CANTEEN_MANAGER',
  PARENT = 'PARENT'
}

export enum AccountStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
  };
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  isActive: boolean;
  settings: {
    currency: string;
    timezone: string;
  };
}

export interface Meal {
  id: string;
  type: 'BREAKFAST' | 'LUNCH' | 'SNACK';
  name: string;
  description: string;
  price: number;
  calories?: number;
  allergens?: string[];
}

export interface DailyMenu {
  date: string;
  meals: Meal[];
}

export interface WeeklyMenu {
  id: string;
  weekStart: string;
  days: DailyMenu[];
  isPublished: boolean;
}

export interface Student {
  id: string;
  tenantId: string;
  parentId: string;
  firstName: string;
  lastName: string;
  className: string;
  balance: number;
  isActive: boolean;
}
