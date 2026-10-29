import { readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import TeamShowcase from '../components/ui/team-showcase';
import { teamMembers } from '../components/team-members';

const file = 'eleva-landing.html';
const html = readFileSync(file, 'utf8');
const region = /<!-- TEAM:START -->[\s\S]*?<!-- TEAM:END -->/;
if (!region.test(html)) throw new Error('A região TEAM não foi encontrada no HTML.');
const markup = renderToString(<TeamShowcase members={teamMembers} />);
writeFileSync(file, html.replace(region, `<!-- TEAM:START -->\n        <div id="eleva-team">${markup}</div>\n        <!-- TEAM:END -->`));
console.log(`Equipe renderizada no HTML: ${teamMembers.length} integrantes.`);
