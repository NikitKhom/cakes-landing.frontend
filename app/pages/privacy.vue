<template>
  <main class="privacy-page">
    <div class="privacy-page__inner">
      <a class="privacy-page__back" href="/"><img src="/icons/arrow-right.svg" alt=""> На главную</a>
      <p class="eyebrow">Документы</p>
      <h1>Политика обработки персональных данных</h1>
      <p class="privacy-page__updated">Дата публикации: 22 октября 2026 года</p>

      <section>
        <h2>1. Общие положения</h2>
        <p>Эта страница описывает обработку данных на сайте «Тортики от Анастасии». Сайт носит информационный характер: здесь нет форм заявок, регистрации, личного кабинета и онлайн-оплаты.</p>
      </section>

      <section>
        <h2>2. Какие данные обрабатывает сайт</h2>
        <p>Сайт не запрашивает и не сохраняет имя, телефон, адрес электронной почты или иные данные посетителей. Собственные cookie-файлы, рекламные пиксели и системы аналитики на сайте не используются.</p>
        <p>Технические данные, которые может фиксировать хостинг для работы и защиты сервера, обрабатываются по правилам соответствующего провайдера.</p>
      </section>

      <section>
        <h2>3. Переход к сторонним сервисам</h2>
        <p>При нажатии на телефон, Telegram или Instagram посетитель самостоятельно переходит к оператору связи или в сторонний сервис. Дальнейшая обработка данных регулируется правилами и политиками этих сервисов, а не этим сайтом.</p>
      </section>

      <section>
        <h2>4. Контакты</h2>
        <p>По вопросам, связанным с размещённой информацией и обработкой данных, можно связаться с Анастасией по телефону или через Telegram, указанным на главной странице.</p>
      </section>

      <a class="button privacy-page__button" href="/">Вернуться на сайт</a>
    </div>
  </main>
</template>

<style scoped lang="scss">
.privacy-page {
  min-height: 100vh;
  padding: 2rem 1.25rem 4rem;
  color: #563d45;
  background: #fdf3f2;
}

.privacy-page__inner {
  width: min(100%, 52rem);
  margin: 0 auto;
}

.privacy-page__back {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  margin-bottom: 3rem;
  color: #a75269;
  font-size: .8125rem;
  text-decoration: none;
}

.privacy-page__back img {
  width: .9rem;
  height: .9rem;
  transform: rotate(180deg);
}

.privacy-page h1 {
  max-width: 42rem;
  margin-bottom: .75rem;
  font-size: clamp(2.5rem, 8vw, 5rem);
}

.privacy-page h2 {
  margin-bottom: .75rem;
  font-size: clamp(1.35rem, 3vw, 1.8rem);
}

.privacy-page section {
  padding: 1.5rem 0;
  border-top: .0625rem solid #ecd8dc;
}

.privacy-page p {
  max-width: 42rem;
  color: #76545e;
  font-size: .9375rem;
  line-height: 1.65;
}

.privacy-page__updated {
  margin-bottom: 2.5rem;
  color: #a36977 !important;
  font-size: .75rem !important;
}

.privacy-page__button {
  margin-top: 1.25rem;
}

@media (min-width: 43.75rem) {
  .privacy-page { padding: 3rem 2rem 5rem; }
}
</style>
