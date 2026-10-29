import { useState, type FocusEvent } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  imagePosition?: string;
  imageFit?: 'cover' | 'contain';
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = hoveredId ?? focusedId ?? selectedId;
  const select = (id: string) => setSelectedId(current => current === id ? null : id);
  const clearFocus = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusedId(null);
  };
  const focus = (id: string | null) => {
    setHoveredId(null);
    setFocusedId(id);
  };
  const interaction = { activeId, selectedId, onHover: setHoveredId, onFocus: focus, onSelect: select };

  return (
    <div className="team-showcase tw:flex tw:w-full tw:flex-col tw:items-center tw:gap-8 tw:md:flex-row tw:md:items-start tw:md:gap-10" onBlur={clearFocus}>
      <div className="team-showcase__photos tw:grid tw:w-full tw:grid-cols-3 tw:items-start tw:gap-2 tw:sm:gap-3" role="group" aria-label="Fotos da equipe">
        {[0, 1, 2].map(column => (
          <div key={column} className={cn('team-showcase__column tw:flex tw:min-w-0 tw:flex-col tw:gap-2 tw:sm:gap-3', `team-showcase__column--${column + 1}`)}>
            {members.filter((_, index) => index % 3 === column).map(member => (
              <PhotoCard key={member.id} member={member} {...interaction} />
            ))}
          </div>
        ))}
      </div>
      <ul className="team-showcase__members tw:flex tw:w-full tw:min-w-0 tw:flex-col" aria-label="Integrantes da equipe">
        {members.map(member => <MemberRow key={member.id} member={member} {...interaction} />)}
      </ul>
    </div>
  );
}

interface MemberInteraction {
  member: TeamMember;
  activeId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onFocus: (id: string | null) => void;
  onSelect: (id: string) => void;
}

function PhotoCard({ member, activeId, selectedId, onHover, onFocus, onSelect }: MemberInteraction) {
  return (
    <button
      type="button"
      className={cn('team-showcase__photo', activeId === member.id && 'is-active', activeId !== null && activeId !== member.id && 'is-dimmed')}
      onPointerEnter={event => { if (event.pointerType !== 'touch') onHover(member.id); }}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onFocus(member.id)}
      onClick={() => onSelect(member.id)}
      aria-label={`${member.name}, ${member.role}`}
      aria-pressed={selectedId === member.id}
    >
      <img src={member.image} alt={member.name} width="400" height="440" loading="lazy" decoding="async" style={{ objectPosition: member.imagePosition ?? 'center top', objectFit: member.imageFit ?? 'cover' }} />
    </button>
  );
}

const socialIcons = { twitter: FaTwitter, linkedin: FaLinkedinIn, instagram: FaInstagram, behance: FaBehance };
const socialLabels = { twitter: 'X / Twitter', linkedin: 'LinkedIn', instagram: 'Instagram', behance: 'Behance' };

function MemberRow({ member, activeId, selectedId, onHover, onFocus, onSelect }: MemberInteraction) {
  return (
    <li
      className={cn('team-showcase__member', activeId === member.id && 'is-active', activeId !== null && activeId !== member.id && 'is-dimmed')}
      onPointerEnter={event => { if (event.pointerType !== 'touch') onHover(member.id); }}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onFocus(member.id)}
    >
      <div className="team-showcase__name-line">
        <button className="team-showcase__member-button" type="button" onClick={() => onSelect(member.id)} aria-pressed={selectedId === member.id}>
          <span className="team-showcase__marker" aria-hidden="true" />
          <span className="team-showcase__name">{member.name}</span>
        </button>
        {member.social && (
          <div className="team-showcase__social">
            {(Object.keys(socialIcons) as Array<keyof typeof socialIcons>).map(network => {
              const href = member.social?.[network];
              if (!href || !/^https?:\/\//.test(href)) return null;
              const Icon = socialIcons[network];
              return <a key={network} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${socialLabels[network]} de ${member.name}`}><Icon size={15} aria-hidden="true" /></a>;
            })}
          </div>
        )}
      </div>
      <p className="team-showcase__role">{member.role}</p>
      {member.description && <p className="team-showcase__description">{member.description}</p>}
    </li>
  );
}
