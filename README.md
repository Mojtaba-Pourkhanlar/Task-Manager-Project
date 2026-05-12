## Getting Started

- Install package

```bash
npm i Or npm i --registry="https://mirror-npm.runflare.com"
```

- view project

```bash
npm run dev
```

- Build project

```bash
npm run build
```

- Build Start

```bash
npm start
```

<!--

# قابلیت هایی که در آینده پیاده سازی میشه

## Reminders / Notifications

مثلا:

- یادم بنداز ساعت ۹ این تسک رو انجام بدم
- برای تسک‌های “خیلی مهم” خودکار ریمایندر اضافه کن

این خیلی تجربه کاربری رو بالا میبره.

کسی که تسک تعریف می‌کنه ولی یادش میره

---

## Focus Mode (Pomodoro)

کاربر یه تسک انتخاب کنه → وارد مود تمرکز بشه → تایمر مشخص → موسیقی یا افکت کوچک.

---

## انتقال تشک ها بین هم


RewriteEngine On

# Allow Next.js static files
RewriteCond %{REQUEST_URI} ^/_next/ [OR]
RewriteCond %{REQUEST_URI} ^/favicon.ico$
RewriteCond %{REQUEST_URI} ^/robots.txt$
RewriteRule ^ - [L]

# Allow existing files & folders
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Everything else → Next.js Node server
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]


RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

-->
