// Everything here was supplied by the lab head, except entries marked TODO.
export const TODO = 'TODO';

export const SITE = {
  labName: 'Yun Lab', // TODO(verify): official lab name (placeholder derived from PI surname)
  institution: 'Department of Laboratory Medicine, Korea University College of Medicine', // from PubMed affiliation strings; TODO(verify) current wording
  tagline: TODO,
  about: TODO,
  links: {
    scholar: 'https://scholar.google.com/citations?user=t13fBnoAAAAJ&hl=ko',
    pure: 'https://pure.korea.ac.kr/en/persons/seung-gyu-yun/',
  },
  contact: { email: TODO, address: TODO, phone: TODO },
};

export const RESEARCH_AREAS: { title: string; description: string }[] = [
  { title: 'Organ on a chip', description: TODO },
  { title: 'Hematologic malignancy', description: TODO },
  { title: 'Clinical chemistry', description: TODO },
  { title: 'Therapeutic drug monitoring', description: TODO },
];

export const MEMBERS: { name: string; degree?: string; role: string; note?: string }[] = [
  { name: 'Seung Gyu Yun', degree: 'M.D, Ph.D', role: 'Principal Investigator' }, // TODO(verify): exact title/position
  { name: 'Jiyeon Kang', role: TODO },
  { name: 'Jiyoon Song', role: TODO },
];
