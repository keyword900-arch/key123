import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { PlaceItem } from '../types/honeymoon';
import {
  MapPin,
  ExternalLink,
  Camera,
  Heart,
  Sparkles,
  Utensils,
  Clock,
  Compass
} from 'lucide-react';

export const PlacesView: React.FC = () => {
  const { places } = useHoneymoon();
  const [cityFilter, setCityFilter] = useState<string>('all');

  const filteredPlaces = places.filter(p => {
    if (cityFilter === 'all') return true;
    return p.city === cityFilter;
  });

  const openMap = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            허니문 감성 장소 라이브러리
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            로마, 피렌체, 베네치아의 로맨틱 포토스팟, 젤라또 명소, 인생 맛집 아카이브
          </p>
        </div>

        {/* City Filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-semibold">
          {['all', '로마', '피렌체', '베네치아'].map(city => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                cityFilter === city
                  ? 'bg-[#1b382b] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {city === 'all' ? '전체 도시' : city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map(place => (
          <div
            key={place.id}
            className="group bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={place.imageUrl}
                  alt={place.nameKo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#1b382b] text-emerald-300">
                    {place.city}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/90 text-stone-900">
                    {place.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-black">{place.nameKo}</h3>
                  <p className="text-xs text-stone-300 font-serif-it italic">{place.nameIt}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 text-xs">
                <p className="text-stone-700 leading-relaxed">
                  {place.description}
                </p>

                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-stone-700 space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>허니문 꿀팁</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {place.tip}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>추천 일정: {place.recommendedTime}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-stone-200"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Google Maps에서 위치 보기</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
