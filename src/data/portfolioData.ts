
export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  image?: string;
  skills: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Recommendation {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  aboutMe: string;
  resumeLink: string;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  recommendations: Recommendation[];
  socialLinks: SocialLink[];
  email: string;
}

const portfolioData: PortfolioData = {
  name: "Yash Channe",
  title: "Project Coordinator",
  aboutMe: "I am a passionate Project Coordinator with experience in managing cross-functional teams and driving successful project outcomes. With a background in data analysis and team leadership, I excel at optimizing workflows and meeting strategic objectives. I'm committed to continuous learning and applying innovative solutions to complex problems.",
  resumeLink: "/YashChanne_Resume.pdf",
  skills: [
    // PM Tools
    { name: "JIRA", level: 90, category: "PM Tools" },
    { name: "MS Project", level: 85, category: "PM Tools" },
    { name: "Trello", level: 95, category: "PM Tools" },
    { name: "Asana", level: 80, category: "PM Tools" },
    
    // Data Tools
    { name: "Excel", level: 95, category: "Data Tools" },
    { name: "Tableau", level: 85, category: "Data Tools" },
    { name: "SQL", level: 75, category: "Data Tools" },
    { name: "Power BI", level: 80, category: "Data Tools" },
    
    // Languages
    { name: "Python", level: 70, category: "Languages" },
    { name: "JavaScript", level: 65, category: "Languages" },
    { name: "HTML/CSS", level: 80, category: "Languages" },
    
    // Soft Skills
    { name: "Team Leadership", level: 90, category: "Soft Skills" },
    { name: "Communication", level: 95, category: "Soft Skills" },
    { name: "Problem Solving", level: 85, category: "Soft Skills" },
    { name: "Time Management", level: 90, category: "Soft Skills" },
  ],
  projects: [
    {
      id: 1,
      title: "Cross-functional Team Project",
      description: "Led a team of 8 members across 3 departments to streamline the customer onboarding process, reducing onboarding time by 40%.",
      githubLink: "https://github.com/yashchanne",
      skills: ["Project Management", "Team Leadership", "Process Improvement"]
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      description: "Developed a comprehensive analytics dashboard using Tableau to track KPIs across departments, improving decision-making efficiency by 30%.",
      githubLink: "https://github.com/yashchanne",
      skills: ["Tableau", "Data Analysis", "KPI Tracking"]
    },
    {
      id: 3,
      title: "Workflow Automation Tool",
      description: "Implemented an automated workflow solution that reduced manual processing time by 60% and minimized error rates by 45%.",
      githubLink: "https://github.com/yashchanne",
      skills: ["Automation", "Process Improvement", "Python"]
    },
    {
      id: 4,
      title: "Resource Allocation System",
      description: "Designed and implemented a resource allocation system to optimize team productivity, resulting in a 25% increase in project completion rates.",
      githubLink: "https://github.com/yashchanne",
      skills: ["Resource Management", "MS Project", "Team Coordination"]
    },
  ],
  certifications: [
    {
      id: 1,
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      date: "2023",
      link: "https://www.pmi.org/"
    },
    {
      id: 2,
      name: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      date: "2022",
      link: "https://www.scrumalliance.org/"
    },
    {
      id: 3,
      name: "Advanced Excel Certification",
      issuer: "Microsoft",
      date: "2021",
      link: "https://www.microsoft.com/"
    },
    {
      id: 4,
      name: "Data Analysis Professional",
      issuer: "DataCamp",
      date: "2022",
      link: "https://www.datacamp.com/"
    },
  ],
  recommendations: [
    {
      id: 1,
      name: "Jane Doe",
      position: "Senior Project Manager",
      company: "ABC Corporation",
      text: "Yash demonstrated exceptional leadership skills and a keen eye for detail while managing our cross-departmental initiatives. His ability to coordinate multiple stakeholders and deliver results on time made him an invaluable team member."
    },
    {
      id: 2,
      name: "John Smith",
      position: "Director of Operations",
      company: "XYZ Industries",
      text: "Working with Yash was a pleasure. His analytical approach to problem-solving and proactive communication style ensured that our projects ran smoothly even under tight deadlines and changing requirements."
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yashchanne",
      icon: "GitHub"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yashchanne",
      icon: "Linkedin"
    },
  ],
  email: "yash.channe@example.com"
};

export default portfolioData;
