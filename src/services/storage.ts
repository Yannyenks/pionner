import { AuditLogEntry, GlobalClass, MembershipApplication, NewsItem } from '../types';
import { INITIAL_APPLICATIONS, INITIAL_CLASSES, INITIAL_NEWS } from '../data/mockData';

const STORAGE_KEYS = {
  APPLICATIONS: 'pci_applications_v1',
  CLASSES: 'pci_classes_v1',
  NEWS: 'pci_news_v1',
  AUDIT: 'pci_audit_logs_v1',
};

// Safe localStorage access
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.warn(`Failed reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('pci-storage-updated'));
  } catch (e) {
    console.warn(`Failed writing ${key} to storage:`, e);
  }
}

export const StorageService = {
  getApplications(): MembershipApplication[] {
    return getItem<MembershipApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },

  submitApplication(data: Omit<MembershipApplication, 'id' | 'referenceCode' | 'status' | 'submittedAt'>): MembershipApplication {
    const apps = this.getApplications();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `PCI-2026-${randomSuffix}`;

    const newApp: MembershipApplication = {
      ...data,
      id: `app-${Date.now()}`,
      referenceCode,
      status: 'recue',
      submittedAt: new Date().toISOString(),
    };

    const updated = [newApp, ...apps];
    setItem(STORAGE_KEYS.APPLICATIONS, updated);

    this.logAction(
      'Candidat (En ligne)',
      'Nouvelle candidature déposée',
      `Référence ${referenceCode} créée pour ${newApp.fullName} (${newApp.city}).`
    );

    return newApp;
  },

  findApplicationByCode(code: string): MembershipApplication | undefined {
    const clean = code.trim().toUpperCase();
    const apps = this.getApplications();
    return apps.find((a) => a.referenceCode.toUpperCase() === clean);
  },

  updateApplicationStatus(
    id: string,
    status: MembershipApplication['status'],
    assignedClassId?: string,
    adminNotes?: string
  ): MembershipApplication | null {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = apps[index];
    const updatedApp: MembershipApplication = {
      ...current,
      status,
      assignedClassId: assignedClassId !== undefined ? assignedClassId : current.assignedClassId,
      adminNotes: adminNotes !== undefined ? adminNotes : current.adminNotes,
    };

    apps[index] = updatedApp;
    setItem(STORAGE_KEYS.APPLICATIONS, apps);

    this.logAction(
      'Administration PCI',
      'Mise à jour statut candidature',
      `Dossier ${current.referenceCode} (${current.fullName}) passé au statut "${status}".`
    );

    return updatedApp;
  },

  getClasses(): GlobalClass[] {
    return getItem<GlobalClass[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
  },

  addClass(cls: Omit<GlobalClass, 'id'>): GlobalClass {
    const classes = this.getClasses();
    const newClass: GlobalClass = {
      ...cls,
      id: `gc-${Date.now()}`,
    };
    const updated = [...classes, newClass];
    setItem(STORAGE_KEYS.CLASSES, updated);
    this.logAction('Administration PCI', 'Création de Globale Classe', `Classe "${newClass.name}" créée (${newClass.city}).`);
    return newClass;
  },

  updateClass(id: string, updates: Partial<GlobalClass>): GlobalClass | null {
    const classes = this.getClasses();
    const idx = classes.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    classes[idx] = { ...classes[idx], ...updates };
    setItem(STORAGE_KEYS.CLASSES, classes);
    this.logAction('Administration PCI', 'Modification de Globale Classe', `Classe ${classes[idx].code} mise à jour.`);
    return classes[idx];
  },

  getNews(): NewsItem[] {
    return getItem<NewsItem[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  },

  addNews(news: Omit<NewsItem, 'id' | 'date'>): NewsItem {
    const list = this.getNews();
    const newItem: NewsItem = {
      ...news,
      id: `news-${Date.now()}`,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    setItem(STORAGE_KEYS.NEWS, [newItem, ...list]);
    this.logAction('Administration PCI', 'Publication d’article', `Titre: "${newItem.title}"`);
    return newItem;
  },

  getAuditLogs(): AuditLogEntry[] {
    const initialLogs: AuditLogEntry[] = [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        actor: 'Secrétariat Général',
        action: 'Initialisation du registre',
        details: 'Déploiement du portail numérique officiel PCI.',
      },
    ];
    return getItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT, initialLogs);
  },

  logAction(actor: string, action: string, details: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
    };
    setItem(STORAGE_KEYS.AUDIT, [newLog, ...logs.slice(0, 49)]); // keep 50
  },
};
