import React, { useState } from 'react';
import { Pin, ArrowRight, ChevronRight } from 'lucide-react';
import { Announcement, AnnouncementCategory } from '../types';
import { Translations } from '../i18n/translations';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
  t: Translations;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
  onSelectAnnouncement,
  t,
}) => {
  const [activeCategory, setActiveCategory] = useState<AnnouncementCategory>('all');

  const pinnedAnnouncement = announcements.find((a) => a.isPinned);
  const regularAnnouncements = announcements.filter((a) => !a.isPinned);

  const filteredAnnouncements = regularAnnouncements.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="section-announcements" className="flex flex-col gap-4">
      {/* Section Titlebar & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black"></div>
          <h2 className="font-sans text-[18px] font-bold text-black uppercase tracking-tight">
            {t.announcements.sectionTitle}
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div
          id="ann-filter-bar"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0"
        >
          <button
            id="tab-all"
            onClick={() => setActiveCategory('all')}
            type="button"
            className={`ann-tab px-3 py-1 font-mono-num text-[11px] rounded-[2px] font-semibold transition-colors ${
              activeCategory === 'all'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#f3f3f4] text-[#5d5e66] hover:text-black border border-[#e8e8e9]'
            }`}
          >
            {t.announcements.all}
          </button>
          <button
            id="tab-upgrade"
            onClick={() => setActiveCategory('upgrade')}
            type="button"
            className={`ann-tab px-3 py-1 font-mono-num text-[11px] rounded-[2px] font-semibold transition-colors ${
              activeCategory === 'upgrade'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#f3f3f4] text-[#5d5e66] hover:text-black border border-[#e8e8e9]'
            }`}
          >
            {t.announcements.upgrade}
          </button>
          <button
            id="tab-governance"
            onClick={() => setActiveCategory('governance')}
            type="button"
            className={`ann-tab px-3 py-1 font-mono-num text-[11px] rounded-[2px] font-semibold transition-colors ${
              activeCategory === 'governance'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#f3f3f4] text-[#5d5e66] hover:text-black border border-[#e8e8e9]'
            }`}
          >
            {t.announcements.governance}
          </button>
          <button
            id="tab-ecosystem"
            onClick={() => setActiveCategory('ecosystem')}
            type="button"
            className={`ann-tab px-3 py-1 font-mono-num text-[11px] rounded-[2px] font-semibold transition-colors ${
              activeCategory === 'ecosystem'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#f3f3f4] text-[#5d5e66] hover:text-black border border-[#e8e8e9]'
            }`}
          >
            {t.announcements.ecosystem}
          </button>
        </div>
      </div>

      {/* Vital Pinned Announcement Banner */}
      {pinnedAnnouncement && (
        <div className="relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-[2px] shadow-sm p-4 sm:p-5 transition-all duration-150 border border-[#e8e8e9]">
          {/* Leading Solid 4px Black Indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-1 sm:pl-2">
            <div className="flex flex-col gap-1.5 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black text-white font-mono-num text-[10px] uppercase rounded-[2px] font-bold shadow-sm">
                  <Pin className="w-3 h-3 text-emerald-400" />
                  {t.announcements.pinnedTag}
                </span>
                <span className="px-2 py-0.5 bg-[#eeeeef] font-mono-num text-[11px] text-black font-semibold rounded-[2px]">
                  [Governance Proposal {pinnedAnnouncement.proposalId}]
                </span>
                <span className="font-mono-num text-[11px] text-[#77767b]">
                  {pinnedAnnouncement.timestamp}
                </span>
              </div>

              <h3 className="font-sans text-[20px] font-bold text-black tracking-tight mt-1">
                {pinnedAnnouncement.title}
              </h3>

              <p className="font-sans text-[13px] text-[#47464b] leading-relaxed">
                {pinnedAnnouncement.summary}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
              <button
                id="btn-read-pinned-announcement"
                onClick={() => onSelectAnnouncement(pinnedAnnouncement)}
                type="button"
                className="px-3.5 py-2 bg-black text-white hover:bg-zinc-800 font-mono-num text-[11px] font-semibold rounded-[2px] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>{t.announcements.readReport}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono-num text-[11px] text-[#009668] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009668] animate-pulse"></span>
                {t.announcements.executionStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chronological Announcements Timeline List */}
      <div
        id="announcement-list"
        className="flex flex-col bg-white/90 backdrop-blur-xl rounded-[2px] shadow-sm border border-[#e8e8e9] divide-y divide-[#eeeeef]"
      >
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            id={`ann-item-${item.id}`}
            onClick={() => onSelectAnnouncement(item)}
            className="ann-item group p-4 transition-colors duration-150 hover:bg-[#f9f9fa] flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0 group-hover:scale-125 transition-transform"></div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#eeeeef] font-mono-num text-[10px] text-black font-semibold rounded-[2px]">
                    {item.categoryLabel}
                  </span>
                  <span className="font-mono-num text-[11px] text-[#77767b]">
                    {item.timestamp}
                  </span>
                </div>

                <h4 className="font-sans text-[15px] font-bold text-black group-hover:underline">
                  {item.title}
                </h4>

                <p className="font-sans text-[12px] text-[#5d5e66] line-clamp-1">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pl-5 md:pl-0">
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold tracking-wider hidden lg:inline">
                {item.statusBadge}
              </span>
              <ChevronRight className="w-4 h-4 text-[#77767b] group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
