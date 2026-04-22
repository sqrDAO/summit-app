import { Speaker } from '@/types';

export const speakers: Speaker[] = [
  {
    id: 'anh-tran',
    name: 'Anh Tran',
    title: 'Lead',
    company: 'Superteam Black',
    bio: 'Anh Tran leads Superteam Black, driving builder communities and supporting high-potential Web3 projects across Southeast Asia.',
    photoUrl: '/images/speakers/anhtran.jpg',
    socials: {},
    sessionIds: [],
    isFeatured: true,
  },
  {
    id: 'vo-duc-anh',
    name: 'Vo Duc Anh',
    title: 'Deputy Director',
    company: 'DISSC',
    bio: 'Vo Duc Anh serves as Deputy Director of DISSC, working at the intersection of government policy and digital innovation in Vietnam.',
    photoUrl: '/images/speakers/ducanh.jpg',
    socials: {},
    sessionIds: [],
    isFeatured: true,
  },
  {
    id: 'long-leo-pham',
    name: "Long 'Leo' Pham",
    title: 'Founder',
    company: 'sqrDAO',
    bio: "Long 'Leo' Pham is the Founder of sqrDAO and sqrFUND, a community-driven investment DAO focused on early-stage Web3 projects. He is a prominent connector in Vietnam's blockchain ecosystem and co-host of the Web3 Builders' Summit.",
    photoUrl: '/images/speakers/longleo.jpg',
    socials: { twitter: 'https://twitter.com/longleopham' },
    sessionIds: ['closing-keynote'],
    isFeatured: true,
  },
  {
    id: 'trung-nguyen',
    name: 'Trung Nguyen',
    title: 'Founder & CEO',
    company: 'Sky Mavis',
    bio: 'Trung Nguyen is the Founder and CEO of Sky Mavis, the studio behind Axie Infinity and Ronin — one of the most successful blockchain gaming ecosystems in the world.',
    photoUrl: '/images/speakers/trung.jpg',
    socials: {},
    sessionIds: [],
    isFeatured: true,
  },
  {
    id: 'harry-bui',
    name: 'Harry Bui',
    title: 'Analyst',
    company: 'Spartan Group',
    bio: 'Harry Bui is an Analyst at Spartan Group, a leading crypto-native fund and advisory firm focused on early-stage blockchain investments across Asia.',
    photoUrl: '/images/speakers/harry.jpg',
    socials: {},
    sessionIds: [],
  },
  {
    id: 'stan-nguyen',
    name: 'Stan Nguyen',
    title: 'Regional Community Manager',
    company: 'Aptos',
    bio: 'Stan Nguyen is the Regional Community Manager at Aptos, building and growing the Move-based L1 ecosystem across Southeast Asia.',
    photoUrl: '/images/speakers/stan.png',
    socials: {},
    sessionIds: [],
  },
  {
    id: 'hieu-bui',
    name: 'Hieu Bui',
    title: 'Founder',
    company: 'Knotwork',
    bio: 'Hieu Bui is the Founder of Knotwork, a platform connecting Web3 builders and communities to collaborate and grow together.',
    photoUrl: '/images/speakers/hieu.jpeg',
    socials: {},
    sessionIds: [],
  },
  {
    id: 'vinh-nguyen',
    name: 'Vinh Nguyen',
    title: 'ex-Tech Lead',
    company: '1Matrix',
    bio: 'Vinh Nguyen is a former Tech Lead at 1Matrix with deep expertise in blockchain engineering and decentralized infrastructure.',
    photoUrl: '/images/speakers/vinh.jpeg',
    socials: {},
    sessionIds: [],
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}

export function getFeaturedSpeakers(): Speaker[] {
  return speakers.filter((s) => s.isFeatured);
}
