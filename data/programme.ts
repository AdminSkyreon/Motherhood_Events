/** Content from "Natural Birthing Programme Agenda V02" (PDF), used by the landing page. */

export const programmeEvent = {
  tagline: { accent: "Care", rest: " like no other." },
  presents: "PRESENTS",
  title: ["Normalising", "the Normal"],
  subtitle: "A Day of Scientific Learning, Global Perspectives & Clinical Excellence.",
  date: "4th October 2026",
  time: "8:00 AM - 5:00 PM",
  venue: ["The Chancery Pavilion,", "Residency Road,", "Bengaluru"],
};

export type ProgrammeSpeaker = { name: string; role: string[]; photo: string };

export const programmeSpeakers: ProgrammeSpeaker[] = [
  {
    name: "Dr. Evita Fernandez",
    role: ["Chairperson &", "Managing Director,", "Fernandez Foundation", "Hyderabad"],
    photo: "/brochure/speakers/evita-fernandez.jpg",
  },
  { name: "Dr. Gowri Motha", role: ["Founder", "Gentle Birth Method", "London"], photo: "/brochure/speakers/gowri-motha.jpg" },
  {
    name: "Dr. Sireesha Reddy",
    role: ["Senior Consultant (OBG)", "at Motherhood Hospitals", "Hebbal"],
    photo: "/brochure/speakers/sireesha-reddy.jpg",
  },
  { name: "Priyanka Idicula", role: ["Director & Founder", "Birthvillage.", "Kerala"], photo: "/brochure/speakers/priyanka-idicula.jpg" },
  {
    name: "Dr. (Hons) Inderjeet Kaur",
    role: ["Director of Midwifery,", "Fernandez Foundation."],
    photo: "/brochure/speakers/inderjeet-kaur.jpg",
  },
];

/** `name` = pink bold, `topic` = pink medium, `role` = body, `talk` = italic, `strong` = bold body. */
export type AgendaLine = { text: string; kind?: "name" | "topic" | "role" | "talk" | "strong" };

export type AgendaItem = { time: string; label: string; lines?: AgendaLine[] };

export type AgendaBlock = { id: string; time: string; title: string; items: AgendaItem[] };

export const programmeAgenda: AgendaBlock[] = [
  {
    id: "welcome",
    time: "8:15 AM - 9:20 AM",
    title: "Welcome & Inauguration",
    items: [
      { time: "8:15 AM - 8:45 AM", label: "REGISTRATION", lines: [{ text: "Attendance marking for all guests, dignitaries and delegates." }] },
      { time: "8:45 AM onwards", label: "PROCEED FOR SEATING", lines: [{ text: "Seating for the session." }] },
      { time: "9:00 AM", label: "FORMAL WELCOME", lines: [{ text: "Welcoming all the guests, dignitaries & colleagues." }] },
      {
        time: "9:00 AM - 9:10 AM",
        label: "LAMP-LIGHTING CEREMONY",
        lines: [{ text: "The lamp lighting ceremony will be graced by Mr. Vishal Bali, Chairman, AHH, along with the distinguished dignitaries." }],
      },
      {
        time: "9:10 AM - 9:20 AM",
        label: "CEO ADDRESS & FELICITATION",
        lines: [{ text: "Mr. Vijayarathna Venkatraman’s address, followed by the felicitation of the dignitaries." }],
      },
    ],
  },
  {
    id: "morning",
    time: "9:20 AM - 1:30 PM",
    title: "Morning Scientific Sessions",
    items: [
      {
        time: "9:20 AM - 10:00 AM",
        label: "SESSION",
        lines: [
          { text: "Dr. Sireesha Reddy", kind: "name" },
          { text: "Sr. Consultant - Obstetrics & Gynaecology", kind: "role" },
          { text: "Journey of 100+ Natural / Water Births at Motherhood.", kind: "talk" },
        ],
      },
      {
        time: "10:00 AM - 11:30 AM",
        label: "SESSION",
        lines: [
          { text: "Dr. Gowri Motha", kind: "name" },
          { text: "Founder, The Gentle Birth Method, London", kind: "role" },
          { text: "Gentle Birth and the Challenges.", kind: "talk" },
        ],
      },
      { time: "11:30 AM - 11:45 AM", label: "TEA BREAK" },
      {
        time: "11:45 AM - 1:30 PM",
        label: "SESSION",
        lines: [
          { text: "Priyanka Idicula", kind: "name" },
          { text: "Founder, Birthvillage, Kerala", kind: "role" },
          { text: "Saga of a Passage and the Passenger.", kind: "talk" },
        ],
      },
    ],
  },
  {
    id: "afternoon",
    time: "1:30 PM - 2:45 PM",
    title: "Afternoon Sessions",
    items: [
      { time: "1:30 PM - 2:00 PM", label: "BREAK" },
      {
        time: "2:00 PM - 2:15 PM",
        label: "PERFORMANCE",
        lines: [
          { text: "Water Birth Skit", kind: "topic" },
          { text: "By Natural Birthing Unit, Motherhood Hospital, Hebbal." },
          { text: "Getting the Dive Right.", kind: "talk" },
        ],
      },
      {
        time: "2:15 PM - 3:30 PM",
        label: "SESSION",
        lines: [
          { text: "Hydrotherapy and Water-births", kind: "name" },
          { text: "What the Evidence Says and How to Practice It Safely.", kind: "talk" },
          { text: "Dr. (Hons) Inderjeet Kaur", kind: "name" },
          { text: "Director of Midwifery, Fernandez Foundation." },
        ],
      },
      {
        time: "3:30 PM - 3:45 PM",
        label: "SESSION",
        lines: [
          { text: "Perineum Tears or Tears", kind: "topic" },
          { text: "Dr. Annanya Reddy M.S (OG)", kind: "strong" },
        ],
      },
    ],
  },
  {
    id: "finale",
    time: "2:50 PM onwards",
    title: "Program Finale & Closing",
    items: [
      {
        time: "3:50 PM - 4:05 PM",
        label: "SESSION",
        lines: [
          { text: "Beyond Delivery:", kind: "topic" },
          { text: "Paediatric Presentation", kind: "topic" },
          { text: "By Dr. Vikas Satwik" },
          { text: "Consultant - Paediatrics and Neonatology", kind: "talk" },
          { text: "Dr. Sneha Lingappa" },
          { text: "Consultant - Paediatrics and Neonatology", kind: "talk" },
        ],
      },
      {
        time: "4:05 PM - 4:45 PM",
        label: "DISCUSSION",
        lines: [
          { text: "Fireside Chat", kind: "name" },
          { text: "Evolution of Modern Methods of Birth Plan - with" },
          { text: "Dr. Evita Fernandez", kind: "name" },
          { text: "Dr. Gowri Motha", kind: "name" },
          { text: "Dr. Sireesha Reddy", kind: "name" },
          { text: "Priyanka Idicula", kind: "name" },
        ],
      },
      {
        time: "4:50 PM - 5:00 PM",
        label: "SCREENING",
        lines: [
          { text: "Film Screening", kind: "name" },
          { text: "A Journey That Continues.", kind: "talk" },
          { text: "video documentary." },
        ],
      },
      { time: "5:00 PM", label: "VOTE OF THANKS", lines: [{ text: "Followed by High Tea", kind: "strong" }] },
    ],
  },
];

/** Day at a Glance — `highlight` rows are blue in the PDF. */
export const programmeGlance: { time: string; items: string[]; highlight?: boolean }[] = [
  { time: "8:15 AM - 8:45 AM", items: ["Registration"] },
  { time: "8:45 AM onwards", items: ["Proceed for Seating"] },
  { time: "9:00 AM", items: ["Formal Welcome"] },
  { time: "9:00 AM - 9:10 AM", items: ["Lamp-Lighting Ceremony"] },
  { time: "9:10 AM - 9:20 AM", items: ["CEO Address & Felicitation"] },
  { time: "9:20 AM - 10:00 AM", items: ["Journey of 100+ Natural/ Water Births", "Dr. Sireesha Reddy"] },
  { time: "10:00 AM - 11:30 AM", items: ["Gentle Birth and the Challenges", "Dr. Gowri Motha"] },
  { time: "11:30 AM - 11:45 AM", items: ["TEA BREAK"], highlight: true },
  { time: "11:45 AM - 1:30 PM", items: ["Saga of a Passage and the Passenger", "Priyanka Idicula"] },
  { time: "1:30 PM - 2:00 PM", items: ["LUNCH BREAK"], highlight: true },
  { time: "2:00 PM - 2:15 PM", items: ["Water Birth Skit - Getting the Dive Right"] },
  { time: "2:15 PM - 3:30 PM", items: ["Hydrotherapy & Water Births", "Dr. (Hons) Inderjeet Kaur"] },
  { time: "3:30 PM - 3:45 PM", items: ["Perineum Tears or Tears", "Dr. Annanya Reddy"] },
  { time: "3:50 PM - 4:05 PM", items: ["Paediatric Team - Beyond Delivery"] },
  { time: "4:05 PM - 4:45 PM", items: ["Fireside Chat - Evolution of Modern Birth Plans"] },
  { time: "4:50 PM - 5:00 PM", items: ["Film Screening - A Journey That Continues"] },
  { time: "5:00 PM", items: ["Vote of Thanks"] },
  { time: "Following", items: ["High Tea"] },
];

export const programmeNotes = {
  intro: "All sessions will be held at The Chancery Pavilion, Bengaluru, from 8:15 AM to 5:00 PM.",
  notes: [
    {
      title: "Arrive Early",
      body: "Registration opens at 8:15 AM and seating begins at 8:45 AM - please arrive a few minutes early so you don’t miss the formal welcome and lamp-lighting ceremony.",
    },
    {
      title: "Full-Day Programme",
      body: "The agenda runs continuously from registration through high tea, with a tea break, lunch break, and several scientific and cultural sessions in between - including a newly added session on hydrotherapy and waterbirths.",
    },
    {
      title: "Meet the Speakers",
      body: "Dr. Gowri Motha, Dr. Evita Fernandez, Priyanka Idicula, Dr. Sireesha Reddy and Dr. (Hons) Inderjeet Kaur anchors the day’s sessions - do stay for the Q&A and fireside chat to engage with them directly.",
    },
  ],
  welcome: "Welcome to Normalising the Normal.",
  closing: "WE CAN’T WAIT TO WELCOME YOU ON 4TH OCTOBER 2026.",
};

export const programmeMessage = {
  eyebrow: "Messages",
  title: "Words from Our Leaders",
  people: [
    { name: "Mr. Vijayarathna Venkatraman", role: "Chief Executive Officer, Motherhood Hospitals" },
    { name: "Dr. Sireesha Reddy", role: "Sr. Consultant - Obstetrics & Gynaecology" },
  ],
  caption: "Perspectives on natural birthing and the journey of 100+ natural / water births at Motherhood.",
};

export const programmeThanks = {
  title: "Thank you.",
  body: "See you on 4th October 2026 at The Chancery Pavilion, Bangalore.",
};
