import { Loader2, LogOut, AlertCircle, ExternalLink, X } from "lucide-react";

export const Icons = {
  spinner: Loader2,
  logout: LogOut,
  alert: AlertCircle,
  externalLink: ExternalLink,
  close: X,
  logo: () => (
    <span className="text-lg font-bold text-purple-600 tracking-tight">
      JobScan
    </span>
  ),
};
