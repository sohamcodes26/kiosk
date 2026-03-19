import { useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';

const useSpeech = (textToSpeak) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (!textToSpeak) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = language === 'mr' ? 'mr-IN' : 'en-US';
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 

    const setFemaleVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      
      const femaleVoice = voices.find(voice => 
        (language === 'mr' && voice.lang.includes('mr')) ||
        (voice.lang.includes('en') && voice.name.includes('Google US English'))
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      setFemaleVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = setFemaleVoiceAndSpeak;
    }

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null; 
    };
  }, [textToSpeak, language]);
};

export default useSpeech;
