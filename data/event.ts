/**
 * Single source of truth for all event content.
 * Brand team: edit this file only — do not change components for copy updates.
 */

export type EventMode = "In-person" | "Hybrid" | "Virtual";

export type AgendaItem = {
  id: string;
  startIso: string; // ISO 8601 with +05:30 for IST
  endIso: string;
  title: string;
  speaker?: string;
  description?: string;
  isBreak?: boolean;
  /** Keynote or highlight — pink accent border in schedule UI */
  featured?: boolean;
};

export type AgendaDay = {
  id: string;
  label: string;
  dateIso: string; // YYYY-MM-DD
  items: AgendaItem[];
};

export type FeaturedVideo = {
  id: string;
  youtubeId: string; // Replace with real YouTube video ID
  /** Local MP4 in /public — takes precedence over YouTube when set */
  fileSrc?: string;
  title: string;
  caption: string;
  personName: string;
  designation: string;
  /** Optional label e.g. "2:30" shown on the video card */
  duration?: string;
  /** Still shown before the video starts */
  posterSrc?: string;
};

export type Speaker = {
  id: string;
  name: string;
  designation: string;
  specialty: string;
  photoSrc: string;
  bio: string;
  sessionLabel?: string;
  /** Larger grid card with Keynote badge */
  keynote?: boolean;
};

export type EventConfig = {
  siteName: string;
  title: string;
  tagline: string;
  about: string;
  /** Event start (countdown target) — IST */
  startIso: string;
  /** Event end — IST */
  endIso: string;
  displayDate: string;
  displayTime: string;
  venue: {
    name: string;
    addressLines: string[];
    city: string;
    mapEmbedUrl: string;
    directionsUrl: string;
  };
  mode: EventMode;
  ics: {
    summary: string;
    description: string;
    location: string;
  };
  videos: FeaturedVideo[];
  agendaDays: AgendaDay[];
  speakers: Speaker[];
  footer: {
    websiteUrl: string;
    websiteLabel: string;
    disclaimer: string;
  };
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const eventConfig: EventConfig = {
  siteName: "Motherhood Hospitals",
  title: "Natural Birthing Event",
  tagline:
    "A CME on hospital-based natural and water birth — warm, evidence-led, and designed for clinical teams.",
  about:
    "Join Motherhood Hospitals for a continuing medical education programme on natural birthing pathways, water birth protocols in hospital settings, and safe escalation when intervention is needed. Placeholder copy — replace with brochure language before go-live.",
  startIso: "2026-10-05T09:00:00+05:30",
  endIso: "2026-10-05T14:00:00+05:30",
  displayDate: "Monday, 5 October 2026 (placeholder)",
  displayTime: "9:00 AM – 2:00 PM IST (placeholder)",
  venue: {
    name: "Motherhood Hospitals — Venue TBC",
    addressLines: ["Address line 1 — from brochure", "Address line 2 — from brochure"],
    city: "Bengaluru, Karnataka",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.013!2d77.6139!3d12.9732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzIzLjUiTiA3N8KwMzYnNTAuMCJF!5e0!3m2!1sen!2sin!4v1",
    directionsUrl: "https://maps.google.com/?q=Motherhood+Hospitals+Bengaluru",
  },
  mode: "In-person",
  ics: {
    summary: "Natural Birthing Event — Motherhood Hospitals",
    description:
      "CME on natural and water birth. Details on the participant hub. Placeholder — update before send.",
    location: "Venue TBC — Motherhood Hospitals",
  },
  videos: [
    {
      id: "doctor-message",
      youtubeId: "placeholder",
      fileSrc: "/videos/vijayarathna-sireesha-reddy.mp4",
      title: "A Message from Leadership & Clinical Faculty",
      caption:
        "Mr. Vijayarathna Venkatraman and Dr. Sireesha Reddy share perspectives on natural birthing at Motherhood Hospitals.",
      personName: "Mr. Vijayarathna Venkatraman & Dr. Sireesha Reddy",
      designation: "CEO · Motherhood Hospitals & Consultant Obstetrician",
      duration: "2:15",
      posterSrc: "/videos/vijayarathna-sireesha-reddy-poster.jpg",
    },
    {
      id: "ceo-message",
      youtubeId: "dQw4w9WgXcQ",
      title: "A Message from our CEO",
      caption: "Placeholder video — replace youtubeId in data/event.ts",
      personName: "Mr. Name Surname",
      designation: "Chief Executive Officer · Motherhood Hospitals",
    },
  ],
  agendaDays: [
    {
      id: "day-1",
      label: "Day 1",
      dateIso: "2026-10-05",
      items: [
        {
          id: "reg",
          startIso: "2026-10-05T08:30:00+05:30",
          endIso: "2026-10-05T09:00:00+05:30",
          title: "Registration",
          description: "Coffee and check-in",
        },
        {
          id: "welcome",
          startIso: "2026-10-05T09:00:00+05:30",
          endIso: "2026-10-05T09:20:00+05:30",
          title: "Welcome",
          speaker: "Mr. Vijayarathna Venkatraman",
          description: "Opening remarks",
          featured: true,
        },
        {
          id: "session-1",
          startIso: "2026-10-05T09:20:00+05:30",
          endIso: "2026-10-05T10:10:00+05:30",
          title: "Natural birth vs standard delivery",
          speaker: "Dr. Sireesha Reddy",
          description: "Clinical perspectives — confirm from brochure",
        },
        {
          id: "tea",
          startIso: "2026-10-05T10:10:00+05:30",
          endIso: "2026-10-05T10:30:00+05:30",
          title: "Tea break",
          isBreak: true,
        },
        {
          id: "session-2",
          startIso: "2026-10-05T10:30:00+05:30",
          endIso: "2026-10-05T11:20:00+05:30",
          title: "Water birth in hospital",
          description: "Protocols and safety",
        },
        {
          id: "session-3",
          startIso: "2026-10-05T11:20:00+05:30",
          endIso: "2026-10-05T12:10:00+05:30",
          title: "Support in labour",
          description: "Movement, hydrotherapy, the birth team",
        },
        {
          id: "lunch",
          startIso: "2026-10-05T13:00:00+05:30",
          endIso: "2026-10-05T13:45:00+05:30",
          title: "Lunch",
          isBreak: true,
        },
        {
          id: "open",
          startIso: "2026-10-05T13:45:00+05:30",
          endIso: "2026-10-05T14:00:00+05:30",
          title: "Open house",
          description: "Questions and cases",
        },
      ],
    },
  ],
  speakers: [
    {
      id: "ceo",
      name: "Mr. Vijayarathna Venkatraman",
      designation: "Chief Executive Officer",
      specialty: "Leadership · Motherhood Hospitals",
      photoSrc: "/speakers/ai-ceo.jpg",
      bio: "Placeholder bio — two decades in healthcare. Replace from brochure.",
      sessionLabel: "Welcome · 09:00",
      keynote: true,
    },
    {
      id: "dr-reddy",
      name: "Dr. Sireesha Reddy",
      designation: "MBBS, MD, MRCOG, CCT (UK)",
      specialty: "Obstetrics · Water birth",
      photoSrc: "/speakers/ai-dr-reddy.jpg",
      bio: "Placeholder bio — expert in normal delivery and water birth. Replace from brochure.",
      sessionLabel: "Natural birth vs standard delivery",
    },
    {
      id: "dr-mv",
      name: "Dr. Madhushree Vijayakumar",
      designation: "MBBS, MRCOG, FRCOG, DGO",
      specialty: "Natural birth",
      photoSrc: "/speakers/ai-dr-mv.jpg",
      bio: "Placeholder bio — session title and timing from brochure.",
    },
    {
      id: "team",
      name: "Birth team",
      designation: "Physio · Midwifery · Neonatology · Lactation",
      specialty: "Multidisciplinary support",
      photoSrc: "/speakers/ai-birth-team.jpg",
      bio: "Placeholder — allied faculty names from brochure.",
      sessionLabel: "Support in labour",
    },
  ],
  footer: {
    websiteUrl: "https://www.motherhoodindia.com/",
    websiteLabel: "motherhoodindia.com",
    disclaimer:
      "This event is for educational purposes and does not replace personalized medical advice.",
  },
  logo: {
    src: "/motherhood-logo.png",
    alt: "Motherhood Hospitals",
    width: 237,
    height: 80,
  },
};
