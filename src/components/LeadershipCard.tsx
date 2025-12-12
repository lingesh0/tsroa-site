import { motion } from 'framer-motion';
import { Leader } from '../data/leadership';

interface LeadershipCardProps {
  leader: Leader;
  delay?: number;
}

const LeadershipCard = ({ leader, delay = 0 }: LeadershipCardProps) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${leader.color} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="h-32 bg-white/10 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="px-6 py-6 relative">
        {/* Title Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 font-tamil group-hover:text-yellow-100 transition-colors">
              {leader.nameTamil}
            </h3>
            <p className="text-sm text-white/80 font-tamil">
              {leader.positionTamil}
            </p>
          </div>
          <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-xs text-white font-tamil">
            {leader.position}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mt-4 pt-4 border-t border-white/20">
          <a
            href={`tel:${leader.phone}`}
            className="flex items-center gap-2 text-white text-sm hover:text-yellow-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.82.871 1.61 1.556 2.295a7.998 7.998 0 002.293 1.556l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3z" />
            </svg>
            <span className="font-tamil">{leader.phone}</span>
          </a>
          <div className="flex items-center gap-2 text-white text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-tamil">{leader.district}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadershipCard;
