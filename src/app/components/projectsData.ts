// On utilise les chemins relatifs pour pointer vers le dossier src/img/
import frame573 from "../../img/Frame 573.jpg";
import photo1 from "../../img/DSC00435.jpg";
import photo2 from "../../img/DSC00643.jpg";
import photo3 from "../../img/DSC00024.jpg";
import photo4 from "../../img/DSC00173.jpg";
import photo5 from "../../img/DSC00352.jpg";
import photo6 from "../../img/DSC00268.jpg";
import photo7 from "../../img/DSC01302.jpg";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  image: string;
  description: string;
  context: string;
  gallery: string[];
  liveUrl?: string;
}

const ATNAN = "https://portfolio.atnantas.fr";

const sportPhotos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];

export const projects: Project[] = [
  {
    id: 1,
    slug: "affiches-sport",
    title: "Affiches Sport",
    category: "Design Graphique",
    year: "2024",
    client: "Projets personnels",
    role: "Direction artistique & Design",
    description:
      "Série d'affiches éditoriales dédiées aux grandes figures du sport.",
    context:
      "Une série d'affiches pensées comme des couvertures de magazine sportif : composition dynamique, traitement typographique fort et palette saturée pour traduire l'intensité du jeu et l'aura de chaque athlète. La série rassemble Neymar Jr., Lebron James, et d'autres explorations autour de la culture sport.",
    image: `${ATNAN}/project1.jpg`,
    gallery: [
      `${ATNAN}/project1.jpg`,
      `${ATNAN}/project2.jpg`,
      frame573,
    ],
  },
  {
    id: 2,
    slug: "coohop",
    title: "CooHop!",
    category: "Site Web",
    year: "2024",
    client: "CooHop",
    role: "Design & Développement",
    description:
      "Plateforme pour trouver des partenaires sportifs aux alentours.",
    context:
      "CooHop! met en relation des sportifs en recherche de partenaires d'entraînement à proximité. Le site mise sur une interface claire, des cartes géolocalisées et un parcours d'inscription rapide pour convertir l'intention en première mise en relation.",
    image: `${ATNAN}/project3.jpg`,
    gallery: [
      `${ATNAN}/project3.jpg`,
      `${ATNAN}/mockup2.png`,
      `${ATNAN}/project5.jpg`,
    ],
    liveUrl: "https://portfolio.atnantas.fr/projects",
  },
  {
    id: 3,
    slug: "teaser-jpo-dutilleux",
    title: "Teaser JPO : Conservatoire Henri Dutilleux",
    category: "Audiovisuel",
    year: "2024",
    client: "Conservatoire Henri Dutilleux — Belfort",
    role: "Réalisation & Montage",
    description:
      "Teaser des Journées Portes Ouvertes du Conservatoire de Belfort.",
    context:
      "Un teaser court et rythmé pour annoncer les Journées Portes Ouvertes du Conservatoire Henri Dutilleux. Pensé comme une invitation sensorielle, mêlant captations musicales, instruments et instants de vie de l'établissement.",
    image: `${ATNAN}/project4.jpg`,
    gallery: [
      `${ATNAN}/project4.jpg`,
      `${ATNAN}/project6.jpg`,
      `${ATNAN}/project5.jpg`,
    ],
  },
  {
    id: 4,
    slug: "universite-pasteur",
    title: "Université Pasteur Bourgogne Franche-Comté",
    category: "Communication 360°",
    year: "2024",
    client: "Université Pasteur — Bourgogne Franche-Comté",
    role: "Direction de communication & Design",
    description: "Campagne de communication 360° pour l'Université Pasteur.",
    context:
      "Conception d'une campagne complète déclinée sur l'ensemble des supports — print, digital, signalétique, réseaux sociaux. Un système graphique cohérent pour porter la voix de l'université auprès des étudiants, partenaires et grand public.",
    image: `${ATNAN}/project5.jpg`,
    gallery: [
      `${ATNAN}/project5.jpg`,
      `${ATNAN}/project3.jpg`,
      `${ATNAN}/mockup2.png`,
    ],
  },
  {
    id: 5,
    slug: "la-maitrise-dutilleux",
    title: "La Maîtrise : Conservatoire Henri Dutilleux",
    category: "Audiovisuel",
    year: "2024",
    client: "Conservatoire Henri Dutilleux — Belfort",
    role: "Réalisation & Direction artistique",
    description:
      "Capsule audiovisuelle dédiée à La Maîtrise du Conservatoire.",
    context:
      "Un film court mettant en lumière le travail de La Maîtrise : ensemble vocal jeune du Conservatoire. Captations en répétition et en représentation, étalonnage chaud et mise en récit sensible du quotidien des choristes.",
    image: `${ATNAN}/project6.jpg`,
    gallery: [
      `${ATNAN}/project6.jpg`,
      `${ATNAN}/project4.jpg`,
      `${ATNAN}/project5.jpg`,
    ],
  },
  {
    id: 6,
    slug: "3d-modeling",
    title: "Modélisation & Animation 3D",
    category: "Design 3D",
    year: "2024",
    client: "Projet personnel",
    role: "Modélisation & Animation",
    description: "Exploration personnelle de modélisation et d'animation 3D.",
    context:
      "Un terrain de jeu pour explorer formes, matières et lumière en 3D. Modélisations, mises en scène et courtes animations qui nourrissent en retour mon travail graphique et mes propositions de direction artistique.",
    image: `${ATNAN}/mockup2.png`,
    gallery: [
      `${ATNAN}/mockup2.png`,
      `${ATNAN}/project1.jpg`,
      `${ATNAN}/project2.jpg`,
    ],
  },
  {
    id: 7,
    slug: "photographie-sportive",
    title: "Photographie Sportive",
    category: "Photographie",
    year: "2026",
    client: "Projet personnel",
    role: "Photographe",
    description:
      "Série photographique autour du sport : intensité, geste et lumière.",
    context:
      "Une sélection de photographies prises sur le terrain, en compétition comme à l'entraînement. Je cherche à saisir le geste juste, la concentration et la lumière qui révèle l'effort — sans jamais figer le mouvement.",
    image: sportPhotos[0],
    gallery: sportPhotos,
  },
];