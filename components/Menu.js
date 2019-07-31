const Menu = [
  {
    name: 'О нас',
    url: '/about',
    children: [
      {
        name: 'Что мы делаем',
        url: '/about#what-we-do',
      },
      {
        name: 'Годовые отчеты',
        url: '/reports',
      },
      {
        name: 'Работа у нас',
        url: '/about#vacancies',
      },
      {
        name: 'Наши партнеры',
        url: '/about#partners',
      },
      {
        name: 'Как нас найти',
        url: '/about#contact',
      },
      {
        name: 'Медиа-кит',
        url: '/mediakit',
      },
    ],
  },
  {
    name: 'Люди',
    url: '/people',
    children: [
      {
        name: 'Руководство',
        url: '/people#management',
      },
      {
        name: 'Научный совет',
        url: '/people#scientific-committee',
      },
      {
        name: 'Международный консультативный совет',
        url: '/people#international-board',
      },
      {
        name: 'Попечительский совет',
        url: '/people#board-of-trustees',
      },
    ],
  },
  {
    name: 'Исследования',
    url: '/research',
    children: [
      {
        name: 'Научные группы',
        url: '/research#groups',
      },
      {
        name: 'Публикации',
        url: '/publications',
      },
    ],
  },
  {
    name: 'Образование',
    url: '/education',
    children: [
      {
        name: 'РКЦ и МФТИ',
        url: '/education#mfti',
      },
      {
        name: 'РКЦ и МИСиС',
        url: '/education#misis',
      },
      {
        name: 'РКЦ и РВК',
        url: '/education#rvk',
      },
      {
        name: 'Возможные темы',
        url: '/education#projects',
      },
    ],
  },
  {
    name: 'Продукты',
    url: '/#products',
    children: [
      {
        name: 'Квантовые коммуникации',
        url: 'http://goqrate.com',
      },
      {
        name: 'Детектор одиночных фотонов',
        url: 'http://goqrate.com/#photon-detector',
      },
      {
        name: 'Твердотельный фотоумножитель',
        url: 'https://www.dephan.com/',
      },
      {
        name: 'Фемтосекундный лазер с диодной накачкой',
        url: 'http://femtovision.ru/',
      },
    ],
  },
  {
    name: 'Новости',
    url: '/news',
    children: [],
  },
  {
    name: 'Мероприятия',
    url: '/events',
    children: [],
  },
];

export default Menu;
