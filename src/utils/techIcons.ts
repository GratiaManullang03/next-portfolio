// Map nama teknologi dari data ke file icon di public/assets/icons
const iconMap: Record<string, string> = {
    React: 'reactjs.webp',
    'Next.js': 'next.svg', // Pakai yang di root public jika belum ada di icons
    TypeScript: 'typescript.webp', // Cek ketersediaan, kalau ga ada nanti default
    'Tailwind CSS': 'tailwind.webp',
    TailwindCSS: 'tailwind.webp', // Handle variasi nama
    Vite: 'vite.svg',
    Laravel: 'laravel.webp',
    PHP: 'php.webp',
    MySQL: 'mysql.webp',
    Bootstrap: 'bootstrap.webp',
    Go: 'golang.webp',
    'Go (Golang)': 'golang.webp',
    Redis: 'redis.webp',
    PostgreSQL: 'postgresql.webp',
    Docker: 'docker.webp',
    Python: 'python.webp',
    Flutter: 'flutter.webp',
    Dart: 'dart.webp',
    MongoDB: 'mongodb.webp',
    Firebase: 'firebase.webp',
    'C#': 'csharp.webp',
    'ASP.NET': 'aspnet.webp',
    'C++': 'c++.webp',
    Odoo: 'odoo.webp',
    Figma: 'figma.webp',
    Gin: 'gin.webp',
    Git: 'git.webp',
    'NATS JetStream': 'nats.webp',
    k6: 'k6.webp',
    Swagger: 'swagger.webp',
    SketchUp: 'sketchup.webp',
    FlexSim: 'flexsim.webp',
    'IBM SPSS': 'ibm-spss.webp',
    R: 'r.webp',
    'Hugging Face': 'huggingface.webp',
    'HTML/CSS': 'html5.webp',
    JavaScript: 'javascript.webp',
    jQuery: 'jquery.webp',
    SweetAlert2: 'javascript.webp', // Fallback
};

export const getTechIcon = (techName: string): string | null => {
    // Coba cari match langsung
    if (iconMap[techName]) {
        // Cek apakah itu svg root atau webp icons
        if (iconMap[techName].endsWith('.svg')) {
            return `/${iconMap[techName]}`;
        }
        return `/assets/icons/${iconMap[techName]}`;
    }

    // Coba cari partial match (misal "React Native" -> match "React")
    const key = Object.keys(iconMap).find((k) => techName.includes(k));
    if (key) {
        if (iconMap[key].endsWith('.svg')) {
            return `/${iconMap[key]}`;
        }
        return `/assets/icons/${iconMap[key]}`;
    }

    return null;
};
