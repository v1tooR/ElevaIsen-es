import { createRoot, hydrateRoot } from 'react-dom/client';
import TeamShowcase from '@/components/ui/team-showcase';
import { teamMembers } from '@/components/team-members';
import '../assets/css/team.css';

const container = document.getElementById('eleva-team');
if (container) {
  const team = <TeamShowcase members={teamMembers} />;
  if (import.meta.env.DEV) createRoot(container).render(team);
  else hydrateRoot(container, team);
}
