import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Услуги ---
const familyServices = [
  {
    id: "table",
    name: "Сервировка стола",
    priceMin: 800,
    priceMax: 1200,
    perPerson: false,
    description: "Стильная сервировка для любого праздника. Мы оформим ваш стол в едином стиле с учетом ваших пожеланий.",
    gallery: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    ]
  },
  {
    id: "catering",
    name: "Кейтеринг",
    priceMin: 120,
    priceMax: 180,
    perPerson: true,
    description: "Профессиональное меню для взрослых и детей. Возможен подбор вегетарианских и детских блюд.",
    gallery: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    ]
  },
  {
    id: "decor",
    name: "Декор",
    priceMin: 800,
    priceMax: 1600,
    perPerson: false,
    description: "Оформление пространства шарами, цветами и тематическими элементами.",
    gallery: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b"
    ]
  },
  {
    id: "balloons",
    name: "Воздушные шары",
    priceMin: 600,
    priceMax: 1000,
    perPerson: false,
    description: "Яркие воздушные шары для детских праздников и вечеринок.",
    gallery: [
      "https://images.unsplash.com/photo-1509228468518-c5eeecbff44a"
    ]
  },
  {
    id: "photo",
    name: "Фотозона",
    priceMin: 1000,
    priceMax: 2000,
    perPerson: false,
    description: "Уникальная фотозона для ваших гостей. Индивидуальный дизайн под тематику мероприятия.",
    gallery: [
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c"
    ]
  },
  {
    id: "animators",
    name: "Аниматоры",
    priceMin: 1000,
    priceMax: 1800,
    perPerson: false,
    description: "Профессиональные ведущие и аниматоры для детских и взрослых мероприятий.",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    ]
  },
  {
    id: "flowers",
    name: "Цветы",
    priceMin: 900,
    priceMax: 1800,
    perPerson: false,
    description: "Оформление живыми цветами любого формата и стиля.",
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
    ]
  }
];

const b2bServices = [
  {
    id: "rent_hall",
    name: "Аренда конференц-зала",
    priceMin: 4000,
    priceMax: 9000,
    perPerson: false,
    description: "Современный конференц-зал для мероприятий любого уровня. Техническое оснащение, кофе-брейки и удобное расположение.",
    gallery: [
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1"
    ]
  },
  {
    id: "coffee_break",
    name: "Кофе-брейк",
    priceMin: 300,
    priceMax: 500,
    perPerson: true,
    description: "Разнообразные меню для кофе-брейков, включая сладости, закуски и напитки.",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    ]
  },
  {
    id: "tech",
    name: "Техническое обеспечение (звук/экран)",
    priceMin: 2500,
    priceMax: 4500,
    perPerson: false,
    description: "Все необходимое оборудование для презентаций: экраны, проекторы, аудиосистема.",
    gallery: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
    ]
  },
  {
    id: "branding",
    name: "Брендирование площадки",
    priceMin: 1500,
    priceMax: 4000,
    perPerson: false,
    description: "Индивидуальное оформление локации под вашу компанию.",
    gallery: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b"
    ]
  },
  {
    id: "hostess",
    name: "Услуги хостес",
    priceMin: 1000,
    priceMax: 2500,
    perPerson: false,
    description: "Встреча гостей, навигация, помощь в организации.",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    ]
  }
];

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
};

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    eventType: "",
    category: "",
    guests: 0,
    children: 0,
    separateMenu: false,
    services: [],
    comment: "",
    name: "",
    phone: "",
    email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [modalService, setModalService] = useState(null);
  const [galleryModal, setGalleryModal] = useState(null);

  const currentServices = form.eventType === "b2b" ? b2bServices : familyServices;

  const calculatePrice = (type) => {
    let total = 0;
    form.services.forEach((id) => {
      const s = currentServices.find((x) => x.id === id);
      if (s) {
        const guests = s.perPerson ? (+form.guests) : 1;
        total += (type === "min" ? s.priceMin : s.priceMax) * guests;
      }
    });
    return total;
  };

  const handleServiceToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id]
    }));
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (form.eventType === "") return false;
        if (form.eventType === "family" && !form.category) return false;
        return true;
      case 2:
        return form.guests > 0 && form.services.length > 0;
      case 3:
        return form.name && form.phone && form.email;
      default:
        return true;
    }
  };

  const handleSend = async () => {
    setSending(true);
    setError("");
    try {
      // Здесь должен быть твой emailjs или другой обработчик отправки!
      await new Promise(res => setTimeout(res, 1000));
      setSubmitted(true);
    } catch (err) {
      setError("Произошла ошибка при отправке. Попробуйте позже.");
    }
    setSending(false);
  };

  const resetForm = () => {
    setStep(1);
    setForm({
      eventType: "",
      category: "",
      guests: 0,
      children: 0,
      separateMenu: false,
      services: [],
      comment: "",
      name: "",
      phone: "",
      email: ""
    });
    setSubmitted(false);
    setError("");
  };

  // --- Модалка для описания услуги ---
  const ServiceModal = ({ service, onClose }) => (
    <div className="modal-bg" onClick={onClose}>
      <motion.div
        className="modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.23 }}
      >
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="modal-gallery">
          {service.gallery.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={service.name}
              onClick={() => setGalleryModal(url)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>Закрыть</button>
      </motion.div>
    </div>
  );

  // --- Модалка для галереи фото ---
  const GalleryModal = ({ image, onClose }) => (
    <div className="modal-bg" onClick={onClose}>
      <motion.div
        className="gallery-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={image}
          alt="Фото услуги"
          className="gallery-img"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <button className="modal-close gallery-close" onClick={onClose}>Закрыть</button>
      </motion.div>
    </div>
  );

  // --- Верстка ---
  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="submitted"
            {...pageVariants}
            transition={{ duration: 0.4 }}
          >
            <h2>Спасибо за ваш запрос!</h2>
            <p>Мы получили информацию о вашем мероприятии. Наш менеджер свяжется с вами в ближайшее время.</p>
            <button onClick={resetForm}>Начать новый расчет</button>
            <div className="contact-block">
              <div className="contact-label">Или свяжитесь с нами:</div>
              <div className="contact-phone">Телефон: <a href="tel:+9721234567">+9721234567</a></div>
              <div className="contact-actions">
                <a
                  className="contact-btn whatsapp"
                  href="https://wa.me/9721234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  className="contact-btn instagram"
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            {...pageVariants}
            transition={{ duration: 0.4 }}
          >
            {step === 1 && (
              <>
                <h1>Калькулятор мероприятий</h1>
                <label>Тип события:</label>
                <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value, category: "", services: [] })}>
                  <option value="">Выберите</option>
                  <option value="family">Семейное</option>
                  <option value="b2b">B2B (корпоратив/деловое)</option>
                </select>
                {form.eventType === "family" && (
                  <>
                    <label>Категория:</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, services: [] })}>
                      <option value="">Выберите</option>
                      <option value="children_party">Детский праздник</option>
                      <option value="adult_party">Вечеринка</option>
                      <option value="picnic">Пикник</option>
                      <option value="wedding">Свадьба</option>
                      <option value="proposal">Предложение</option>
                    </select>
                  </>
                )}
                <button
                  onClick={() => setStep(2)}
                  disabled={!validateStep(1)}
                >
                  Далее
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Информация о гостях</h2>
                <div className="guest-info">
                  <div>
                    <label>Гостей:</label>
                    <input
                      type="number"
                      min="0"
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: e.target.value })}
                    />
                  </div>
                  {form.eventType === "family" && (
                    <div>
                      <label>Детей:</label>
                      <input
                        type="number"
                        min="0"
                        value={form.children}
                        onChange={e => setForm({ ...form, children: e.target.value })}
                      />
                    </div>
                  )}
                </div>
                {form.eventType === "family" && (
                  <div className="separate-menu-row">
                    <input
                      type="checkbox"
                      id="separateMenu"
                      checked={form.separateMenu}
                      onChange={e => setForm({ ...form, separateMenu: e.target.checked })}
                    />
                    <label htmlFor="separateMenu">Отдельное меню для детей</label>
                  </div>
                )}

                <h2>Услуги</h2>
                <div className="services">
                  {currentServices.map(s => (
                    <div key={s.id} className="service-item">
                      <input
                        type="checkbox"
                        id={s.id}
                        checked={form.services.includes(s.id)}
                        onChange={() => handleServiceToggle(s.id)}
                      />
                      <span className="service-name">{s.name}</span>
                      <span className="service-price">
                        {s.perPerson
                          ? `${s.priceMin}–${s.priceMax} ₪ / человек`
                          : `${s.priceMin}–${s.priceMax} ₪`}
                      </span>
                      <button
                        type="button"
                        className="service-more"
                        onClick={(e) => { e.stopPropagation(); setModalService(s); }}
                        tabIndex={-1}
                        aria-label="Подробнее"
                        title="Подробнее об услуге"
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="9" stroke="#9D80BA" strokeWidth="2" fill="#fff"/>
                          <text x="10" y="15" textAnchor="middle" fill="#9D80BA" fontSize="14" fontWeight="bold">i</text>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="comment">
                  <label>Дополнительные пожелания:</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    placeholder="Укажите ваши особые пожелания..."
                  />
                </div>
                <div className="buttons">
                  <button onClick={() => setStep(1)}>Назад</button>
                  <button onClick={() => setStep(3)} disabled={!validateStep(2)}>Далее</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2>Результат</h2>
                <div className="price-block">
                  <p className="price">
                    Примерная стоимость:
                    <strong>
                      {" "}
                      {calculatePrice("min")}–{calculatePrice("max")} ₪
                    </strong>
                  </p>
                  <p className="price-notice">
                    Это ориентировочная цена. Итоговая стоимость может измениться в зависимости от конкретных требований. Мы свяжемся с вами для уточнения деталей.
                  </p>
                </div>

                <h3>Контактная информация</h3>
                <div className="contact-form">
                  <div>
                    <label>Имя:</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <label>Телефон:</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="Введите ваш номер телефона"
                      required
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="buttons">
                  <button onClick={() => setStep(2)}>Назад</button>
                  <button
                    onClick={handleSend}
                    disabled={!validateStep(3) || sending}
                    className="submit-button"
                  >
                    {sending ? "Отправка..." : "Отправить запрос"}
                  </button>
                </div>
                <div className="contact-block">
                  <div className="contact-label">Или свяжитесь с нами:</div>
                  <div className="contact-phone">Телефон: <a href="tel:+9721234567">+9721234567</a></div>
                  <div className="contact-actions">
                    <a
                      className="contact-btn whatsapp"
                      href="https://wa.me/9721234567"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                    <a
                      className="contact-btn instagram"
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {modalService && (
          <ServiceModal
            key={modalService.id}
            service={modalService}
            onClose={() => setModalService(null)}
          />
        )}
        {galleryModal && (
          <GalleryModal
            image={galleryModal}
            onClose={() => setGalleryModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
