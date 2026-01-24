import React from 'react';
import { Skill, SkillLevel } from '../../types';
import './Common.css';

interface SkillBadgeProps {
  skill: Skill;
  showLevel?: boolean;
  showYears?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
}

const getLevelColor = (level?: SkillLevel): string => {
  switch (level) {
    case 'BEGINNER':
      return '#6ee7b7';
    case 'INTERMEDIATE':
      return '#60a5fa';
    case 'ADVANCED':
      return '#a78bfa';
    case 'EXPERT':
      return '#f472b6';
    default:
      return '#d1d5db';
  }
};

const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  showLevel = true,
  showYears = false,
  onClick,
  removable = false,
  onRemove
}) => {
  return (
    <div
      className={`skill-badge ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      style={{ '--level-color': getLevelColor(skill.level) } as React.CSSProperties}
    >
      <span className="skill-badge-name">{skill.name}</span>
      {showLevel && skill.level && (
        <span className="skill-badge-level">{skill.level}</span>
      )}
      {showYears && skill.yearsOfExperience && skill.yearsOfExperience > 0 && (
        <span className="skill-badge-years">{skill.yearsOfExperience}y</span>
      )}
      {skill.endorsed && skill.endorsed > 0 && (
        <span className="skill-badge-endorsed">{skill.endorsed}</span>
      )}
      {removable && onRemove && (
        <button
          className="skill-badge-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SkillBadge;
