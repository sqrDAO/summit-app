import { Speaker } from '@/types';

export const speakers: Speaker[] = [
  {
    id: 'anh-tran',
    name: 'Anh Tran',
    title: 'Lead',
    company: 'Superteam Black',
    bio: 'Anh Tran leads Superteam Black, driving builder communities and supporting high-potential Web3 projects across Southeast Asia.',
    photoUrl: '/images/speakers/anhtran.jpg',
    socials: {
      twitter: 'https://x.com/SaigonButcher',
    },
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
    socials: {
      linkedin: 'https://www.linkedin.com/in/duc-anh-vo-69932723/',
    },
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
    socials: {
      twitter: 'https://x.com/sqrdao_intern',
      linkedin: 'https://www.linkedin.com/in/longpham91/',
    },
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
    socials: {
      twitter: 'https://x.com/trungfinity',
      linkedin: 'https://www.linkedin.com/in/trungfinity/',
    },
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
    socials: {
      twitter: 'https://x.com/harrybui31',
      linkedin: 'https://www.linkedin.com/in/harrybui31/',
    },
    sessionIds: [],
  },
  {
    id: 'stan-nguyen',
    name: 'Stan Nguyen',
    title: 'Regional Community Manager',
    company: 'Aptos',
    bio: 'Stan Nguyen is the Regional Community Manager at Aptos, building and growing the Move-based L1 ecosystem across Southeast Asia.',
    photoUrl: '/images/speakers/stan.png',
    socials: {
      twitter: 'https://x.com/stan_ngx',
      linkedin: 'https://www.linkedin.com/in/stan-ngx/',
    },
    sessionIds: [],
  },
  {
    id: 'hieu-bui',
    name: 'Hieu Bui',
    title: 'Founder',
    company: 'Knotwork',
    bio: 'Hieu Bui is the Founder of Knotwork, a platform connecting Web3 builders and communities to collaborate and grow together.',
    photoUrl: '/images/speakers/hieu.jpeg',
    socials: {
      twitter: 'https://x.com/0xk2_',
      linkedin: 'https://www.linkedin.com/in/trunghieubui88/',
    },
    sessionIds: [],
  },
  {
    id: 'alexis-low',
    name: 'Alexis Low',
    title: 'Ecosystem Growth Lead',
    company: 'Lisk',
    bio: 'Alexis Low is the Ecosystem Growth Lead at Lisk, driving developer adoption and ecosystem expansion for the Lisk L2 network built on the OP Stack.',
    photoUrl: '/images/speakers/alexis.jpeg',
    socials: {
      twitter: 'https://x.com/alxs0x',
      linkedin: 'https://www.linkedin.com/in/alexislmq/',
    },
    sessionIds: [],
    isFeatured: true,
  },
  {
    id: 'vinh-nguyen',
    name: 'Vinh Nguyen',
    title: 'ex-Tech Lead',
    company: '1Matrix',
    bio: 'Vinh Nguyen is a former Tech Lead at 1Matrix with deep expertise in blockchain engineering and decentralized infrastructure.',
    photoUrl: '/images/speakers/vinh.jpeg',
    socials: {
      twitter: 'https://x.com/thevinhnguyen4',
      linkedin: 'https://www.linkedin.com/in/vinh-nguyen-047b97183/',
    },
    sessionIds: [],
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}

export function getFeaturedSpeakers(): Speaker[] {
  return speakers.filter((s) => s.isFeatured);
}
