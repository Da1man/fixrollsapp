let initialState = {
  products: [
    {
      id: 1,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
      name: 'Сет Love',
      price: 666,
      discountPrice: 555,
    },
    {
      id: 2,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/06/Apelsin-Roll-1.jpg',
      name: 'Апельсин ролл',
      price: 100,
      discountPrice: null,
    },
    {
      id: 3,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/CHiken-Lava.jpg',
      name: 'Чикен лава ролл',
      price: 100,
      discountPrice: null,
    },
    {
      id: 4,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-MIX.jpg',
      name: 'Филадельфия микс',
      price: 100,
      discountPrice: null,
    },
    {
      id: 5,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-LITE.jpg',
      name: 'Филадельфия Лайт',
      price: 100,
      discountPrice: null,
    },
    {
      id: 6,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Taj-Hot.jpg',
      name: 'Тай хот',
      price: 100,
      discountPrice: null,
    },
    {
      id: 7,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
      name: 'Сет Love',
      price: 444,
      discountPrice: 333,
    },
  ],
  isFetching: false,
};

export const catalogReducer = (state = initialState, action) => {
  return state;
};
