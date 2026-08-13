export type Lang = 'en' | 'es';

export interface Translations {
  nav: {
    home: string;
    foodTrucks: string;
    events: string;
    joinThePark: string;
    contact: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    imageAlt: string;
    ctaTrucks: string;
    ctaJoin: string;
  };
  trustBar: {
    heading: string;
    trucks: string;
    friendly: string;
    music: string;
    parking: string;
  };
  trucksTeaser: {
    heading: string;
    subheading: string;
    viewAll: string;
  };
  foodsSection: {
    kicker: string;
    heading: string;
    subheading: string;
    imagesComingSoon: string;
  };
  eventsTeaser: {
    heading: string;
    subheading: string;
    viewAll: string;
  };
  diningSection: {
    heading: string;
    body: string;
    indoorLabel: string;
    outdoorLabel: string;
  };
  vendorCta: {
    heading: string;
    body: string;
    cta: string;
  };
  footer: {
    followHeading: string;
    contactHeading: string;
  };
  visitSection: {
    heading: string;
    mapTitle: string;
    addressHeading: string;
    hoursHeading: string;
    closed: string;
    directionsCta: string;
  };
  foodTrucksPage: {
    heading: string;
    intro: string;
  };
  eventsPage: {
    heading: string;
    intro: string;
    calendarHeading: string;
  };
  contactPage: {
    heading: string;
    intro: string;
    nameLabel: string;
    emailLabel: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    reasonGeneral: string;
    reasonVendor: string;
    reasonEvent: string;
    reasonOther: string;
    messageLabel: string;
    submitCta: string;
    successMessage: string;
    directLabel: string;
  };
  joinPage: {
    heading: string;
    intro: string;
    benefitsHeading: string;
    benefits: { title: string; body: string }[];
    showcaseHeading: string;
    showcaseBody: string;
    availabilityHeading: string;
    availabilityBody: string;
    availabilitySlotsLabel: string;
    formHeading: string;
    formIntro: string;
    nameLabel: string;
    businessLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitCta: string;
    successMessage: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: 'Home',
      foodTrucks: 'Food Trucks',
      events: 'Events',
      joinThePark: 'Join the Park',
      contact: 'Contact',
    },
    hero: {
      kicker: 'Salem, OR · Food Truck Park',
      titleLine1: 'Best Bite',
      titleLine2: 'Food Park',
      imageAlt: 'Aerial view of the Best Bite Food Park',
      ctaTrucks: 'See the food trucks',
      ctaJoin: 'Join the park',
    },
    trustBar: {
      heading: 'Why Visit',
      trucks: '9 Food Trucks',
      friendly: 'Family & Pet Friendly',
      music: 'Live Music Monthly',
      parking: 'Free Parking',
    },
    trucksTeaser: {
      heading: 'Featured Food Trucks',
      subheading: 'Our featured trucks rotate monthly, so there is always something new to try.',
      viewAll: 'View all food trucks',
    },
    foodsSection: {
      kicker: 'Gallery',
      heading: 'What to Eat',
      subheading:
        'A taste of the flavors you will find across the park — from savory street food to something sweet.',
      imagesComingSoon: 'Images coming soon',
    },
    eventsTeaser: {
      heading: 'Upcoming events',
      subheading: 'Live music, theme nights, and community gatherings.',
      viewAll: 'See all events →',
    },
    diningSection: {
      heading: 'Indoor & Outdoor Dining',
      body: 'Grab a seat wherever the mood strikes. We have covered indoor seating for rainy days and hot afternoons, plus open-air picnic tables for when the weather is perfect. However you like to eat, there is a spot for you at the park.',
      indoorLabel: 'Indoor seating',
      outdoorLabel: 'Outdoor seating',
    },
    vendorCta: {
      heading: 'Own a food truck?',
      body: 'We have spaces available on a month-to-month basis — no long-term lease required. Join a growing community of vendors and reach hungry regulars every week.',
      cta: 'Join the park',
    },
    footer: {
      followHeading: 'Follow us',
      contactHeading: 'Contact',
    },
    visitSection: {
      heading: 'Visit Us',
      mapTitle: 'Map to Best Bite Food Park',
      addressHeading: 'Address',
      hoursHeading: 'Hours',
      closed: 'Closed',
      directionsCta: 'Get directions',
    },
    foodTrucksPage: {
      heading: 'Food Trucks',
      intro:
        'The full lineup parked at Best Bite Food Park. Swing by any day of the week — the crews rotate, so there is always something new to try.',
    },
    eventsPage: {
      heading: 'Events',
      intro:
        'Live music, theme nights, and community gatherings happening at the park. Check the calendar for what is coming up.',
      calendarHeading: 'This month',
    },
    contactPage: {
      heading: 'Contact Us',
      intro:
        'Questions about the park, our food trucks, or planning an event? Send us a message and our team will get back to you soon.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      reasonLabel: 'Reason for contacting us',
      reasonPlaceholder: 'Select a reason',
      reasonGeneral: 'General inquiry',
      reasonVendor: 'Food truck vendor interest',
      reasonEvent: 'Event or private booking',
      reasonOther: 'Something else',
      messageLabel: 'Message',
      submitCta: 'Send message',
      successMessage: 'Thanks! Your message has been received — we will get back to you soon.',
      directLabel: 'Prefer to reach us directly?',
    },
    joinPage: {
      heading: 'Join the Park',
      intro:
        'Best Bite Food Park is looking for food trucks to join our lineup. Here is what makes the park a great place to grow your business.',
      benefitsHeading: 'Why Vendors Choose Best Bite',
      benefits: [
        {
          title: 'Prime Location',
          body: 'We sit on a high-visibility corner in Salem with steady foot and car traffic every day of the week.',
        },
        {
          title: 'No Long-Term Contract',
          body: 'Rent is month-to-month — no lease to sign, so you can stay as long as it makes sense for your business.',
        },
        {
          title: 'Built-In Customer Base',
          body: 'Join a park that already draws regulars for food, live music, and community events.',
        },
        {
          title: 'Shared Amenities',
          body: 'Power hookups, trash service, and seating areas are ready to go — just pull in and open your window.',
        },
      ],
      showcaseHeading: 'See the Park',
      showcaseBody:
        'A look at the space — indoor and outdoor seating, and room for the whole lineup of trucks.',
      availabilityHeading: 'Spaces Are Limited',
      availabilityBody:
        'We only have room for a set number of trucks at a time, so spots do not stay open for long. Reach out today to check current availability.',
      availabilitySlotsLabel: 'Food truck spaces',
      formHeading: 'Inquire About Leasing a Spot',
      formIntro:
        'Tell us about your food truck and we will follow up with availability and next steps.',
      nameLabel: 'Name',
      businessLabel: 'Food truck / business name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      messageLabel: 'Tell us about your truck',
      submitCta: 'Send inquiry',
      successMessage: 'Thanks! Your inquiry has been received — we will be in touch soon.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      foodTrucks: 'Food Trucks',
      events: 'Eventos',
      joinThePark: 'Únete al Parque',
      contact: 'Contacto',
    },
    hero: {
      kicker: 'Salem, OR · Parque de Food Trucks',
      titleLine1: 'Best Bite',
      titleLine2: 'Food Park',
      imageAlt: 'Vista aérea del Best Bite Food Park',
      ctaTrucks: 'Ver los food trucks',
      ctaJoin: 'Únete al parque',
    },
    trustBar: {
      heading: 'Por Qué Visitarnos',
      trucks: '9 Food Trucks',
      friendly: 'Familiar y Apto para Mascotas',
      music: 'Música en Vivo Mensual',
      parking: 'Estacionamiento Gratis',
    },
    trucksTeaser: {
      heading: 'Food Trucks Destacados',
      subheading:
        'Nuestros food trucks destacados rotan cada mes, así que siempre hay algo nuevo que probar.',
      viewAll: 'Ver todos los food trucks',
    },
    foodsSection: {
      kicker: 'Galería',
      heading: 'Qué Comer',
      subheading:
        'Una probada de los sabores que encontrarás en el parque — de antojitos salados a algo dulce.',
      imagesComingSoon: 'Imágenes próximamente',
    },
    eventsTeaser: {
      heading: 'Próximos eventos',
      subheading: 'Música en vivo, noches temáticas y encuentros comunitarios.',
      viewAll: 'Ver todos los eventos →',
    },
    diningSection: {
      heading: 'Comedor Interior y al Aire Libre',
      body: 'Siéntate donde prefieras. Tenemos asientos cubiertos para los días de lluvia o calor, además de mesas al aire libre para cuando el clima está perfecto. Como sea que te guste comer, aquí hay un lugar para ti en el parque.',
      indoorLabel: 'Asientos interiores',
      outdoorLabel: 'Asientos al aire libre',
    },
    vendorCta: {
      heading: '¿Tienes un food truck?',
      body: 'Tenemos espacios disponibles mes a mes — sin contrato a largo plazo. Únete a una comunidad de vendedores en crecimiento y llega a clientes frecuentes cada semana.',
      cta: 'Únete al parque',
    },
    footer: {
      followHeading: 'Síguenos',
      contactHeading: 'Contacto',
    },
    visitSection: {
      heading: 'Visítanos',
      mapTitle: 'Mapa a Best Bite Food Park',
      addressHeading: 'Dirección',
      hoursHeading: 'Horario',
      closed: 'Cerrado',
      directionsCta: 'Cómo llegar',
    },
    foodTrucksPage: {
      heading: 'Food Trucks',
      intro:
        'La alineación completa en Best Bite Food Park. Pasa cualquier día de la semana — los camiones rotan, así que siempre hay algo nuevo que probar.',
    },
    eventsPage: {
      heading: 'Eventos',
      intro:
        'Música en vivo, noches temáticas y encuentros comunitarios en el parque. Revisa el calendario para ver lo que se viene.',
      calendarHeading: 'Este mes',
    },
    contactPage: {
      heading: 'Contáctanos',
      intro:
        '¿Tienes preguntas sobre el parque, nuestros food trucks o quieres planear un evento? Envíanos un mensaje y nuestro equipo te responderá pronto.',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      reasonLabel: 'Motivo de tu mensaje',
      reasonPlaceholder: 'Selecciona un motivo',
      reasonGeneral: 'Consulta general',
      reasonVendor: 'Interés en ser vendedor de food truck',
      reasonEvent: 'Evento o reservación privada',
      reasonOther: 'Otro',
      messageLabel: 'Mensaje',
      submitCta: 'Enviar mensaje',
      successMessage: '¡Gracias! Tu mensaje fue recibido — te responderemos pronto.',
      directLabel: '¿Prefieres contactarnos directamente?',
    },
    joinPage: {
      heading: 'Únete al Parque',
      intro:
        'Best Bite Food Park está buscando food trucks para sumarse a nuestra alineación. Esto es lo que hace del parque un gran lugar para hacer crecer tu negocio.',
      benefitsHeading: 'Por Qué los Vendedores Eligen Best Bite',
      benefits: [
        {
          title: 'Ubicación Privilegiada',
          body: 'Estamos en una esquina de alta visibilidad en Salem, con tráfico peatonal y vehicular constante toda la semana.',
        },
        {
          title: 'Sin Contrato a Largo Plazo',
          body: 'La renta es mes a mes — sin contrato que firmar, para que te quedes el tiempo que le convenga a tu negocio.',
        },
        {
          title: 'Clientela Ya Establecida',
          body: 'Únete a un parque que ya atrae clientes frecuentes por la comida, la música en vivo y los eventos comunitarios.',
        },
        {
          title: 'Servicios Compartidos',
          body: 'Conexión eléctrica, servicio de basura y áreas para sentarse ya están listos — solo llega y abre tu ventana.',
        },
      ],
      showcaseHeading: 'Conoce el Parque',
      showcaseBody:
        'Un vistazo al espacio — asientos interiores y al aire libre, y lugar para toda la alineación de trucks.',
      availabilityHeading: 'Los Espacios Son Limitados',
      availabilityBody:
        'Solo tenemos lugar para un número determinado de trucks a la vez, así que los espacios no duran disponibles por mucho tiempo. Contáctanos hoy para conocer la disponibilidad actual.',
      availabilitySlotsLabel: 'Espacios para food trucks',
      formHeading: 'Pregunta Sobre Rentar un Espacio',
      formIntro:
        'Cuéntanos sobre tu food truck y te contactaremos con la disponibilidad y los siguientes pasos.',
      nameLabel: 'Nombre',
      businessLabel: 'Nombre del food truck / negocio',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      messageLabel: 'Cuéntanos sobre tu truck',
      submitCta: 'Enviar solicitud',
      successMessage: '¡Gracias! Tu solicitud fue recibida — nos pondremos en contacto pronto.',
    },
  },
};
