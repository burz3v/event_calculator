
import React, { useState } from "react";

const services = [
  { id: "table", name: "Сервировка стола", price: 1000 },
  { id: "catering", name: "Кейтеринг", price: 150, perPerson: true },
  { id: "decor", name: "Декор", price: 1000 },
  { id: "balloons", name: "Воздушные шары", price: 1000 },
  { id: "photo", name: "Фотозона", price: 1000 },
  { id: "animators", name: "Аниматоры", price: 1000 },
  { id: "flowers", name: "Цветы", price: 1000 }
];

function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    eventType: "",
    category: "",
    guests: 0,
    children: 0,
    services: [],
    comment: "",
    name: "",
    phone: "",
    email: ""
  });

  const handleServiceToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id]
    }));
  };

  const calculatePrice = () => {
    let total = 0;
    form.services.forEach((id) => {
      const s = services.find((x) => x.id === id);
      if (s) {
        const guests = s.perPerson ? +form.guests + +form.children : 1;
        total += s.price * guests;
      }
    });
    return total;
  };

  const handleSend = () => {
    alert("Форма отправлена! Мы свяжемся с вами как можно скорее.");
    setStep(1);
    setForm({
      eventType: "", category: "", guests: 0, children: 0,
      services: [], comment: "", name: "", phone: "", email: ""
    });
  };

  return (
    <div className="container">
      {step === 1 && (
        <>
          <h1>Калькулятор мероприятий</h1>
          <label>Тип события:</label>
          <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
            <option value="">Выберите</option>
            <option value="family">Семейное</option>
            <option value="b2b">B2B (скоро)</option>
          </select>
          {form.eventType === "family" && (
            <>
              <label>Категория:</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Выберите</option>
                <option value="children_party">Детский праздник</option>
                <option value="adult_party">Вечеринка</option>
                <option value="picnic">Пикник</option>
                <option value="wedding">Свадьба</option>
                <option value="proposal">Предложение</option>
              </select>
            </>
          )}
          <button onClick={() => setStep(2)} disabled={!form.eventType || (form.eventType === "family" && !form.category)}>Далее</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Информация о гостях</h2>
          <label>Взрослых:</label>
          <input type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          <label>Детей:</label>
          <input type="number" value={form.children} onChange={(e) => setForm({ ...form, children: e.target.value })} />
          <h2>Услуги</h2>
          {services.map((s) => (
            <label key={s.id}>
              <input
                type="checkbox"
                checked={form.services.includes(s.id)}
                onChange={() => handleServiceToggle(s.id)}
              />
              {s.name} ({s.perPerson ? `${s.price} ₪ / человек` : `${s.price} ₪`})
            </label>
          ))}
          <label>Доп. пожелания:</label>
          <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
          <button onClick={() => setStep(1)}>Назад</button>{" "}
          <button onClick={() => setStep(3)} disabled={form.services.length === 0}>Далее</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Результат</h2>
          <p>Примерная стоимость: <strong>{calculatePrice()} ₪</strong></p>
          <p>Это ориентировочная цена. Мы свяжемся с вами для уточнения.</p>
          <label>Имя:</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <label>Телефон:</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <label>Email:</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <button onClick={() => setStep(2)}>Назад</button>{" "}
          <button onClick={handleSend} disabled={!form.name || !form.phone || !form.email}>Отправить</button>
        </>
      )}
    </div>
  );
}

export default App;
