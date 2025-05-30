# khder99-performance-data

## 🚀 نظرة عامة

حزمة React + Redux تساعد على تتبع أداء واجهات الاستخدام من خلال:

* قياس زمن استجابة APIs.
* تتبع نقرات المستخدم.
* قياس أداء تحميل المكونات باستخدام React Profiler.
* عرض النتائج من خلال رسوم بيانية جاهزة.

---

## 📦 التثبيت

```bash
npm install khder99-performance-data
```

أو:

```bash
yarn add khder99-performance-data
```

---

## 🔧 الاستخدام

### 📥 الاستيرادات:

```js
import {
  fetchTimes,
  PerformanceChartData,
  eventLogChartData,
  performanceAnalysisChartData,
  useTrackClickEvent,
  fetchPerfomanceAnalysis,
  InterFace,
  apiResponseTimeSlice,
  eventLogSlice,
  performanceAnalysisSlice,
} from 'khder99-performance-data';
```

---

## 🧪 قياس زمن استجابة API

استخدم التعليمة التالية:

```js
dispatch(fetchTimes("API URL", "API Name", "Database URL"));
```

يمكن استخدامها في أي مكان بعد الاستيراد، لقياس زمن استجابة أي API.


---

### 🔹 مثال عملي

```jsx
const dispatch = useDispatch();

dispatch(
  fetchTimes(
    'https://example.com/api/data',         // رابط الـ API
    'GetDataAPI',                           // اسم الـ API
    'https://your-project.firebaseio.com/apiResponse.json'  // رابط قاعدة البيانات
  )
);
```
يمكنك استخدام هذا الاستدعاء بعد استيراده في أي مكان داخل التطبيق لقياس أداء الواجهات البرمجية الخاصة بك.
---

## 🖱️ تتبع نقرات المستخدم

```js
useTrackClickEvent(
  buttonRef.current,
  buttonRef.current && buttonRef.current.innerText,
  onClickHandler,
  "Database URL"
);
```

### كيفية فهرسة الزر:

استخدم `useRef` لربط الزر:

```js
const buttonRef = useRef(null);
...
<button ref={buttonRef} onClick={handleClick}>أرسل</button>
```

---

## ⚡ تتبع أداء تحميل المكونات

```jsx
<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

```js
const onRenderCallback = (id, phase, actualDuration) => {
  isLoading
    ? dispatch(
        fetchPerfomanceAnalysis(
          "Database URL",
          id,
          phase,
          actualDuration
        )
      )
    : null;
};
```

---

## 🧮 InterFace Component

نوفر مكون `<InterFace />` الذي يحتوي على واجهة مستخدم بسيطة تتيح لك إدخال APIs وتخزينها لقياس الأداء.

```jsx
<InterFace />
```

---

## 📊 الرسوم البيانية

### ⏱️ زمن استجابة APIs:

```jsx
<PerformanceChartData />
```

### 🖱️ تفاعل المستخدم:

```jsx
<eventLogChartData />
```

### 📉 تحليل الأداء:

```jsx
<performanceAnalysisChartData />
```

---

## 📦 التكامل مع Redux

### الشرائح المتوفرة:

* `apiResponseTimeSlice`
* `eventLogSlice`
* `performanceAnalysisSlice`

### إعداد المتجر:

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  apiResponseTimeSlice,
  eventLogSlice,
  performanceAnalysisSlice,
} from "khder99-performance-data";

const store = configureStore({
  reducer: {
    apiResponseTime: apiResponseTimeSlice.reducer,
    eventLog: eventLogSlice.reducer,
    performanceAnalysis: performanceAnalysisSlice.reducer,
  },
});

export default store;
```

ثم اربطه بالتطبيق:

```jsx
import { Provider } from "react-redux";
import store from "./store";

<Provider store={store}>
  <App />
</Provider>
```

---


## 📎 ملاحظات مهمة

* تأكد من إعداد قاعدة بيانات Firebase أو أي خدمة مشابهة لاستقبال البيانات.
* استخدم الرسوم البيانية فقط بعد التأكد من وجود بيانات.
* يمكن تخصيص `InterFace` أو استخدام الكود بشكل يدوي حسب احتياجك.

---

## 💡 المساهمة

مرحبًا بأي مساهمة لتحسين الحزمة! افتح issue أو أرسل Pull Request عبر GitHub.
https://github.com/khderalromi/performance-data.git
---

## 📝 الترخيص

MIT License © 2025



/*********************/
