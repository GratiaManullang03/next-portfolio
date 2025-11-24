export interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    type: 'work' | 'organization';
}

export const workExperiences: Experience[] = [
    {
        id: 'alfagift',
        role: 'Backend Developer Intern',
        company: 'Alfagift (PT Global Loyalty Indonesia)',
        period: 'Feb 2025 - Present',
        location: 'Tangerang, Indonesia',
        description:
            'Developing and maintaining internal web applications using FastAPI and PostgreSQL with Clean Architecture. Implemented multi-level approval systems, email notifications, and shipment tracking features.',
        type: 'work',
    },
    {
        id: 'samanasoft-3',
        role: 'Software Engineer Intern',
        company: 'PT Samanasoft Inovasi Persada',
        period: 'Sep 2024 - Oct 2024',
        location: 'Tangerang Regency, Indonesia',
        description:
            'Developed new modules and features to enhance existing enterprise programs, contributing to ongoing software improvement and innovation cycles.',
        type: 'work',
    },
    {
        id: 'samanasoft-2',
        role: 'Machine Learning Engineer Intern',
        company: 'PT Samanasoft Inovasi Persada',
        period: 'Jun 2024 - Jul 2024',
        location: 'Tangerang Regency, Indonesia',
        description:
            'Engineered a Machine Learning model to provide precise medication dosage recommendations for patients, integrating it with existing hospital systems.',
        type: 'work',
    },
    {
        id: 'samanasoft-1',
        role: 'AI Developer Intern',
        company: 'PT Samanasoft Inovasi Persada',
        period: 'Jun 2023 - Jul 2023',
        location: 'Tangerang Regency, Indonesia',
        description:
            'Developed an AI ChatBot for hospital systems to streamline doctor consultation bookings and automate patient inquiries.',
        type: 'work',
    },
    {
        id: 'umn-tar',
        role: 'Talent Acquisition Representative',
        company: 'Polytechnic Multimedia Nusantara',
        period: 'Oct 2024 - Nov 2024',
        location: 'North Sumatra, Indonesia',
        description:
            'Represented the university at educational fairs in Pematang Siantar and Medan. Engaged with prospective students and promoted academic programs.',
        type: 'work',
    },
    {
        id: 'umn-cvc',
        role: 'Campus Visit Committee',
        company: 'Polytechnic Multimedia Nusantara',
        period: 'Jan 2023 - Aug 2023',
        location: 'Tangerang Regency, Indonesia',
        description:
            'Guided high school students during campus tours, facilitating recruitment processes and introducing academic facilities to potential candidates.',
        type: 'work',
    },
];

export const organizationalExperiences: Experience[] = [
    {
        id: 'himapalik',
        role: 'President',
        company: 'E-Commerce Logistics Student Association',
        period: 'Jan 2023 - Jun 2024',
        location: 'UMN Polytechnic',
        description:
            'Led the student association, organized campus events, managed internal divisions, and fostered a collaborative environment for students in the logistics program.',
        type: 'organization',
    },
    {
        id: 'eclival-2024',
        role: 'Chairman',
        company: 'ECLIVAL 2024',
        period: '2024',
        location: 'UMN Polytechnic',
        description:
            'Spearheaded the ECLIVAL festival organized by the E-Commerce Logistics Student Association, overseeing event planning, budgeting, and execution.',
        type: 'organization',
    },
    {
        id: 'inaugurasi-2024',
        role: 'Chairman & Show Director',
        company: 'Inaugurasi 2024',
        period: '2024',
        location: 'UMN Polytechnic',
        description:
            'Directed the senate session welcoming new students (Inauguration), managing the creative vision and operational flow of the event.',
        type: 'organization',
    },
    {
        id: 'anagata-2023',
        role: 'Head of Event Division',
        company: 'Anagata 2023',
        period: '2023',
        location: 'UMN Polytechnic',
        description:
            'Led the event division for the new student orientation event, designing engaging activities and ensuring smooth event logistics.',
        type: 'organization',
    },
    {
        id: 'squidwork',
        role: 'Team Member',
        company: 'National Business Plan Competition',
        period: '2023',
        location: 'National Level',
        description:
            'Participated as part of team "SquidWork" in the National Business Plan 2023 competition, demonstrating innovative business thinking.',
        type: 'organization',
    },
];
