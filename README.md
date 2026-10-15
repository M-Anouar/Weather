# 🌤️ Weather — تطبيق الطقس

تطبيق ويب بسيط يعرض الطقس الحالي وتوقعات الساعات القادمة لأي مدينة، باستخدام واجهة [OpenWeatherMap](https://openweathermap.org/api). المدينة الافتراضية هي **الحسيمة (Al Hoceima)**.

## المزايا
- البحث عن أي مدينة بالاسم (Enter أو زر البحث)
- درجة الحرارة الحالية ونسبة الرطوبة
- توقعات الساعات القادمة مع احتمال المطر
- أيقونات حسب حالة الطقس (نهار/ليل بحسب توقيت المدينة)
- واجهة عربية (RTL) ورسائل خطأ واضحة

## التقنيات
HTML • CSS • JavaScript (Fetch API) • OpenWeatherMap API

## التشغيل محليًا
1. حمّل المشروع:
   ```bash
   git clone https://github.com/M-Anouar/Weather.git
   cd Weather
   ```
2. أنشئ حسابًا في OpenWeatherMap واحصل على مفتاح API مجاني.
3. انسخ `config.example.js` إلى `config.js` وضع مفتاحك:
   ```js
   window.WEATHER_API_KEY = "مفتاحك";
   ```
4. افتح `index.html` في المتصفح.

> ⚠️ ملف `config.js` مُدرج في `.gitignore` ولا يُرفع إلى GitHub. لا تضع مفتاحك داخل `script.js` أبدًا.

## بنية المشروع
```
Weather/
├── index.html
├── style.css
├── script.js
├── config.example.js
└── README.md
```

## لقطة شاشة
<!-- أضف صورة: ![Weather](screenshot.png) -->

## المؤلف
**Anouar** — طالب تطوير رقمي (OFPPT) — [GitHub](https://github.com/M-Anouar)
