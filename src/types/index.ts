export type PageId =
  | 'home'
  | 'institution'
  | 'values'
  | 'global-classes'
  | 'actions'
  | 'membership'
  | 'news'
  | 'gallery'
  | 'contact'
  | 'member-portal'
  | 'admin';

export type ApplicationStatus = 'recue' | 'en_cours' | 'acceptee' | 'refusee';

export interface MembershipApplication {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  age: number;
  profession?: string;
  motivation: string;
  status: ApplicationStatus;
  submittedAt: string;
  assignedClassId?: string;
  adminNotes?: string;
}

export interface GlobalClass {
  id: string;
  code: string;
  name: string;
  city: string;
  sessionTime: 'Matinée (08h30 - 12h30)' | 'Après-midi (14h00 - 18h00)';
  leaderName: string;
  currentMembersCount: number;
  maxCapacity: number; // standard 24
  status: 'active' | 'in_formation' | 'complete';
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Communiqué' | 'Événement' | 'Leadership' | 'Solidarité' | 'Vie du Club';
  date: string;
  summary: string;
  content: string[];
  imageUrl?: string;
  author: string;
  featured?: boolean;
}

export interface ProgramAction {
  id: string;
  title: string;
  category: 'Investissement Solidaire' | 'Leadership Familial' | 'Économie & Pouvoir d’Achat' | 'Action Communautaire';
  description: string;
  objectives: string[];
  realWorldImpact: string;
  frequency: string;
  iconName: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}
