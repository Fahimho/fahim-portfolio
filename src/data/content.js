// ============================================================
// PORTFOLIO CONTENT — MD. Fahim Hossain Sarker
// ALL of this will be editable from the admin panel later.
// ============================================================
import uftbLogo from "../assets/logos/uftb.png";
import tgcoLogo from "../assets/logos/tgco.jpg";
import techtopiaLogo from "../assets/logos/techtopia.png";
import robodemyLogo from "../assets/logos/robodemy.jpg";
import tpsLogo from "../assets/logos/tps.png";
import robofusionLogo from "../assets/logos/robofusion.jpg";
import esonanceLogo from "../assets/logos/esonance.jpg";
export const personal = {
  name: "MD. Fahim Hossain Sarker",
  nameHighlight: "Fahim",
  titles: [
    "IoT & Robotics Engineering Student",
    "Robotics Enthusiast",
    "Embedded Systems Learner",
    "R&D Team Member @ Tech Topia",
    "Assistant Trainer @ Robodemy",
  ],
  photo: "",
  statusDot: true,

  // Motivational messages that show on hover over the status dot
  motivations: [
    "Sometimes you have to believe!",
    "Let's build something amazing.",
    "Hardware + Software = Magic.",
    "Always learning, always growing.",
    "The future is engineered today.",
  ],

  location: "Gazipur-1711, Dhaka, Bangladesh",
  email: "mdfahimhossainsarker81@gmail.com",
  phone: "01879168216",
};
export const socials = {
  facebook: "https://www.facebook.com/MDFahimHossain81",
  github: "https://github.com/Fahimho",
  linkedin: "https://www.linkedin.com/in/fahim174752/",
};

// Sidebar menu — order matters, admin panel will allow reorder
export const menuItems = [
  { id: "about",           label: "About me",        icon: "User" },
  { id: "education",       label: "Education",       icon: "GraduationCap" },
  { id: "experience",      label: "Experience",      icon: "Briefcase" },
  { id: "skills",          label: "Skills",          icon: "Wrench" },
  { id: "certifications",  label: "Certifications",  icon: "Award" },
  { id: "achievements",    label: "Achievements",    icon: "Trophy" },
  { id: "projects",        label: "Projects",        icon: "Folder" },
  { id: "extracurricular", label: "Extra-Curricular",icon: "Heart" },
  { id: "contact",         label: "Contact",         icon: "Send" },
];

// Everything below will get filled in future chunks
  export const about = {
  greeting: "Hello",
  greetingIcon: "👋",             
  headline: "I'm",
  greetingSize: "medium",          
  headlineSize: "xlarge",          
  paragraphs: [
    "I grew up in Gazipur, Bangladesh, and my curiosity for how things work started early — taking apart toys, fixing gadgets, and wondering what made circuits tick. That curiosity eventually led me to choose IoT and Robotics Engineering as my path.",

    "Today, I'm an undergraduate student at the University of Frontier Technology, Bangladesh, where I'm building a strong foundation in embedded systems, sensors, and automation. Outside the classroom, I work as a Senior Executive Member in the R&D team at Tech Topia, where I get to experiment with new hardware and turn ideas into working prototypes. I also serve as an Assistant Trainer at Robodemy, helping beginners take their first steps into robotics and Arduino programming.",

    "Along the way, I've volunteered at events like UFTB RoboFusion 1.0 and IUT ESONANCE 2023, where I discovered that I enjoy the energy of organizing, coordinating, and learning alongside other passionate people. My time at TPS Debating Club taught me how to think on my feet and speak with clarity — skills that stay with me in every project I take on.",

    "I'm still early in my journey, but I'm hungry to learn, eager to build, and always looking for the next problem worth solving. If you have an idea, a project, or an opportunity where I can contribute, I'd love to hear from you.",
  ],
  photo: "", // empty = show User icon placeholder
};
export const education = [
  {
  degreeAccent: "BSc in",
  degreeRest: "Internet of Things and Robotics Engineering",
  institution: "University of Frontier Technology, Bangladesh",
  institutionUrl: "https://uftb.ac.bd/",
  location: "Gazipur, Dhaka, Bangladesh",
  start: "Aug 2025",
  end: "Jul 2029",
  current: true,
  logo: uftbLogo,
  logoStyle: "white-bg",      // ← NEW: use white bg for this logo
  description:
    "Currently pursuing a Bachelor's degree in IoT and Robotics Engineering at UFTB, focusing on embedded systems, sensors, automation, and microcontroller-based projects.",
  highlights: [],
},
  {
    degreeAccent: "Higher Secondary Certificate",
    degreeRest: "in Science",
    institution: "Tongi Govt. College",
    institutionUrl: "https://tgco.edu.bd/",  
    location: "Gazipur, Dhaka, Bangladesh",
    start: "Feb 2023",
    end: "Aug 2024",
    current: false,
    logo: tgcoLogo,
    description:
      "Completed Higher Secondary Certificate in the Science stream with a strong foundation in mathematics, physics, and chemistry — the stepping stones toward engineering.",
    highlights: [
      "GPA 5.00 / 5.00",
      "Science Group",
    ],
  },
];
export const experience = [
  {
    roleAccent: "Senior Executive Member",
    roleRest: "— R&D Team",
    organization: "Tech Topia",
    orgUrl: "",                                   // add website later if any
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    start: "31 Jan 2023",
    end: "",
    current: true,
    logo: techtopiaLogo, 
     logoFit: "contain",
    // logo URL — empty = initials
    description:
      "Working on research and development of IoT and robotics projects. Contributing to embedded system design, sensor integration, and hardware prototyping in a fast-paced team environment.",
    skills: ["Arduino", "ESP32", "Embedded C++", "Sensors"],
  },
  {
    roleAccent: "Assistant Trainer",
    roleRest: "",
    organization: "Robodemy",
    orgUrl: "",
    location: "Dhaka, Bangladesh",
    type: "Part-time",
    start: "1 Dec 2024",
    end: "",
    current: true,
    logo: robodemyLogo,
    logoFit: "cover",   
    description:
      "Training students in robotics fundamentals, Arduino programming, and hands-on project building. Helping beginners transition from theory to real hardware.",
    skills: ["Arduino", "Robotics", "Teaching", "Mentoring"],
  },
  {
    roleAccent: "Member",
    roleRest: "",
    organization: "TPS Debating Club",
    orgUrl: "",
    location: "Gazipur, Bangladesh",
    type: "Member",
    start: "1 Feb 2022",
    end: "16 Mar 2023",
    current: false,
    logo: tpsLogo,
    logoFit: "contain",
    description:
      "Active member of the debating club, participating in inter-school debates and developing communication, critical thinking, and public speaking skills.",
    skills: ["Public Speaking", "Debate", "Communication"],
  },
];
export const skills = {
  // Top highlight cards (2 big feature cards)
  highlights: [
    {
      icon: "Cpu",                // lucide icon name
      title: "IoT & Embedded Systems",
      description:
        "Building connected hardware with Arduino, ESP32, sensors, and microcontrollers. From circuit design to firmware and cloud integration.",
      skills: ["Arduino", "ESP32", "Sensors", "Embedded C++"],
    },
    {
      icon: "Bot",
      title: "Robotics",
      description:
        "Designing and programming robots — from line followers and obstacle avoiders to multi-sensor autonomous systems with motor control and PID.",
      skills: ["Robotics", "Motor Control", "PID", "PWM"],
    },
  ],

  // Skill categories with progress bars
  categories: [
    {
      name: "Programming Languages",
      skills: [
        {
          name: "C",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
          description:
            "Strong foundation in C for embedded and low-level programming — pointers, memory management, and structured code.",
        },
        {
          name: "Arduino C++",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
          description:
            "Writing efficient Arduino sketches for sensors, actuators, displays, and communication protocols (I2C, SPI, UART).",
        },
        {
          name: "Java",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          description:
            "Object-oriented programming fundamentals — classes, inheritance, and basic data structures.",
        },
        {
          name: "Data Structures & Algorithms",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
          description:
            "Core DSA concepts in C — arrays, linked lists, stacks, queues, sorting, and searching.",
        },
      ],
    },
    {
      name: "Hardware & Embedded",
      skills: [
        {
          name: "Arduino",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
          description:
            "Extensive hands-on experience with Uno, Nano, and Mega boards for rapid prototyping.",
        },
        {
          name: "ESP32 / ESP8266",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Wi-Fi and Bluetooth enabled IoT projects — MQTT, HTTP, and local web servers.",
        },
        {
          name: "STM32",
          level: 55,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Learning ARM Cortex-M development with STM32CubeIDE and HAL libraries.",
        },
        {
          name: "Raspberry Pi",
          level: 65,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
          description:
            "Linux-based projects, Python scripting, and hardware interfacing via GPIO.",
        },
        {
          name: "Sensors & Actuators",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Working with ultrasonic, IR, temperature, humidity, gas, and motion sensors — plus motors, servos, and relays.",
        },
        {
          name: "Soldering & Prototyping",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Through-hole and SMD soldering, breadboard layouts, and general circuit assembly.",
        },
      ],
    },
    {
      name: "Software & Tools",
      skills: [
        {
          name: "Arduino IDE",
          level: 95,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
          description:
            "Primary development environment for embedded projects — library management, serial debugging.",
        },
        {
          name: "VS Code",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
          description:
            "Main code editor for web development, Python, and general programming with extensions.",
        },
           {
  name: "Git & GitHub",
  level: 75,
  icon: "https://cdn.simpleicons.org/github/181717",       // ← black for light theme
  iconDark: "https://cdn.simpleicons.org/github/ffffff",  // ← white for dark theme
  description:
    "Version control, branching, pull requests, and collaborative workflows.",
},
        {
          name: "Tinkercad & Fritzing",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Circuit simulation and schematic design before physical prototyping.",
        },
        {
          name: "Espressif IDE",
          level: 65,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "ESP-IDF development for advanced ESP32 features beyond the Arduino framework.",
        },
           {
  name: "AutoCAD",
  level: 50,
  icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/autocad/default.svg",
  description:
    "Learning 2D drafting and 3D modeling fundamentals for mechanical and electrical drawings.",
},
        {
          name: "Circuit Design",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg",
          description:
            "Basic PCB design, schematic drawing, and component selection.",
        },
      ],
    },
    {
      name: "Languages",
      skills: [
        {
          name: "Bangla",
          level: 100,
          icon: "https://flagcdn.com/w80/bd.png",
          description:
            "Native speaker with excellent communication and writing skills.",
        },
        {
          name: "Hindi",
          level: 85,
          icon: "https://flagcdn.com/w80/in.png",
          description:
            "Fluent spoken and conversational Hindi.",
        },
        {
          name: "English",
          level: 70,
          icon: "https://flagcdn.com/w80/us.png",
          description:
            "Intermediate reading, writing, and speaking — comfortable with technical content.",
        },
      ],
    },
  ],
};
// ============================================================
// PROJECTS — add via admin panel later
// Each project: title, tagline, category, status, dates, role,
// problem, features, tech, video, images, docs, github, live, team,
// learnings, future, thumbnail
// ============================================================
export const projects = [
  // Example (uncomment to test):
  // {
  //   title: "Smart Home Automation",
  //   tagline: "Control your home from anywhere",
  //   category: "IoT",
  //   status: "Completed",
  //   start: "Jan 2025",
  //   end: "Mar 2025",
  //   role: "Lead Developer",
  //   problem: "Manual switching wastes energy and time",
  //   features: ["App control", "Voice commands", "Scheduling"],
  //   tech: ["ESP32", "MQTT", "React"],
  //   video: "",
  //   images: [],
  //   docs: "",
  //   github: "",
  //   live: "",
  //   team: [],
  //   learnings: "...",
  //   future: "...",
  //   thumbnail: "",
  // },
];

// ============================================================
// EXTRA-CURRICULAR / VOLUNTEER
// ============================================================
export const extracurricular = [
   {
    roleAccent: "Volunteer",
    roleRest: "",
    event: "UFTB RoboFusion 1.0",
    organizer: "University of Frontier Technology, Bangladesh",
    location: "Gazipur, Bangladesh",
    start: "8 Aug 2026",
    end: "",
    current: false,
    logo: robofusionLogo,
    description:
      "Volunteered at the university's flagship robotics event — supported participants, managed logistics, and helped run competition rounds.",
    skills: ["Event Management", "Teamwork", "Robotics"],
  },
    {
    roleAccent: "Volunteer",
    roleRest: "",
    event: "ESONANCE 2023",
    organizer:
      "Department of Electrical & Electronic Engineering (EEE), Islamic University of Technology (IUT)",
    location: "Dhaka, Bangladesh",
    start: "",
    end: "",
    current: false,
    logo: esonanceLogo,
    description:
      "Volunteered at IUT ESONANCE 2023, assisting with event coordination and technical support during the engineering festival.",
    skills: ["Volunteering", "Coordination", "Technical Support"],
  },
];
export const contact = {
  heading: "Get in",
  headingAccent: "Touch",
  endpoint: "https://formspree.io/f/xaeqajgy",
  description:
    "Have a project idea, an opportunity, or just want to say hi? Drop me a message — I'll get back as soon as I can.",

  // Contact form fields (labels can be customized)
  form: {
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    messageLabel: "Message",
    submitLabel: "Send Message",
    successMessage: "Thanks! Your message has been sent.",
  },
};

// Footer
export const footer = {
  copyright: "© 2026 MD. Fahim Hossain Sarker. All rights reserved.",
  tagline: "Built with React, Tailwind & ❤️",
};

export const certifications = [];
export const achievements = [];


export const settings = {
  language: "🇧🇩",
  defaultSection: "about",
};