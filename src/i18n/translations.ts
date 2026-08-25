export type Lang = 'en' | 'es';

export interface Translations {
  nav: {
    home: string;
    foodTrucks: string;
    events: string;
    joinThePark: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
  };
  notFoundPage: {
    heading: string;
    body: string;
    backHome: string;
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
    restroomsLabel: string;
    cleaningStationLabel: string;
  };
  vendorCta: {
    heading: string;
    body: string;
    cta: string;
  };
  footer: {
    followHeading: string;
    contactHeading: string;
    privacyCta: string;
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
    allCategories: string;
    noResults: string;
    vendorCtaHeading: string;
    vendorCtaBody: string;
    vendorCtaCta: string;
  };
  eventsPage: {
    heading: string;
    intro: string;
    calendarHeading: string;
    previousMonth: string;
    nextMonth: string;
    jumpToToday: string;
    scheduledHeading: string;
    noScheduledEvents: string;
    dateTbd: string;
    recentEventHeading: string;
    recentEventName: string;
    holdEventHeading: string;
    holdEventBody: string;
    holdEventCta: string;
    pastEventsHeading: string;
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
    sendingCta: string;
    successMessage: string;
    errorMessage: string;
    directLabel: string;
    emailValidationHint: string;
  };
  joinPage: {
    eyebrow: string;
    heading: string;
    intro: string;
    ctaLabel: string;
    ctaMicrocopy: string;
    availabilityOf: string;
    availabilityUnitLabel: string;
    availabilityFilledLabel: string;
    availabilityFreeLabel: string;
    availabilityBody: string;
    availabilityCta: string;
    economicsHeading: string;
    economicsBody: string;
    benefitsHeading: string;
    benefits: { title: string; body: string }[];
    showcaseHeading: string;
    showcaseBody: string;
    howItWorksHeading: string;
    howItWorksSteps: { title: string; body: string }[];
    faqHeading: string;
    faqItems: { question: string; answer: string }[];
    faqSpacesQuestion: string;
    faqSpacesOf: string;
    formHeading: string;
    formIntro: string;
    formReassurance: string;
    nameLabel: string;
    businessLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitCta: string;
    sendingCta: string;
    successMessage: string;
    errorMessage: string;
    instagramCta: string;
    emailValidationHint: string;
    phoneValidationHint: string;
  };
  privacyPage: {
    heading: string;
    effectiveDate: string;
    intro: string;
    collectHeading: string;
    collectBody: string;
    useHeading: string;
    useBody: string;
    thirdPartyHeading: string;
    thirdPartyBody: string;
    sharingHeading: string;
    sharingBody: string;
    contactHeading: string;
    contactBody: string;
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
      menuOpen: 'Menu',
      menuClose: 'Close',
    },
    notFoundPage: {
      heading: 'Page not found',
      body: "The page you're looking for doesn't exist.",
      backHome: 'Back to home',
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
      trucks: '12 Food Trucks',
      friendly: 'Family & Pet Friendly',
      music: 'Live Music Weekly',
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
        'A taste of the flavors you will find across the park, from savory street food to something sweet.',
      imagesComingSoon: 'Images coming soon',
    },
    eventsTeaser: {
      heading: 'Upcoming events',
      subheading: 'Live music, theme nights, and community gatherings.',
      viewAll: 'See all events →',
    },
    diningSection: {
      heading: 'Indoor & Outdoor Dining',
      body: 'Grab a seat wherever the mood strikes. We have covered indoor seating for rainy days and hot afternoons, plus open-air picnic tables for when the weather is perfect. Clean restrooms and a handwashing station are on site too. However you like to eat, there is a spot for you at the park.',
      indoorLabel: 'Indoor seating',
      outdoorLabel: 'Outdoor seating',
      restroomsLabel: 'Restrooms',
      cleaningStationLabel: 'Cleaning station',
    },
    vendorCta: {
      heading: 'Own a food truck?',
      body: 'We have spaces available on a month-to-month basis, no long-term lease required. Join a growing community of vendors and reach hungry regulars every week.',
      cta: 'Join the park',
    },
    footer: {
      followHeading: 'Follow us',
      contactHeading: 'Contact',
      privacyCta: 'Privacy Policy',
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
        'The full lineup parked at Best Bite Food Park. Swing by any day of the week: the crews rotate, so there is always something new to try.',
      allCategories: 'All',
      noResults: 'No food trucks match this filter yet.',
      vendorCtaHeading: 'Interested in Joining Best Bite Food Park as a Vendor?',
      vendorCtaBody:
        'We have spaces available on a month-to-month basis, no long-term lease required. Join a growing community of vendors and reach hungry regulars every week.',
      vendorCtaCta: 'Join the park',
    },
    eventsPage: {
      heading: 'Events',
      intro:
        'Live music, theme nights, and community gatherings happening at the park. Check the calendar for what is coming up.',
      calendarHeading: 'This month',
      previousMonth: 'Previous month',
      nextMonth: 'Next month',
      jumpToToday: 'Today',
      scheduledHeading: 'Scheduled',
      noScheduledEvents: 'No events scheduled this month.',
      dateTbd: 'Date TBD',
      recentEventHeading: 'Most Recent Event',
      recentEventName: 'Back to School',
      holdEventHeading: 'Want to Hold an Event at Best Bite Food Park?',
      holdEventBody:
        'From birthday parties to community fundraisers, our park is a great spot to gather. Reach out and let us know what you have in mind.',
      holdEventCta: 'Contact us',
      pastEventsHeading: 'Past Events',
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
      sendingCta: 'Sending…',
      successMessage: 'Thanks! Your message has been received. We will get back to you soon.',
      errorMessage:
        'Something went wrong sending your message. Please try again or reach us directly.',
      directLabel: 'Prefer to reach us directly?',
      emailValidationHint: 'Enter a valid email address (e.g. name@example.com)',
    },
    joinPage: {
      eyebrow: 'Lease a space · Salem, OR',
      heading: 'Month to Month Flexibility.',
      intro:
        '12 food trucks are already open at Best Bite, most of them for more than a year. Right now, 3 of 15 spaces are available.',
      ctaLabel: 'Ask about a space →',
      ctaMicrocopy: '4 questions · 2 minutes · no commitment',
      availabilityOf: 'of',
      availabilityUnitLabel: 'food truck spaces available',
      availabilityFilledLabel: 'filled',
      availabilityFreeLabel: 'free',
      availabilityBody: "We're especially looking for Asian food.",
      availabilityCta: 'Look at our move-in special →',
      economicsHeading: 'How the Rent Works',
      economicsBody:
        "There's no long-term lease. If a spot doesn't work out for you, it costs you a month, not a year: that's the whole difference.",
      benefitsHeading: 'Why Vendors Choose Best Bite',
      benefits: [
        {
          title: 'Prime Location',
          body: 'We sit on a high-visibility corner in Salem with steady foot and car traffic every day of the week.',
        },
        {
          title: 'No Long-Term Contract',
          body: 'Rent is month-to-month, no lease to sign, so you can stay as long as it makes sense for your business.',
        },
        {
          title: 'Built-In Customer Base',
          body: 'Join a park that already draws regulars for food, live music, and community events.',
        },
        {
          title: 'Shared Amenities',
          body: 'Power hookups, trash service, and seating areas are ready to go. Just pull in and open your window.',
        },
      ],
      showcaseHeading: 'See the Park',
      showcaseBody: 'A look at the space: indoor and outdoor seating, and room for the whole lineup of trucks.',
      howItWorksHeading: 'How to Get Started',
      howItWorksSteps: [
        {
          title: 'Tell us about your truck',
          body: 'What you serve and when you want to start.',
        },
        {
          title: 'We reply',
          body: 'We confirm what is available and what the rent is.',
        },
        {
          title: 'You come see it',
          body: 'Walk the lot before you decide anything.',
        },
      ],
      faqHeading: 'Before You Ask',
      faqItems: [
        {
          question: 'Do I have to sign a long-term lease?',
          answer: 'No. Rent is month to month.',
        },
        {
          question: 'What kind of food are you looking for?',
          answer:
            "Anything that isn't already here. We're especially looking for Asian food, since the lineup is mostly Mexican right now.",
        },
        {
          question: 'What does it cost?',
          answer:
            'Ask through the form below and we will give you the rent for the space that is available.',
        },
      ],
      faqSpacesQuestion: 'How many spaces are available?',
      faqSpacesOf: 'of',
      formHeading: 'Inquire About Leasing a Spot',
      formIntro:
        'Tell us about your food truck and we will follow up with availability and next steps.',
      formReassurance: 'No commitment, and nothing to sign.',
      nameLabel: 'Name',
      businessLabel: 'Food truck / business name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      messageLabel: 'Tell us about your truck',
      submitCta: 'Send inquiry',
      sendingCta: 'Sending…',
      successMessage: 'Thanks! Your inquiry has been received. We will be in touch soon.',
      errorMessage:
        'Something went wrong sending your inquiry. Please try again or message us on Instagram.',
      instagramCta: 'Or message us on Instagram',
      emailValidationHint: 'Enter a valid email address (e.g. name@example.com)',
      phoneValidationHint: 'Enter a 10-digit phone number',
    },
    privacyPage: {
      heading: 'Privacy Policy',
      effectiveDate: 'Effective August 25, 2026',
      intro:
        'Best Bite Food Park respects your privacy. This page explains what information we collect through this website and how we use it.',
      collectHeading: 'What we collect',
      collectBody:
        'When you use the contact form or the vendor lease inquiry form, we collect the information you enter: your name, email address, phone number (lease form only), business name (lease form only), and your message.',
      useHeading: 'How we use it',
      useBody:
        'We use this information only to respond to your message, follow up on your interest in leasing a space, or answer your question. We do not use it for advertising or marketing.',
      thirdPartyHeading: 'Form delivery',
      thirdPartyBody:
        'Both forms on this site are delivered to us using a third-party service, Web3Forms, which processes and forwards your submission to our inbox. We do not otherwise share your information with third parties.',
      sharingHeading: 'Sharing and retention',
      sharingBody:
        'We do not sell your information. We keep messages only as long as needed to respond to your inquiry.',
      contactHeading: 'Questions',
      contactBody: 'If you have questions about this policy, contact us using the details below.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      foodTrucks: 'Food Trucks',
      events: 'Eventos',
      joinThePark: 'Únete al Parque',
      contact: 'Contacto',
      menuOpen: 'Menú',
      menuClose: 'Cerrar',
    },
    notFoundPage: {
      heading: 'Página no encontrada',
      body: 'La página que buscas no existe.',
      backHome: 'Volver al inicio',
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
      trucks: '12 Food Trucks',
      friendly: 'Familiar y Apto para Mascotas',
      music: 'Música en Vivo Semanal',
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
        'Una probada de los sabores que encontrarás en el parque, de antojitos salados a algo dulce.',
      imagesComingSoon: 'Imágenes próximamente',
    },
    eventsTeaser: {
      heading: 'Próximos eventos',
      subheading: 'Música en vivo, noches temáticas y encuentros comunitarios.',
      viewAll: 'Ver todos los eventos →',
    },
    diningSection: {
      heading: 'Comedor Interior y al Aire Libre',
      body: 'Siéntate donde prefieras. Tenemos asientos cubiertos para los días de lluvia o calor, además de mesas al aire libre para cuando el clima está perfecto. También contamos con baños limpios y una estación para lavarse las manos. Como sea que te guste comer, aquí hay un lugar para ti en el parque.',
      indoorLabel: 'Asientos interiores',
      outdoorLabel: 'Asientos al aire libre',
      restroomsLabel: 'Baños',
      cleaningStationLabel: 'Estación de limpieza',
    },
    vendorCta: {
      heading: '¿Tienes un food truck?',
      body: 'Tenemos espacios disponibles mes a mes, sin contrato a largo plazo. Únete a una comunidad de vendedores en crecimiento y llega a clientes frecuentes cada semana.',
      cta: 'Únete al parque',
    },
    footer: {
      followHeading: 'Síguenos',
      contactHeading: 'Contacto',
      privacyCta: 'Aviso de Privacidad',
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
        'La alineación completa en Best Bite Food Park. Pasa cualquier día de la semana: los camiones rotan, así que siempre hay algo nuevo que probar.',
      allCategories: 'Todos',
      noResults: 'Ningún food truck coincide con este filtro todavía.',
      vendorCtaHeading: '¿Interesado en Unirte a Best Bite Food Park como Vendedor?',
      vendorCtaBody:
        'Tenemos espacios disponibles mes a mes, sin contrato a largo plazo. Únete a una comunidad de vendedores en crecimiento y llega a clientes frecuentes cada semana.',
      vendorCtaCta: 'Únete al parque',
    },
    eventsPage: {
      heading: 'Eventos',
      intro:
        'Música en vivo, noches temáticas y encuentros comunitarios en el parque. Revisa el calendario para ver lo que se viene.',
      calendarHeading: 'Este mes',
      previousMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      jumpToToday: 'Hoy',
      scheduledHeading: 'Programado',
      noScheduledEvents: 'No hay eventos programados este mes.',
      dateTbd: 'Fecha por confirmar',
      recentEventHeading: 'Evento Más Reciente',
      recentEventName: 'Regreso a Clases',
      holdEventHeading: '¿Quieres Realizar un Evento en Best Bite Food Park?',
      holdEventBody:
        'Desde fiestas de cumpleaños hasta recaudaciones de fondos comunitarias, nuestro parque es un gran lugar para reunirse. Contáctanos y cuéntanos qué tienes en mente.',
      holdEventCta: 'Contáctanos',
      pastEventsHeading: 'Eventos Pasados',
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
      sendingCta: 'Enviando…',
      successMessage: '¡Gracias! Tu mensaje fue recibido. Te responderemos pronto.',
      errorMessage:
        'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o contáctanos directamente.',
      directLabel: '¿Prefieres contactarnos directamente?',
      emailValidationHint: 'Ingresa un correo electrónico válido (ej. nombre@ejemplo.com)',
    },
    joinPage: {
      eyebrow: 'Renta de espacio · Salem, OR',
      heading: 'Flexibilidad de Mes a Mes.',
      intro:
        '12 food trucks ya están abiertos en Best Bite, la mayoría desde hace más de un año. Ahora mismo, 3 de 15 espacios están libres.',
      ctaLabel: 'Pregunta por un espacio →',
      ctaMicrocopy: '4 preguntas · 2 minutos · sin compromiso',
      availabilityOf: 'de',
      availabilityUnitLabel: 'espacios para food trucks disponibles',
      availabilityFilledLabel: 'ocupados',
      availabilityFreeLabel: 'libres',
      availabilityBody: 'Buscamos especialmente comida asiática.',
      availabilityCta: 'Mira nuestra promoción de mudanza →',
      economicsHeading: 'Cómo Funciona la Renta',
      economicsBody:
        'No hay contrato a largo plazo. Si el lugar no te funciona, te cuesta un mes y no un año: esa es toda la diferencia.',
      benefitsHeading: 'Por Qué los Vendedores Eligen Best Bite',
      benefits: [
        {
          title: 'Ubicación Privilegiada',
          body: 'Estamos en una esquina de alta visibilidad en Salem, con tráfico peatonal y vehicular constante toda la semana.',
        },
        {
          title: 'Sin Contrato a Largo Plazo',
          body: 'La renta es mes a mes, sin contrato que firmar, para que te quedes el tiempo que le convenga a tu negocio.',
        },
        {
          title: 'Clientela Ya Establecida',
          body: 'Únete a un parque que ya atrae clientes frecuentes por la comida, la música en vivo y los eventos comunitarios.',
        },
        {
          title: 'Servicios Compartidos',
          body: 'Conexión eléctrica, servicio de basura y áreas para sentarse ya están listos. Solo llega y abre tu ventana.',
        },
      ],
      showcaseHeading: 'Conoce el Parque',
      showcaseBody:
        'Un vistazo al espacio: asientos interiores y al aire libre, y lugar para toda la alineación de trucks.',
      howItWorksHeading: 'Cómo Empezar',
      howItWorksSteps: [
        {
          title: 'Cuéntanos de tu truck',
          body: 'Qué vendes y cuándo quieres empezar.',
        },
        {
          title: 'Te respondemos',
          body: 'Confirmamos qué hay disponible y cuánto es la renta.',
        },
        {
          title: 'Vienes a verlo',
          body: 'Recorre el lote antes de decidir nada.',
        },
      ],
      faqHeading: 'Antes de Preguntar',
      faqItems: [
        {
          question: '¿Tengo que firmar un contrato a largo plazo?',
          answer: 'No. La renta es mes a mes.',
        },
        {
          question: '¿Qué tipo de comida buscan?',
          answer:
            'Lo que todavía no está aquí. Buscamos especialmente comida asiática, porque ahora la mayoría es mexicana.',
        },
        {
          question: '¿Cuánto cuesta?',
          answer:
            'Pregunta por el formulario de abajo y te decimos la renta del espacio disponible.',
        },
      ],
      faqSpacesQuestion: '¿Cuántos espacios hay disponibles?',
      faqSpacesOf: 'de',
      formHeading: 'Pregunta Sobre Rentar un Espacio',
      formIntro:
        'Cuéntanos sobre tu food truck y te contactaremos con la disponibilidad y los siguientes pasos.',
      formReassurance: 'Sin compromiso y sin nada que firmar.',
      nameLabel: 'Nombre',
      businessLabel: 'Nombre del food truck / negocio',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      messageLabel: 'Cuéntanos sobre tu truck',
      submitCta: 'Enviar solicitud',
      sendingCta: 'Enviando…',
      successMessage: '¡Gracias! Tu solicitud fue recibida. Nos pondremos en contacto pronto.',
      errorMessage:
        'Algo salió mal al enviar tu solicitud. Inténtalo de nuevo o escríbenos por Instagram.',
      instagramCta: 'O escríbenos por Instagram',
      emailValidationHint: 'Ingresa un correo electrónico válido (ej. nombre@ejemplo.com)',
      phoneValidationHint: 'Ingresa un número de teléfono de 10 dígitos',
    },
    privacyPage: {
      heading: 'Aviso de Privacidad',
      effectiveDate: 'Vigente desde el 25 de agosto de 2026',
      intro:
        'En Best Bite Food Park respetamos tu privacidad. Esta página explica qué información recopilamos a través de este sitio web y cómo la usamos.',
      collectHeading: 'Qué recopilamos',
      collectBody:
        'Cuando usas el formulario de contacto o el formulario de solicitud de renta para vendedores, recopilamos la información que ingresas: tu nombre, correo electrónico, número de teléfono (solo formulario de renta), nombre del negocio (solo formulario de renta) y tu mensaje.',
      useHeading: 'Cómo la usamos',
      useBody:
        'Usamos esta información únicamente para responder a tu mensaje, dar seguimiento a tu interés en rentar un espacio, o contestar tu pregunta. No la usamos para publicidad ni mercadotecnia.',
      thirdPartyHeading: 'Entrega de formularios',
      thirdPartyBody:
        'Ambos formularios de este sitio se entregan mediante un servicio externo, Web3Forms, que procesa y reenvía tu solicitud a nuestra bandeja de entrada. No compartimos tu información con terceros de ninguna otra forma.',
      sharingHeading: 'Uso compartido y retención',
      sharingBody:
        'No vendemos tu información. Conservamos los mensajes solo el tiempo necesario para responder a tu solicitud.',
      contactHeading: 'Preguntas',
      contactBody:
        'Si tienes preguntas sobre este aviso, contáctanos usando los datos que aparecen abajo.',
    },
  },
};
