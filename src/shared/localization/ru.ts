export default {
  name: 'Русский',
  translation: {
    mainPage: 'На главную',
    graphiql: 'Graphiql',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    variables: 'Переменные',
    headers: 'Заголовки',
    PleaseEnterName: 'Пожалуйста, введите имя',
    FullName: 'Полное Имя',
    EmailAddress: 'E-mail Адрес',
    Password: 'Пароль',
    Register: 'Регистрация',
    AlreadyHaveAnAccount: 'Уже есть аккаунт?',
    Login: 'Залогинься',
    SendPasswordResetEmail: 'Сбросить пароль',
    DontHave: 'Всё ещё нет аккаунта?',
    ForgotPassword: 'Забыли Пароль',
    ItsShort: 'Слишком коротко',
    ItEmpty: 'Не должно быть пустого поля',
    ItEmail: 'Это не e-mail',
    longer: 'Пароль должен быть 8 и более символов',
    NeedCapital: 'Нужен хотя бы 1 заглавный символ',
    NeedSpecial: 'Пароль должен иметь хотя бы 1 специальный символ',
    NotRegister: 'Такого аккаунта не существует',
    inputFields: 'Поля ввода',
    arguments: 'Аргументы',
    type: 'Тип',
    rootTypes: 'Корневые типы',
    fields: 'Поля',
    search: 'Поиск',
    endpoint: 'API адрес',
    docsUnavailible: 'Документация недоступна. Проверьте адрес API: {{- endpoint}}',
    resetLinkSent: 'Ссылка на сброс пароля отправлена!',
    tooltips: {
      logout: 'Выйти',
      language: 'Выбрать язык',
      docsOpen: 'Открыть документацию',
      docsClose: 'Закрыть документацию',
      execute: 'Выполнить запрос',
      hideEditors: 'Скрыть редакторы',
      showEditors: 'Показать редакторы',
      changeEndpoint: 'Сменить API',
      save: 'Сохранить',
      home: 'На первую страницу',
    },
    errors: {
      jsonVariables: 'Ошибка в переменных, неверный JSON: {{- message}}',
      httpStatusCodeError: 'Ошибка загрузки данных (статус код: {{status}})',
      httpInvalidContentType: 'Неверный тип содержимого в ответе сервера',
      'Failed to fetch': 'Не удалось загрузить данные',
      'auth/email-already-in-use':
        'Ошибка авторизации. Такой адрес электронной почты уже используется',
      'auth/wrong-password': 'Не правильный пароль!',
      'auth/user-not-found': 'Пользователь не найден!',
    },
    notFoundTitle: 'Страница не найдена',
    notFoundInfo:
      'Oops! Страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена',
    notFoundBtnText: 'На главную',
  },
};
