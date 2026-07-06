export interface Project {
  year: string;
  category: string;
  title: string;
  client: string;
  href: string;
  image: string;
}

export interface Service {
  index: string;
  title: string;
  items: string[];
  image: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  index: string;
  label: string;
  href: string;
}
