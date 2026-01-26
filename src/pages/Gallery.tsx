import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  url: string;
  name: string;
  location: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    // Handle Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    // Load images from public/images/gallery folder (District President election first, then others sorted by date - oldest to newest)
    const imageFiles = [
      // 12/12/2023 - District President election (KEEP FIRST)
      'district-president-saravanakumar-2023-12-12.jpg',
      // 26/01/2026 - Newspaper coverage of Xeve Tech Solutions award
      'WhatsApp Image 2026-01-26 at 8.46.36 AM.jpeg',
      // 24/01/2026 - Group photo from departmental ceremony at Coastal Residence
      'grop photo.jpeg',
      // 24/01/2026 - Departmental ceremony at Coastal Residence
      'WhatsApp Image 2026-01-24 at 9.35.04 PM.jpeg',
      'WhatsApp Image 2026-01-24 at 9.35.05 PM.jpeg',
      'WhatsApp Image 2026-01-24 at 9.35.06 PM.jpeg',
      'WhatsApp Image 2026-01-24 at 9.35.07 PM.jpeg',
      'WhatsApp Image 2026-01-24 at 9.35.08 PM.jpeg',
      // 24/01/2026 - 30 years service celebration for Thiru. Ra. Ragunathan
      'WhatsApp Image 2026-01-24 at 9.20.11 PM.jpeg',
      // 24/01/2026 - Award presentation to Xeve Tech Solutions founder Thiru. Lingesh
      'WhatsApp Image 2026-01-24 at 7.15.37 PM.jpeg',
      // 31/10/2020 - CEC meeting at Villupuram
      'WhatsApp Image 2025-12-14 at 07.22.17_7025e63f.jpg',
      // 09/02/2021 - Protest for 20 demands
      'WhatsApp Image 2025-12-14 at 07.22.20_1c32bc8e.jpg',
      // 27/07/2025 - Meeting with new District Collector
      'WhatsApp Image 2026-01-04 at 2.09.46 PM.jpeg',
      // 20/09/2025 - District Executive Committee meeting
      'WhatsApp Image 2025-12-14 at 07.46.07_a2210506.jpg',
      // 22/12/2025 - DRO meeting
      'dro-meeting-2025-12-22.jpg',
      // 26/12/2025 - Meeting with District Collector about protests
      'WhatsApp Image 2025-12-26 at 8.22.36 PM.jpeg',
      // 29/12/2025 - New Year greeting to District Collector and District Revenue Officer
      'new-year-greeting-collector-2025-12-29.jpeg',
      // 05/01/2026 - TSROA Union 2026 Calendar presentation to DRO
      'WhatsApp Image 2026-01-05 at 8.27.02 PM.jpeg',
      // 05/01/2026 - TSROA Union 2026 Calendar presentation to PIG
      'WhatsApp Image 2026-01-05 at 8.27.22 PM.jpeg',
      // 29/12/2025 - New Year greeting formal announcement
      'WhatsApp Image 2025-12-30 at 10.55.44 PM.jpeg'
    ];

    const galleryImages = imageFiles.map((fileName) => {
      let location = 'நாமக்கல்'; // Default location
      
      // Extract location from descriptions
      if (fileName === 'WhatsApp Image 2025-12-14 at 07.22.17_7025e63f.jpg') {
        location = 'விழுப்புரம் மாவட்டம்';
      } else if (fileName === 'WhatsApp Image 2025-12-14 at 07.22.20_1c32bc8e.jpg' || 
                 fileName === 'calendar-collage-district-office-2025-12-22.jpg' ||
                 fileName === 'dro-meeting-2025-12-22.jpg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2025-12-26 at 10.14.05 PM.jpeg') {
        location = 'குமாரபாளையம் வட்டாட்சியர் அலுவலகம்';
      } else if (fileName === 'calendar-tiruchengode-2025-12-24.jpg' || 
                 fileName === 'calendar-collage-tiruchengode-2025-12-24.jpg') {
        location = 'திருச்செங்கோடு வருவாய் கோட்டாட்சியர் & வட்டாட்சியர் அலுவலகம்';
      } else if (fileName === 'calendar-paramathi-velur-2025-12-24.jpg') {
        location = 'பரமத்தி வேலூர் வட்டாட்சியர் அலுவலகம்';
      } else if (fileName === 'WhatsApp Image 2025-12-26 at 4.25.19 PM.jpeg') {
        location = 'நாமக்கல் வட்டாட்சியர் அலுவலகம்';
      } else if (fileName === 'WhatsApp Image 2025-12-26 at 4.47.11 PM.jpeg') {
        location = 'திருச்செங்கோடு வட்டாட்சியர் அலுவலகம்';
      } else if (fileName === 'WhatsApp Image 2025-12-26 at 8.22.36 PM.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'new-year-greeting-collector-2025-12-29.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2025-12-30 at 10.55.44 PM.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-04 at 2.09.46 PM.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-05 at 8.27.02 PM.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-05 at 8.27.22 PM.jpeg') {
        location = 'மாவட்ட ஆட்சியர் அலுவலகம், நாமக்கல்';
      } else if (fileName === 'grop photo.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-26 at 8.46.36 AM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';

      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.35.03 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.35.05 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.35.06 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.35.07 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.35.08 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 9.20.11 PM.jpeg') {
        location = 'நாமக்கல்';
      } else if (fileName === 'WhatsApp Image 2026-01-24 at 7.15.37 PM.jpeg') {
        location = 'பரணி ஹால் கோஸ்டல் ரெசிடன்சி, நாமக்கல்';
      }
      
      return {
        url: `/images/gallery/${fileName}`,
        location,
        name:
          fileName === 'district-president-saravanakumar-2023-12-12.jpg'
            ? 'முன்னாள் மாநில துணைத்தலைவர் திரு.இரா. ரகுநாதன் அவர்களால் மாவட்டத்தலைவராக ரா. சரவணகுமார் அவர்கள் 12/12/23 அன்று தேர்த்தெடுக்கப்பட்டார்'
          : fileName === 'WhatsApp Image 2026-01-26 at 8.46.36 AM.jpeg'
          ? 'TSROA சார்பில் 26.01.2026 அன்று நடைபெற்ற பிரிவு உபச்சார விழாவில், துணை ஆட்சியர்கள் திரு. ரகுநாதன் மற்றும் திரு. வெ. ராஜேஷ் அவர்கள் கலந்து கொண்டனர். சங்கத்தின் அதிகாரபூர்வ இணையதளத்தை உருவாக்கிய Xeve Tech Solutions நிறுவனத்தின் Founder & CEO திரு. லிங்கேஷ் T, B.E. அவர்களுக்கு நினைவு பரிசு வழங்கி மரியாதை செய்யப்பட்டது. இந்த நிகழ்வு தொடர்பான செய்தி முக்கிய செய்தித்தாள்களில் வெளிவந்து நிகழ்வின் சிறப்பை மேலும் உயர்த்தியது.'          : fileName === 'grop photo.jpeg'
          ? '24/01/25 அன்று மாவட்டத்தலைவர் திரு.ரா. சரவணகுமார் அவர்களின் தலைமையில் நடைபெற்ற கோஸ்டல் ரெசிடன்சியில் உள்ள பரணி ஹாலில் மரியாதைக்குரிய திரு.வெ.ராஜேஷ் மற்றும் திரு.ராஜேஷ் கண்ணா அாகியோக்கு நடைபெற்ற பிரிவு உபச்சார விழாவில் கலந்து கொண்டு, நிகழ்வை சிறப்பாக்க செச்ந மதிப்பிர்குரிய திரு. மா.க.சரவணந் மாவட்ட வருவாஏ அலுவார் அவர்கள், மதிப்பிர்குரிய திரு.ரகுநாதன், துணை ஆட்சியர் அவர்கள், மதிப்பிர்குரிய மாவட்ட வழங்கவுர௞கார் திரு.முருகன் அவர்கள் ஆகியோக்க மதிப்பிர்குரிய நிர்வாகிகள் அனைவும் கலந்து கொண்டனர்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.35.04 PM.jpeg'
          ? 'கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவில் சங்க உறுப்பினர்கள் மற்றும் அலுவலர்கள் கலந்து கொண்டு மகிழ்ச்சியாகக் கழித்த நினைவுகூரத்தக்க தருணங்கள்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.35.05 PM.jpeg'
          ? 'கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவில் சங்க உறுப்பினர்கள் மற்றும் அலுவலர்கள் கலந்து கொண்டு மகிழ்ச்சியாகக் கழித்த நினைவுகூரத்தக்க தருணங்கள்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.35.06 PM.jpeg'
          ? 'கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவில் சங்க உறுப்பினர்கள் மற்றும் அலுவலர்கள் கலந்து கொண்டு மகிழ்ச்சியாகக் கழித்த நினைவுகூரத்தக்க தருணங்கள்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.35.07 PM.jpeg'
          ? 'கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவில் சங்க உறுப்பினர்கள் மற்றும் அலுவலர்கள் கலந்து கொண்டு மகிழ்ச்சியாகக் கழித்த நினைவுகூரத்தக்க தருணங்கள்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.35.08 PM.jpeg'
          ? 'கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவில் சங்க உறுப்பினர்கள் மற்றும் அலுவலர்கள் கலந்து கொண்டு மகிழ்ச்சியாகக் கழித்த நினைவுகூரத்தக்க தருணங்கள்'
          : fileName === 'WhatsApp Image 2026-01-24 at 9.20.11 PM.jpeg'
          ? '24/01/2026 அன்று மாவட்டத்தலைவர் திரு.ரா. சரவணகுமார் அவர்கள் நமது சங்கத்தின் முன்னாள் மாநில துணைத்தலைவர் திரு.இரா.ரகுநாதன் அவர்கள் வருவாய் மற்றும் பேரிடர் மேலாண்மை துறையில் 30 ஆண்டுகள் பணி நிறைவு செய்ததை அனுசரித்து மற்றும் 31 ஆம் ஆண்டு அடி எடுத்து வைப்பதற்கு நேரில் சங்க நிர்வாகிகளுடன் வாழ்த்துக்கள் தெரிவிக்கப்பட்டது'
          : fileName === 'WhatsApp Image 2026-01-24 at 7.15.37 PM.jpeg'
          ? 'இன்று கோஸ்டல் ரெசிடன்சியில் நடைபெற்ற பிரிவு உபச்சார விழாவை மேலும் சிறப்பிக்கும் விதமாக, நமது சங்கத்தின் இணையதளம் பக்கத்தை சிறப்பாக தயார் செய்த Xeve Tech Solutions என்ற மென்பொருள் நிறுவனத்தின் Founder & CEO திரு.லிங்கேஷ் B.E. அவர்களுக்கு தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கத்தின் சார்பாக மரியாதைக்குரிய திரு.ரகுநாதன், துணை ஆட்சியர் மற்றும் திரு.வெ.ராஜேஷ், துணை ஆட்சியர் அவர்களால் நினைவு பரிசு வழங்கி மற்றும் பொன்னடை அணிவித்து மரியாதை செய்யப்பட்டது'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.22.17_7025e63f.jpg'
          ? '31/10/2020 அன்று நடைபெற்ற மத்திய செயற்குழு கூட்டம் விழப்புரம் மாவட்டத்தில் கலந்து கொண்ட போது'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.22.20_1c32bc8e.jpg'
          ? 'திரு.இரா. ரகுநாதன் அவர்களின் தலைமையில் 20அம்ச கோரிக்கைகள் நிறைவேற்ற கோரி கவன ஈர்ப்பு போராட்டம் மாவட்ட ஆட்சியர் அலுவலகம் முன்பு 09/02/2021 அன்று நடைபெற்ற போது'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.46.07_a2210506.jpg'
          ? 'மாவட்ட செயற்குழு கூட்டம் – 20/09/2025 (சிறப்பு அழைப்புனர்: திரு. வி.சுந்தர்ராஜன்; தலைமையில்: திரு.ரா. சரவணகுமார்)'
              : fileName === 'dro-meeting-2025-12-22.jpg'
              ? '22/12/2025 அன்று தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கத்தின் மாவட்டத்தலைவர் திரு.சரவணகுமார் அவர்களின் தலைமையில் மாவட்ட வருவாய் அலுவலர் அவர்களை நேரில் சந்தித்து கோரிக்கைகள் வைக்கப்பட்டது மற்றும் மாவட்ட பொருளாளர் திரு.மனோஜ், மாவட்ட துணைத்தலைவர் திரு.கிருஷ்ணமூர்த்தி மற்றும் திரு.அம்ஜத், மாவட்ட இணை செயலாளர் திரு.ரஞ்சித், மாவட்ட மகளிர் அணி செயலாளர் திருமதி.சந்திரமதி மற்றும் திருமதி.சித்ரா ஆகியோர் உடன் இருந்தனர்'
              : fileName === 'WhatsApp Image 2025-12-26 at 10.14.05 PM.jpeg'
              ? '23/12/2025 அன்று 2026ம் புத்தாண்டிற்கான மாத நாட்காட்டி மாவட்டத்தலைவர் திரு.சரவணகுமார் தலைமையில், மாவட்ட துணை தலைவர் திருமதி.மகேஸ்வரி மற்றும் திரு.அருண்குமார், மாவட்ட இணை செயலாளர் செல்வி.நந்தினி ஆகியோருடன் குமாரபாளையம் வட்டாட்சியர் அலுவலகத்தில் உள்ள நமது சங்க உறுப்பினர்கள் அனைவருக்கும் வழங்கப்பட்டது'
              : fileName === 'calendar-tiruchengode-2025-12-24.jpg'
              ? '24/12/2025 அன்று 2026ம் புத்தாண்டிற்கான மாத நாட்காட்டி மாவட்டத் துணைத்தலைவர் திரு.தணிகாசலம் மற்றும் மாவட்ட இணைச் செயலாளர்கள் திரு.கமல், திரு.நடராஜன் மற்றும் திரு.அமுல்ராஜ் ஆகியோருடன் திருச்செங்கோடு வருவாய் கோட்டாட்சியர் அலுவலகம் மற்றும் திருச்செங்கோடு வட்டாட்சியர் அலுவலகத்தில் உள்ள நமது சங்க உறுப்பினர்கள் அனைவருக்கும் வழங்கப்பட்டது'
              : fileName === 'calendar-collage-tiruchengode-2025-12-24.jpg'
              ? '2026ம் ஆண்டு மாத நாட்காட்டி - திருச்செங்கோடு வருவாய் கோட்டாட்சியர் அலுவலகம் (24/12/2025)'
              : fileName === 'calendar-paramathi-velur-2025-12-24.jpg'
              ? '24/12/2025 அன்று 2026ம் புத்தாண்டிற்கான மாத நாட்காட்டி மாவட்டத்தலைவர் திரு.சரவணகுமார் தலைமையில், மாவட்ட துணை தலைவர் திருமதி.மகேஸ்வரி, மாவட்ட பொருளாளர் திரு.மனோஜ், மாவட்ட துணை தலைவர் திரு.முருகபெருமாள், செல்வி.கவுசிகா மற்றும் மாவட்ட மகளிர் அணி இணை செயலாளர் செல்வி.கஸ்தூரி ஆகியோருடன் பரமத்தி வேலூர் வட்டாட்சியர் அலுவலகத்தில் உள்ள நமது சங்க உறுப்பினர்கள் அனைவருக்கும் வழங்கப்பட்டது'
              : fileName === 'WhatsApp Image 2025-12-26 at 4.25.19 PM.jpeg'
              ? '26/12/2025 அன்று 2026ம் புத்தாண்டிற்கான மாத நாட்காட்டி மாவட்டத்துணைத்தலைவர் திரு.வடிவேலு மற்றும் திரு.பன்னீர்செல்வம், மாவட்ட இணைச்செயலாளர் திரு.ரஞ்சித் மற்றும் திருமதி.மணிமேகலை ஆகியோருடன் நாமக்கல் வட்டாட்சியர் அலுவலகத்தில் உள்ள நமது சங்க உறுப்பினர்கள் அனைவருக்கும் வழங்கப்பட்டது'
              : fileName === 'WhatsApp Image 2025-12-26 at 4.47.11 PM.jpeg'
              ? '26/12/2025 அன்று 2026ம் மாதநாட்காட்டி மாவட்டத்துணைத்தலைவர் திரு.தணிகாசலம் மற்றும் மாவட்ட இணைச்செயலாளர் திரு.கமல், அமுல்ராஜ் மற்றும் நடராஜன் ஆகியோர் தலைமையில் திருச்செங்கோடு வட்டாட்சியர் அலுவலகத்தில் சங்க நாட்காட்டி அனைவருக்கும் வழங்கப்பட்டது'
              : fileName === 'WhatsApp Image 2025-12-26 at 8.22.36 PM.jpeg'
              ? 'அனைத்து துறை சங்கங்களின் கூட்டமைப்பு சார்பாக 26.12.2025 அன்று நடைபெற உள்ள கவன ஈர்ப்பு போராட்டம் மற்றும் 6.1.2026 முதல் நடைபெறவுள்ள காலவரையற்ற வேலை நிறுத்த போராட்டம் குறித்து நாமக்கல் மாவட்ட ஆட்சித் தலைவர் அவர்களை அனைத்து துறை சங்கங்களின் கூட்டமைப்பின் தலைவர் திரு.K.மகேந்திரகுமார், மாவட்ட பொருளாளர் திரு.மனோஜ் மற்றும் மாவட்ட பிரச்சார செயலாளர் திரு.நவீன்குமார் ஆகியோர் நேரில் சந்தித்து தகவல் தெரிவித்தனர்'
              : fileName === 'new-year-greeting-collector-2025-12-29.jpeg'
              ? '29/12/24 அன்று மாவட்ட ஆட்சித்தலைவர் அவர்களை TSROA சங்கம் சார்பாக நேரில் சந்தித்து ஆங்கிலப் புத்தாண்டு வாழ்த்துக்கள் தெரிவித்த போது'
              : fileName === 'WhatsApp Image 2025-12-30 at 10.55.44 PM.jpeg'
              ? '2026 ஆம் ஆங்கில புத்தாண்டை முன்னிட்டு, 29.12.2025 அன்று தமிழ்மாநில வருவாய்த்துறை சங்கத்தலைவர், திரு.ரா.சரவணகுமார் தலைமையில், மாவட்ட செயலாளர், திரு.சதீஸ்குமார், மாவட்ட பொருளாளர் திரு.மனோஜ், மாவட்ட துணைத்தலைவர், (நகரம்) திருமதி.மகேஸ்வரி, திரு.கிருஷ்ணமூர்த்தி, திரு.அம்ஜத், திரு.விஜயகுமார், திரு.கார்த்திக்கேயன், செல்வி.கவுசிகா, மாவட்ட துணைத்தலைவர் (புறநகர்) திரு.தணிகாசலம், திரு.முருகப்பெருமாள், திரு.அருண்குமார், மாவட்ட பிரச்சார செயலாளர் திரு.நவீன்குமார், மாவட்ட இணை செயலாளர் திரு.ரஞ்சித், செல்வி.நந்தினி, திருமதி.சித்ரா, மாவட்ட மகளிரணி இணைச்செயலாளர் திருமதி.சத்தியா, திருமதி.கனிமொழி ஆகியோருடன் மதிப்புமிகு மாவட்ட ஆட்சித்தலைவர் அவர்கள், மதிப்புமிகு மாவட்ட வருவாய் அலுவலர் அவர்கள், மதிப்புமிகு மாவட்ட ஆட்சியரின் நேர்முக உதவியாளர் (பொது) அவர்களை மரியாதை நிமித்தமாக சந்தித்து, 2026-ஆம் ஆண்டுக்கான ஆங்கில புத்தாண்டு நல்வாழ்த்துக்கள் நேரில் தெரிவிக்கப்பட்டது'
            : fileName === 'WhatsApp Image 2026-01-04 at 2.09.46 PM.jpeg'
            ? '27.07.25 அன்று  புதிதாக பதவியேற்றுள்ள நாமக்கல் மாவட்ட ஆட்சியர் திருமதி. துர்காமூர்த்தி அவர்களை தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கத்தின் மாவட்டத்தலைவர் திரு. ரா. சரவணகுமார் அவர்களின் தலைமையில் நிர்வாகிகள் அனைவரும் நேரில் சந்திந்து வாழ்த்துக்கள் தெரிவித்தனர்'
            : fileName === 'WhatsApp Image 2026-01-05 at 8.27.02 PM.jpeg'
            ? '29/12/24 அன்று மாவட்ட வருவாய் அலுவலர் அவர்களை TSROA சங்கம் சார்பாக நேரில் சந்தித்து ஆங்கிலப் புத்தாண்டு வாழ்த்துக்கள் தெரிவித்த போது'
            : fileName === 'WhatsApp Image 2026-01-05 at 8.27.22 PM.jpeg'
            ? '29/12/24 அன்று மாவட்ட ஆட்சியரின் நேர்முக உதவியாளர் ( பொது )அவர்களை TSROA சங்கம் சார்பாக நேரில் சந்தித்து ஆங்கிலப் புத்தாண்டு வாழ்த்துக்கள் தெரிவித்த போது'
            : fileName
      };
    });

    setImages(galleryImages);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-tamil">
            படத்தொகுப்பு
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 font-tamil text-lg">
            எங்கள் சங்கத்தின் நிகழ்வுகள் மற்றும் செயல்பாடுகள்
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xl text-gray-600 font-tamil">
              தற்போது எந்த படங்களும் இல்லை
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={image.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image Container */}
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-white mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <p className="text-white font-tamil text-sm font-semibold">பெரிதாக பார்க்க கிளிக் செய்யவும்</p>
                    </div>
                  </div>
                  {/* Gallery Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">நிகழ்வு</span>
                  </div>
                  
                  {/* Full Description */}
                  <p className="text-gray-700 font-tamil leading-relaxed text-[15px] flex-grow">
                    {image.name}
                  </p>

                  {/* Location - Always at bottom */}
                  <div className="flex items-start gap-2 text-gray-600 pt-4 border-t border-gray-100 mt-4">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-tamil leading-relaxed">{image.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <div className="h-full w-full flex flex-col">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-4 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white font-tamil text-lg font-semibold hidden sm:block">படத்தொகுப்பு காட்சி</span>
                  </div>

                  {/* Close Button */}
                  <button
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-3 transition-all duration-300 hover:rotate-90"
                    onClick={handleCloseModal}
                    title="Close (Esc)"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Image container */}
                <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedImage}
                      alt="Enlarged view"
                      className="max-w-full rounded-lg shadow-2xl"
                      style={{ 
                        maxHeight: '80vh',
                        width: 'auto'
                      }}
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Footer with hint */}
                <div className="p-4 text-center">
                  <p className="text-white/70 font-tamil text-sm">
                    படத்தை மூட வெளியே கிளிக் செய்யவும் அல்லது ESC அழுத்தவும்
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
