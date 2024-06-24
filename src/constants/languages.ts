import { LanguageType } from '@app/interfaces/interfaces';

interface Language {
  id: number;
  name: LanguageType;
  title: string;
  countryCode: string;
}

export const languages: Language[] = [
  {
    id: 1,
    name: 'en',
    title: 'English',
    countryCode: 'gb',
  },
  {
    id: 2,
    name: 'es',
    title: 'Spanish',
    countryCode: 'es',
  },
  {
    id: 3,
    name: 'ja',
    title: 'Japanese',
    countryCode: 'jp',
  },
  {
    id: 4,
    name: 'de',
    title: 'German',
    countryCode: 'de',
  },
];
