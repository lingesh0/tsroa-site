export interface Leader {
  id: string;
  name: string;
  nameTamil: string;
  position: string;
  positionTamil: string;
  district: string;
  phone: string;
  image?: string;
  color: string;
}

export const leadershipData: Record<string, Leader[]> = {
  districtLeaders: [
    {
      id: 'leader-1',
      name: 'Name',
      nameTamil: 'பெயர்',
      position: 'District President',
      positionTamil: 'மாவட்ட தலைவர்',
      district: 'Namakkal',
      phone: '+91-XXXXXXXXXX',
      color: 'from-blue-500 to-blue-600'
    }
  ],
  urbanVicePresidents: [
    {
      id: 'urban-1',
      name: 'Urban VP 1',
      nameTamil: 'நகர விவாக தலைவர் 1',
      position: 'Urban Vice President',
      positionTamil: 'நகர உபசரண தலைவர்',
      district: 'Namakkal City',
      phone: '+91-XXXXXXXXXX',
      color: 'from-green-500 to-emerald-600'
    }
  ],
  ruralVicePresidents: [
    {
      id: 'rural-1',
      name: 'Rural VP 1',
      nameTamil: 'கிராம விவாக தலைவர் 1',
      position: 'Rural Vice President',
      positionTamil: 'கிராம உபசரண தலைவர்',
      district: 'Namakkal Rural',
      phone: '+91-XXXXXXXXXX',
      color: 'from-orange-500 to-red-600'
    }
  ],
  secretaries: [
    {
      id: 'secretary-1',
      name: 'Secretary',
      nameTamil: 'செயலாளர்',
      position: 'General Secretary',
      positionTamil: 'பொதுச் செயலாளர்',
      district: 'Namakkal',
      phone: '+91-XXXXXXXXXX',
      color: 'from-purple-500 to-pink-600'
    }
  ]
};

export const leadershipSections = [
  { key: 'districtLeaders', titleTamil: '🏢 மாவட்ட தலைவர்கள்', color: 'blue' },
  { key: 'urbanVicePresidents', titleTamil: '🏙️ நகர உபசரண தலைவர்கள்', color: 'green' },
  { key: 'ruralVicePresidents', titleTamil: '🌾 கிராம உபசரண தலைவர்கள்', color: 'orange' },
  { key: 'secretaries', titleTamil: '📋 செயலாளர்கள்', color: 'purple' }
];
