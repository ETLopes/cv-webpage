export interface Career {
  id: number;
  name: string;
  description: string;
  salary: number;
  skillsRequired: string[];
}

export const careers: Career[] = [
  {
    id: 1,
    name: "Software Engineer",
    description: "Develops and maintains software applications.",
    salary: 120000,
    skillsRequired: ["JavaScript", "TypeScript", "React"],
  },
  {
    id: 2,
    name: "Graphic Designer",
    description: "Creates visual concepts to communicate ideas.",
    salary: 70000,
    skillsRequired: ["Photoshop", "Illustrator", "Creativity"],
  },
  {
    id: 3,
    name: "Data Scientist",
    description:
      "Analyzes and interprets complex data to help companies make decisions.",
    salary: 110000,
    skillsRequired: ["Python", "Machine Learning", "Statistics"],
  },
];
