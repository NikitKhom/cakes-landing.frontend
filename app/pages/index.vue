<script setup lang="ts">
import { Pagination, Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

const swiperModules = [Pagination, Navigation, A11y]
const fillingType = ref<'bento' | 'cake'>('bento')
const priceType = ref<'bento' | 'cake' | 'dessert'>('bento')
const selectedImage = ref<string | null>(null)
const menuOpen = ref(false)
const isHeaderScrolled = ref(false)
const isOverlayOpen = computed(() => menuOpen.value || Boolean(selectedImage.value))

const fillings = {
  bento: [
    { name: 'Клубника-ваниль', note: 'Ванильные коржи, крем-чиз и сочная клубника', tone: 'berry', image: '/images/fillings/strawberry-vanilla.png' },
    { name: 'Сникерс', note: 'Шоколадные коржи, солёная карамель и арахис', tone: 'caramel', image: '/images/fillings/snickers.png' },
    { name: 'Вишня-шоколад', note: 'Шоколадный бисквит, крем и вишнёвое конфи', tone: 'cherry', image: '/images/fillings/cherry-chocolate.png' }
  ],
  cake: [
    { name: 'Клубника-ваниль', note: 'Ванильные коржи, крем-чиз и свежая клубника', tone: 'berry', image: '/images/fillings/strawberry-vanilla.png' },
    { name: 'Сникерс', note: 'Шоколадные коржи, солёная карамель, арахис и ганаш', tone: 'caramel', image: '/images/fillings/snickers.png' },
    { name: 'Вишня-шоколад', note: 'Шоколадный бисквит, нежный крем и вишнёвое конфи', tone: 'cherry', image: '/images/fillings/cherry-chocolate.png' },
    { name: 'Фисташка-малина', note: 'Фисташковые коржи, малиновое конфи и крем-чиз', tone: 'pistachio', image: '/images/fillings/pistachio-raspberry.png' },
    { name: 'Красный бархат', note: 'Бархатные коржи с крем-чизом и малиновыми акцентами', tone: 'velvet', image: '/images/fillings/red-velvet.png' },
    { name: 'Молочная девочка', note: 'Тонкие сливочные коржи, ванильный крем и ягоды', tone: 'milk', image: '/images/fillings/milk-girl.png' },
    { name: 'Баунти', note: 'Шоколадные коржи, кокосовый крем и шоколадный ганаш', tone: 'coconut', image: '/images/fillings/bounty.png' },
  ]
}
const prices = {
  bento: [['Мини · 500 г', '1 400 ₽'], ['Макси · 1 кг', '2 300 ₽']],
  cake: [['Торт · от 2 кг', '2 100 ₽ / 1 кг'], ['Декор и фигурки', 'рассчитаем']],
  dessert: [['Картошка «Сердце»', '160 ₽ / 1 шт.'], ['Картошка «Эскимо»', '190 ₽ / 1 шт.'], ['Минимальный заказ', 'от 4 шт.']]
}
const works = [
  { image: '/images/work-1.jpg', title: 'Маме с любовью', caption: 'бенто · минимализм' },
  { image: '/images/work-2.jpg', title: 'Birthday cake', caption: 'торт · винтаж' },
  { image: '/images/work-4.jpg', title: 'Цветочный день', caption: 'торт · нежность' }
]
const reviews = [
  { image: '/images/review-1.jpg', text: 'Получилось даже лучше, чем я представляла. Очень красиво и вкусно!', author: 'Анастасия · день рождения' },
  { image: '/images/review-2.jpg', text: 'Праздник удался — торт был главным героем вечера.', author: 'Лера · маленький повод' }
]
const navigation = [['#fillings', 'Начинки'], ['#price', 'Прайс'], ['#works', 'Работы'], ['#delivery', 'Доставка'], ['#reviews', 'Отзывы'], ['#contacts', 'Контакты']]
const closeMenu = () => { menuOpen.value = false }
const updateHeaderState = () => { isHeaderScrolled.value = window.scrollY > 8 }

let revealObserver: IntersectionObserver | undefined
const setupScrollReveals = () => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (!targets.length) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-revealed'))
    return
  }

  document.documentElement.classList.add('has-scroll-reveal')
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const target = entry.target as HTMLElement
      target.classList.add('is-revealed')
      revealObserver?.unobserve(target)
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })

  targets.forEach((target) => revealObserver?.observe(target))
}

onMounted(() => {
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
  setupScrollReveals()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState)
  revealObserver?.disconnect()
  document.documentElement.classList.remove('has-scroll-reveal')
})

watch(isOverlayOpen, (isOpen) => {
  document.body.classList.toggle('is-overlay-open', isOpen)
})

onBeforeUnmount(() => document.body.classList.remove('is-overlay-open'))
</script>

<template>
  <main class="landing">
    <Transition name="fade">
      <div v-if="menuOpen" class="menu-backdrop" @click="closeMenu" />
    </Transition>

    <Transition name="drawer">
      <aside v-if="menuOpen" class="drawer" aria-label="Навигация">
        <button class="drawer__close" type="button" aria-label="Закрыть меню" @click="closeMenu">×</button>
        <p class="drawer__eyebrow eyebrow">Навигация</p>
        <nav class="drawer__nav">
          <a
            v-for="([href, label], index) in navigation"
            :key="href"
            class="drawer__link"
            :style="{ '--item-delay': `${index * 70}ms` }"
            :href="href"
            @click="closeMenu"
          >
            {{ label }}
            <span class="drawer__arrow"><img src="/icons/arrow-right.svg" alt=""></span>
          </a>
        </nav>
        <a class="drawer__cta button" href="#contacts" @click="closeMenu">Заказать торт</a>
      </aside>
    </Transition>

    <header class="site-header nav" :class="{ 'is-scrolled': isHeaderScrolled }">
      <div class="site-header__inner container">
        <a href="#top" class="site-header__brand brand">Тортики <span>от Анастасии</span></a>
        <nav class="site-header__nav" aria-label="Основная навигация">
          <a v-for="[href, label] in navigation" :key="href" class="site-header__link" :href="href">{{ label }}</a>
        </nav>
        <a class="site-header__cta" href="#contacts">Заказать</a>
        <button class="site-header__menu menu" type="button" :aria-expanded="menuOpen" aria-label="Открыть меню" @click="menuOpen = true">☰</button>
      </div>
    </header>

    <section id="top" class="hero section-round section-round--bottom">
      <i class="hero__decor hero__decor--soft" aria-hidden="true" />
      <i class="hero__circle hero__circle--berry" aria-hidden="true" />
      <i class="hero__circle hero__circle--pink" aria-hidden="true" />

      <div class="hero__body container">
        <p class="hero__eyebrow eyebrow">Симферополь · с любовью</p>
        <div class="hero__portrait">
          <img class="hero__image" src="/images/owner-hero-square-v2.png" width="1254" height="1254" alt="Анастасия с праздничным тортом">
          <span class="hero__flames" aria-hidden="true">
            <i class="hero__flame hero__flame--one" />
            <i class="hero__flame hero__flame--two" />
            <i class="hero__flame hero__flame--three" />
          </span>
        </div>
        <div class="hero__copy">
          <h1 class="hero__title">Вкусные<br>торты</h1>
          <p class="hero__lead">Из муки, сахара и нежности</p>
          <div class="hero__actions">
            <a href="#fillings" class="button">Выбрать торт <img src="/icons/arrow-right.svg" alt=""></a>
            <a class="social-button" href="https://t.me/anastasia_nik5" target="_blank" rel="noopener noreferrer" aria-label="Telegram Анастасии"><Icon name="mdi:telegram" aria-hidden="true" /></a>
            <a class="social-button" href="https://instagram.com/anastasiia.cake.simf" target="_blank" rel="noopener noreferrer" aria-label="Instagram Анастасии*"><Icon name="mdi:instagram" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>

    <section id="fillings" class="fillings section section-round section-round--top">
      <div class="fillings__inner container" data-reveal="rise">
        <header class="fillings__heading section-heading">
          <div class="section-heading__copy">
            <p class="eyebrow">Начинки</p>
            <h2>Вкус, который<br>запомнится</h2>
          </div>
          <div class="tabs tabs--two" role="tablist" aria-label="Тип торта">
            <i class="tabs__thumb" :class="`tabs__thumb--${fillingType}`" />
            <button :class="{ active: fillingType === 'bento' }" type="button" role="tab" :aria-selected="fillingType === 'bento'" @click="fillingType = 'bento'">Бенто</button>
            <button :class="{ active: fillingType === 'cake' }" type="button" role="tab" :aria-selected="fillingType === 'cake'" @click="fillingType = 'cake'">Обычные торты</button>
          </div>
        </header>
        <div class="fillings__slider-shell slider-shell">
          <Transition name="tab-content" mode="out-in">
            <Swiper :key="fillingType" class="fillings__slider swiper-instance" :modules="swiperModules" :slides-per-view="1.12" :space-between="11" :pagination="{ clickable: true }" :navigation="{ prevEl: '.fillings__slider-prev', nextEl: '.fillings__slider-next' }" :breakpoints="{ 768: { slidesPerView: 2 } }">
              <SwiperSlide v-for="filling in fillings[fillingType]" :key="filling.name">
                <article class="filling-card" :class="`filling-card--${filling.tone}`">
                  <div class="filling-card__copy"><h3>{{ filling.name }}</h3><p>{{ filling.note }}</p></div>
                  <img class="filling-card__image" :src="filling.image" :alt="`Кусочек торта «${filling.name}»`">
                </article>
              </SwiperSlide>
            </Swiper>
          </Transition>
          <div class="slider-controls fillings__controls" aria-label="Управление слайдером начинок">
            <button class="slider-controls__button slider-controls__button--prev fillings__slider-prev" type="button" aria-label="Предыдущая начинка"><img src="/icons/arrow-right.svg" alt=""></button>
            <button class="slider-controls__button slider-controls__button--next fillings__slider-next" type="button" aria-label="Следующая начинка"><img src="/icons/arrow-right.svg" alt=""></button>
          </div>
        </div>
      </div>
    </section>

    <section id="price" class="pricing section">
      <div class="pricing__inner container" data-reveal="rise">
        <div class="pricing__mobile">
          <div class="pricing__heading">
            <p class="eyebrow">Прайс</p>
            <h2>Выберите<br>свой повод</h2>
          </div>
          <div class="pricing__tabs tabs tabs--three" role="tablist" aria-label="Категория прайса">
            <i class="tabs__thumb" :class="`tabs__thumb--${priceType}`" />
            <button :class="{ active: priceType === 'bento' }" type="button" @click="priceType = 'bento'">Бенто</button>
            <button :class="{ active: priceType === 'cake' }" type="button" @click="priceType = 'cake'">Торты</button>
            <button :class="{ active: priceType === 'dessert' }" type="button" @click="priceType = 'dessert'">Десерты</button>
          </div>
          <div class="pricing__content">
            <Transition name="tab-content" mode="out-in">
              <div :key="priceType" class="price-card">
                <p v-for="[name, amount] in prices[priceType]" :key="name"><b>{{ name }}</b><strong>{{ amount }}</strong></p>
              </div>
            </Transition>
          </div>
          <a class="price-download button" href="/price-list.pdf" target="_blank" rel="noopener">Скачать прайслист <img src="/icons/arrow-right.svg" alt=""></a>
        </div>
        <div class="pricing__desktop">
          <div class="pricing__desktop-intro">
            <p class="eyebrow">Прайс</p>
            <h2>Выберите<br>свой повод</h2>
            <a class="price-download button" href="/price-list.pdf" target="_blank" rel="noopener">Скачать прайслист <img src="/icons/arrow-right.svg" alt=""></a>
          </div>
          <div class="pricing__desktop-selection">
            <div class="pricing__tabs tabs tabs--three" role="tablist" aria-label="Категория прайса">
              <i class="tabs__thumb" :class="`tabs__thumb--${priceType}`" />
              <button :class="{ active: priceType === 'bento' }" type="button" @click="priceType = 'bento'">Бенто</button>
              <button :class="{ active: priceType === 'cake' }" type="button" @click="priceType = 'cake'">Торты</button>
              <button :class="{ active: priceType === 'dessert' }" type="button" @click="priceType = 'dessert'">Десерты</button>
            </div>
            <div class="pricing__content">
              <Transition name="tab-content" mode="out-in">
                <div :key="priceType" class="price-card">
                  <p v-for="[name, amount] in prices[priceType]" :key="name"><b>{{ name }}</b><strong>{{ amount }}</strong></p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="works" class="works section">
      <div class="works__inner container" data-reveal="rise">
        <header class="works__heading section-heading">
          <div class="section-heading__copy"><p class="eyebrow">Примеры работ</p><h2>Каждый торт —<br>маленькая история</h2></div>
          <p class="section-heading__note">Авторский декор для маленьких и больших праздников</p>
        </header>
        <div class="works__slider-shell slider-shell">
          <Swiper class="works__slider swiper-instance" :modules="swiperModules" :slides-per-view="1.1" :space-between="11" :pagination="{ clickable: true }" :navigation="{ prevEl: '.works__slider-prev', nextEl: '.works__slider-next' }" :breakpoints="{ 768: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3 } }">
            <SwiperSlide v-for="work in works" :key="work.title">
              <button class="work-card" type="button" @click="selectedImage = work.image">
                <img class="work-card__image" :src="work.image" :alt="work.title">
                <span class="work-card__caption"><b>{{ work.title }}</b><small>{{ work.caption }}</small></span>
              </button>
            </SwiperSlide>
          </Swiper>
          <div class="slider-controls works__controls" aria-label="Управление слайдером примеров работ">
            <button class="slider-controls__button slider-controls__button--prev works__slider-prev" type="button" aria-label="Предыдущая работа"><img src="/icons/arrow-right.svg" alt=""></button>
            <button class="slider-controls__button slider-controls__button--next works__slider-next" type="button" aria-label="Следующая работа"><img src="/icons/arrow-right.svg" alt=""></button>
          </div>
        </div>
      </div>
    </section>

    <section id="delivery" class="delivery section-round section-round--both">
      <div class="delivery__inner container" data-reveal="delivery">
        <div class="delivery__content">
          <p class="eyebrow">Доставка</p>
          <h2>Привезу прямо<br>к вашему празднику</h2>
          <ul class="delivery__list">
            <li>Самовывоз по адресу<br><strong>ул.&nbsp;Крымской Весны,&nbsp;5к4</strong></li>
            <li>Доставка по мкр. Жигулина Роща — <strong class="delivery__free">бесплатно</strong></li>
            <li>По Симферополю привезу торт <strong class="delivery__paid">за доплату</strong></li>
          </ul>
        </div>
        <div class="car-scene"><img src="/images/delivery-car-cake.png" alt="Автомобиль с праздничным тортом для доставки"></div>
      </div>
    </section>

    <section id="reviews" class="reviews section section-round section-round--top">
      <div class="reviews__inner container" data-reveal="rise">
        <header class="reviews__heading section-heading">
          <div class="section-heading__copy"><p class="eyebrow">Отзывы</p><h2>Слова, от которых<br>тепло внутри</h2></div>
          <p class="section-heading__note">Тёплые сообщения после самых важных событий</p>
        </header>
        <div class="reviews__slider-shell slider-shell">
          <Swiper class="reviews__slider swiper-instance" :modules="swiperModules" :slides-per-view="1.05" :space-between="11" :pagination="{ clickable: true }" :navigation="{ prevEl: '.reviews__slider-prev', nextEl: '.reviews__slider-next' }" :breakpoints="{ 768: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.4 } }">
            <SwiperSlide v-for="review in reviews" :key="review.author">
              <article class="review-card">
                <img class="review-card__image" :src="review.image" alt="Фото торта из отзыва">
                <div class="review-card__copy"><q>{{ review.text }}</q><small>{{ review.author }}</small></div>
              </article>
            </SwiperSlide>
          </Swiper>
          <div class="slider-controls reviews__controls" aria-label="Управление слайдером отзывов">
            <button class="slider-controls__button slider-controls__button--prev reviews__slider-prev" type="button" aria-label="Предыдущий отзыв"><img src="/icons/arrow-right.svg" alt=""></button>
            <button class="slider-controls__button slider-controls__button--next reviews__slider-next" type="button" aria-label="Следующий отзыв"><img src="/icons/arrow-right.svg" alt=""></button>
          </div>
        </div>
      </div>
    </section>

    <section id="contacts" class="contacts section-round section-round--top" data-reveal="contacts">
      <div class="contacts__inner container">
        <div class="contacts__content">
          <p class="eyebrow">Контакты</p>
          <h2>Обсудим ваш торт?</h2>
          <p class="contacts__lead">Напишите — подберём вкус и декор под ваш повод.</p>
          <nav class="contacts__links" aria-label="Контакты Анастасии">
            <a class="contacts__link" href="tel:+79789634255">+7 978 963-42-55</a>
            <a class="contacts__link" href="https://t.me/anastasia_nik5" target="_blank" rel="noopener noreferrer">Telegram @anastasia_nik5</a>
            <a class="contacts__link" href="https://instagram.com/anastasiia.cake.simf" target="_blank" rel="noopener noreferrer">Instagram* @anastasiia.cake.simf</a>
          </nav>
        </div>
        <div class="contacts__art" aria-hidden="true"><img src="/images/contacts-cake-illustration.png" alt=""></div>
      </div>
    </section>

    <footer class="site-footer">
      <span class="site-footer__copyright">© Тортики от Анастасии, 2026</span>
      <span class="site-footer__made-with-love">Сделано с любовью ♡</span>
      <a class="site-footer__policy footer__policy" href="/privacy">Политика обработки данных</a>
      <small class="site-footer__notice footer__notice">* Instagram принадлежит Meta Platforms Inc., признанной экстремистской организацией; её деятельность запрещена на территории РФ.</small>
    </footer>
  </main>

  <Teleport to="body">
    <div v-if="selectedImage" class="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" @click.self="selectedImage = null">
      <button class="lightbox__close" type="button" aria-label="Закрыть" @click="selectedImage = null">×</button>
      <img class="lightbox__image" :src="selectedImage" alt="Работа Анастасии">
    </div>
  </Teleport>
</template>
