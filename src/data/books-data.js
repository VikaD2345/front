// Данные о книгах для магазина
export const booksData = [
  {
    id: 1,
    title: 'Хоббит, или Туда и обратно',
    author: 'Джон Рональд Руэл Толкин',
    price: 450,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23000000" font-size="18" font-weight="bold">ХОББИТ</text><text x="100" y="170" text-anchor="middle" fill="%23000000" font-size="12">Или туда и обратно</text><text x="100" y="200" text-anchor="middle" fill="%23CC0000" font-size="14">Толкин</text></svg>',
    description: 'Волшебная сказка о приключениях хоббита Бильбо Бэггинса',
    fullDescription: 'Классическое произведение фэнтези-литературы. Маленький хоббит Бильбо Бэггинс живет спокойной жизнью в Норовке, но его приключения начинают с появления волшебника Гэндальфа. Вместе с карликами он отправляется в опасное путешествие, чтобы вернуть украденное сокровище.',
    year: 1937,
    pages: 384,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Граф Монте-Кристо',
    author: 'Александр Дюма',
    price: 520,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23CC0000" font-size="20" font-weight="bold">ГРАФ</text><text x="100" y="175" text-anchor="middle" fill="%23CC0000" font-size="20" font-weight="bold">МОНТЕ-КРИСТО</text><text x="100" y="210" text-anchor="middle" fill="%23000000" font-size="12">Дюма</text></svg>',
    description: 'История о мести и справедливости. Подростка Эдмона Дантеса несправедливо обвиняют и бросают в тюрьму',
    fullDescription: 'Один из величайших романов приключений всех времен. Молодой моряк Эдмон Дантес ненадолго брошен в темницу благодаря клевете завистливых людей. После побега из тюрьмы он находит сокровище и отправляется в путь мести.',
    year: 1844,
    pages: 928,
    rating: 4.9
  },
  {
    id: 3,
    title: 'Джейн Эйр',
    author: 'Шарлотта Бронте',
    price: 480,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23000000" font-size="18" font-weight="bold">ДЖЕЙН</text><text x="100" y="175" text-anchor="middle" fill="%23000000" font-size="18" font-weight="bold">ЭЙР</text><text x="100" y="210" text-anchor="middle" fill="%23CC0000" font-size="14">Бронте</text></svg>',
    description: 'Романтичная история любви и самопознания героини, преодолевающей трудности судьбы',
    fullDescription: 'Классический роман о судьбе девушки, лишенной родительской любви. Джейн Эйр ищет счастья и самоуважения, преодолевая жизненные испытания. Её встреча с мистером Рочестером изменит её жизнь навсегда.',
    year: 1847,
    pages: 496,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Преступление и наказание',
    author: 'Федор Михайлович Достоевский',
    price: 590,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23CC0000" font-size="18" font-weight="bold">ПРЕСТУПЛЕНИЕ</text><text x="100" y="175" text-anchor="middle" fill="%23CC0000" font-size="18" font-weight="bold">И НАКАЗАНИЕ</text><text x="100" y="210" text-anchor="middle" fill="%23000000" font-size="12">Достоевский</text></svg>',
    description: 'Психологический триллер о моральных дилеммах и внутренних конфликтах главного героя',
    fullDescription: 'Один из самых влиятельных романов в мировой литературе. Раскольников совершает убийство, движимый своей теорией, но затем испытывает душевный конфликт и приходит к внутреннему возрождению.',
    year: 1866,
    pages: 672,
    rating: 4.9
  },
  {
    id: 5,
    title: 'Мастер и Маргарита',
    author: 'Михаил Афанасьевич Булгаков',
    price: 520,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23000000" font-size="18" font-weight="bold">МАСТЕР И</text><text x="100" y="175" text-anchor="middle" fill="%23000000" font-size="18" font-weight="bold">МАРГАРИТА</text><text x="100" y="210" text-anchor="middle" fill="%23CC0000" font-size="12">Булгаков</text></svg>',
    description: 'Волшебный роман о любви, творчестве и борьбе добра и зла в советской действительности',
    fullDescription: 'Шедевр советской литературы. Роман переплетает три истории: визит дьявола в Москву, историю художника и его возлюбленной, и библейскую историю Иисуса и Понтия Пилата.',
    year: 1966,
    pages: 560,
    rating: 4.8
  },
  {
    id: 6,
    title: '1984',
    author: 'Джордж Оруэлл',
    price: 450,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23CC0000" font-size="28" font-weight="bold">1984</text><text x="100" y="210" text-anchor="middle" fill="%23000000" font-size="14">Оруэлл</text></svg>',
    description: 'Антиутопический роман о тоталитарном государстве и борьбе за свободу',
    fullDescription: 'Классическая антиутопия о государстве, где каждый находится под постоянным надзором. Главный герой Уинстон Смит борется за свободу мысли и личности.',
    year: 1949,
    pages: 328,
    rating: 4.7
  },
  {
    id: 7,
    title: 'Три мушкетера',
    author: 'Александр Дюма',
    price: 480,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23CC0000" font-size="18" font-weight="bold">ТРИ</text><text x="100" y="175" text-anchor="middle" fill="%23CC0000" font-size="18" font-weight="bold">МУШКЕТЕРА</text><text x="100" y="210" text-anchor="middle" fill="%23000000" font-size="12">Дюма</text></svg>',
    description: 'Приключенческий роман о дружбе четырех мушкетеров во времена расцвета Франции',
    fullDescription: 'Один из самых известных романов о приключениях. Четыре верных друга сражаются за честь, дружбу и справедливость в XVII веке. История полна опасностей, интриг и героических поступков.',
    year: 1844,
    pages: 704,
    rating: 4.8
  },
  {
    id: 8,
    title: 'Война и мир',
    author: 'Лев Николаевич Толстой',
    price: 680,
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280"><rect fill="%23F4D03F" width="200" height="280"/><rect fill="%23000000" width="200" height="20"/><text x="100" y="150" text-anchor="middle" fill="%23000000" font-size="20" font-weight="bold">ВОЙНА</text><text x="100" y="175" text-anchor="middle" fill="%23000000" font-size="20" font-weight="bold">И МИР</text><text x="100" y="210" text-anchor="middle" fill="%23CC0000" font-size="12">Толстой</text></svg>',
    description: 'Эпический роман о жизни русского общества во времена наполеоновских войн',
    fullDescription: 'Величайший роман в истории литературы. Произведение охватывает события русской истории с 1805 по 1820 год и исследует вечные вопросы жизни, смерти, любви и смысла человеческого существования.',
    year: 1869,
    pages: 1216,
    rating: 4.9
  }
]