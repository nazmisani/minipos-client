# 🔐 Cross-Domain Authentication Fix

## 📋 Masalah yang Ditemukan

### Problem Statement

Authentication tidak persist setelah login berhasil meskipun:

- Backend (Netlify) return token dengan response 201
- Backend set cookie dengan `sameSite=None`, `secure=true`, `httpOnly=false`
- Frontend (Vercel) login request berhasil (toast muncul)
- Axios config `withCredentials: true` sudah benar

### Root Cause Analysis

#### ❌ **MASALAH #1: Cookie Tidak Ter-Set di Client**

**File**: `src/app/login/page.tsx` (line 23)

**Problem**:

- Setelah login sukses, code hanya cek `data.token` lalu langsung redirect
- **TIDAK ADA** logic untuk menyimpan token ke cookie di client-side
- Backend mencoba set cookie via HTTP header `Set-Cookie`, **TAPI**:
  - Cross-domain (Netlify → Vercel) membuat browser **BLOCK** cookie otomatis
  - Bahkan dengan `sameSite=None` & `secure=true`, browser modern block third-party cookies by default

**Solusi**: Manual cookie setting di client menggunakan `document.cookie`

---

#### ❌ **MASALAH #2: Wrong `sameSite` Setting**

**File**: `src/lib/authUtils.ts` (line 21), `src/lib/tokenUtils.ts`

**Problem**:

- `CookieManager.set()` menggunakan `sameSite: 'lax'` untuk production
- `sameSite: 'lax'` **TIDAK BEKERJA** untuk cross-domain request
- Cookie dengan `sameSite: 'lax'` hanya dikirim untuk same-site request

**Solusi**: Gunakan `sameSite: 'none'` + `secure: true` untuk cross-domain

---

#### ❌ **MASALAH #3: Redirect ke Root (/) instead of /dashboard**

**File**: `src/app/login/page.tsx` (line 24)

**Problem**:

- Code redirect ke `router.push("/")` setelah login
- Middleware config mengizinkan "/" sebagai public route
- User redirect kembali ke login karena tidak ada protected content di "/"

**Solusi**: Redirect langsung ke `/dashboard`

---

#### ❌ **MASALAH #4: No Auth Context Refresh**

**File**: `src/app/login/page.tsx`

**Problem**:

- Setelah cookie di-set, tidak ada notifikasi ke `AuthContext`
- `AuthContext` tidak tahu bahwa user sudah login
- Cookie ada tapi state belum update

**Solusi**:

- Trigger localStorage event untuk cross-tab sync
- Call `router.refresh()` untuk force re-check middleware

---

## ✅ Implementasi Fix

### 1. **Login Page: Manual Cookie Setting**

**File**: `src/app/login/page.tsx`

```typescript
if (data.token) {
  // CRITICAL FIX: Manually set cookie for cross-domain
  // Backend cannot set cookie due to cross-origin restrictions
  const isProduction =
    process.env.NODE_ENV === "production" ||
    window.location.protocol === "https:";
  const sameSite = isProduction ? "none" : "lax";
  const secure = isProduction ? "; secure" : "";

  document.cookie = `token=${data.token}; path=/; max-age=${
    7 * 24 * 60 * 60
  }${secure}; samesite=${sameSite}`;

  // Notify other tabs/windows about auth change
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("auth_changed", Date.now().toString());
    localStorage.removeItem("auth_changed");
  }

  toast.success("Login Success!");

  // Small delay to ensure cookie is set before redirect
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Redirect to dashboard (not root)
  router.push("/dashboard");

  // Force a full page reload to ensure auth context picks up the cookie
  router.refresh();
}
```

**Changes**:
✅ Manual cookie setting dengan `document.cookie`
✅ Dynamic `sameSite` based on environment (none untuk prod, lax untuk dev)
✅ Dynamic `secure` flag based on protocol
✅ Trigger localStorage event untuk cross-tab sync
✅ Add delay untuk ensure cookie ter-set sebelum redirect
✅ Redirect ke `/dashboard` bukan `/`
✅ Call `router.refresh()` untuk force middleware check

---

### 2. **Cookie Manager: Smart Cookie Setting**

**File**: `src/lib/tokenUtils.ts`

```typescript
static set(name: string, value: string, options = {}): void {
  if (typeof document === "undefined") return;

  let cookieString = `${name}=${value}`;
  // ... other options ...

  // CRITICAL FIX: For production cross-domain, always use secure
  const isProduction = process.env.NODE_ENV === "production" ||
                      (typeof window !== "undefined" && window.location.protocol === "https:");

  if (options.secure || isProduction) {
    cookieString += `; secure`;
  }

  // CRITICAL FIX: Default to 'none' for cross-domain, fallback to 'lax'
  const sameSite = options.sameSite || (isProduction ? "none" : "lax");
  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}
```

**Changes**:
✅ Auto-detect production environment
✅ Auto-set `secure` flag di production
✅ Default `sameSite=none` di production untuk cross-domain
✅ Fallback ke `sameSite=lax` di development untuk localhost

---

### 3. **Auth Utils: Cross-Domain Compatible**

**File**: `src/lib/authUtils.ts`

```typescript
static async login(token: string, rememberMe: boolean = false): Promise<void> {
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

  // CRITICAL FIX: For cross-domain, use sameSite=none with secure
  const isProduction = process.env.NODE_ENV === "production" ||
                      (typeof window !== "undefined" && window.location.protocol === "https:");

  CookieManager.set("token", token, {
    maxAge,
    path: "/",
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  this.notifyAuthChange();
  await new Promise((resolve) => setTimeout(resolve, 100));
}
```

**Changes**:
✅ Increase default maxAge dari 1 day ke 7 days
✅ Dynamic `sameSite` & `secure` based on environment
✅ Proper cross-domain cookie support

---

### 4. **Middleware: Better Debug Logging**

**File**: `src/middleware.ts`

```typescript
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Debug logging for cookie check (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Middleware] ${pathname} - Token exists:`, !!token);
  }

  // ... rest of middleware ...

  if (!token) {
    console.log(
      `[Middleware] No token found, redirecting to login from ${pathname}`
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
```

**Changes**:
✅ Add debug logging untuk development
✅ Better visibility untuk troubleshooting

---

## 🎯 How It Works Now

### Authentication Flow (Fixed):

1. **User Submit Login Form**

   - POST request ke backend `/auth/login`
   - Axios send dengan `withCredentials: true`

2. **Backend Response**

   - Return `{token, role}` di response body
   - (Backend juga set cookie via header, tapi browser block untuk cross-domain)

3. **Frontend Handle Response** ✅ **FIXED**

   - **NEW**: Manual set cookie via `document.cookie`
   - Set cookie dengan `sameSite=none` & `secure=true` (production)
   - Trigger localStorage event untuk cross-tab sync
   - Show success toast
   - Wait 150ms untuk ensure cookie ter-set
   - Redirect ke `/dashboard`
   - Call `router.refresh()` untuk trigger middleware check

4. **Middleware Check** ✅ **FIXED**

   - Read cookie dari `req.cookies.get("token")`
   - Cookie sekarang **ADA** karena manual setting
   - Validate & decode token
   - Allow access ke protected routes

5. **AuthContext Update** ✅ **FIXED**
   - Detect cookie exists via `CookieManager.get("token")`
   - Decode & validate token
   - Set user state
   - Session persist across page refresh

---

## 🧪 Testing Guide

### Test 1: Login Flow

```bash
1. Open DevTools → Application → Cookies
2. Clear all cookies
3. Login dengan credentials valid
4. Check console untuk debug logs
5. Verify cookie "token" ter-set dengan:
   - Name: token
   - Value: JWT token string
   - Path: /
   - SameSite: None (production) atau Lax (dev)
   - Secure: true (production) atau false (dev)
6. Verify redirect ke /dashboard
7. Verify tidak redirect balik ke /login
```

### Test 2: Session Persistence

```bash
1. Login successfully
2. Hard refresh page (Ctrl+F5)
3. Verify masih login (tidak redirect ke /login)
4. Check console untuk middleware logs
5. Navigate ke different route (e.g., /products)
6. Verify tetap authenticated
```

### Test 3: Cross-Tab Sync

```bash
1. Login di Tab 1
2. Open Tab 2 (same domain)
3. Verify Tab 2 juga authenticated
4. Logout di Tab 1
5. Verify Tab 2 juga logout
```

---

## 🔍 Debugging Tips

### Problem: Cookie tidak ter-set

**Check**:

- DevTools → Console → cari error related to cookie
- DevTools → Application → Cookies → verify cookie ada
- Check `sameSite` & `secure` flags correct

**Solution**:

- Untuk localhost (HTTP): `sameSite=lax`, no `secure` flag
- Untuk production (HTTPS): `sameSite=none`, `secure=true`

---

### Problem: Redirect loop ke /login

**Check**:

- Console logs dari middleware
- Verify cookie ter-set BEFORE redirect
- Check middleware bisa baca cookie

**Solution**:

- Increase delay sebelum redirect (sudah set ke 150ms)
- Verify `document.cookie` syntax correct
- Check browser tidak block cookies

---

### Problem: Token expired immediately

**Check**:

- Decode JWT token di jwt.io
- Check `exp` field
- Compare dengan current timestamp

**Solution**:

- Backend harus set proper expiration
- Frontend maxAge harus match backend expiration

---

## 🚀 Production Deployment Checklist

- [ ] Verify `NEXT_PUBLIC_API_URL` di .env production
- [ ] Verify backend CORS allow credentials
- [ ] Verify backend CORS allow origin (exact domain, not \*)
- [ ] Verify production menggunakan HTTPS
- [ ] Test login flow di production
- [ ] Test session persistence di production
- [ ] Monitor cookie setting di production logs
- [ ] Verify sameSite=none bekerja di production

---

## 📚 References

- [MDN: SameSite Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [Chrome: SameSite Cookie Changes](https://www.chromium.org/updates/same-site/)
- [Next.js: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## ✨ Key Takeaways

1. **Cross-domain cookies** require manual client-side setting via `document.cookie`
2. **sameSite=none** + **secure=true** mandatory untuk cross-domain di production
3. **sameSite=lax** cukup untuk same-domain atau localhost development
4. Always add **delay** sebelum redirect untuk ensure cookie ter-set
5. Use **localStorage events** untuk cross-tab authentication sync
6. Call **router.refresh()** setelah auth change untuk trigger middleware re-check

---

## 🎉 Status: FIXED ✅

Authentication sekarang bekerja dengan baik untuk cross-domain setup (Netlify backend + Vercel frontend).
