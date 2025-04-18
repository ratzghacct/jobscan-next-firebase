import { Loader2, LogOut, Search, AlertTriangle, X, ExternalLink, Mail, CircleUser } from 'lucide-react';

export const Icons = {
  spinner: Loader2,
  logout: LogOut,
  search: Search,
  alert: AlertTriangle,
  close: X,
  externalLink: ExternalLink,
  mail: Mail,
  user: CircleUser,
  logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L21 12" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3L12 21" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};
