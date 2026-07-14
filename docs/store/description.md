# Chrome Web Store — 商店列表文案

Dashboard → **Store listing** 分頁。Category 建議選 **Developer Tools**。

## Summary(短描述,≤132 字元)

> Modify HTTP request and response headers with named profiles. Declarative,
> local-only, no tracking.

## Detailed description(詳細描述)

> Reheader is a lightweight developer tool for modifying HTTP request and
> response headers.
>
> FEATURES
>
> • Set or remove request headers and response headers
> • Organize rules into named profiles and switch between them in one click
> • Enable or disable a profile instantly — the toolbar badge shows when
>   rules are active
> • Global exclude filters: URL patterns that exempt matching requests from
>   all modifications
> • Autocomplete for common header names
> • Export your configuration as JSON
>
> BUILT ON DECLARATIVENETREQUEST
>
> Reheader uses Chrome's modern declarativeNetRequest API (Manifest V3).
> Your rules are handed to Chrome and applied natively — the extension never
> reads, intercepts, or logs your traffic or page content.
>
> PRIVATE BY DESIGN
>
> • No data collection, no analytics, no remote code
> • All configuration stays on your device in local extension storage
> • No network requests of its own
>
> TYPICAL USES
>
> • Add an Authorization or API-key header while testing an API
> • Send custom headers to local dev or staging environments
> • Remove or override headers to reproduce client conditions
> • Test CORS and cache behavior by adjusting response headers

## 螢幕截圖

CWS 要求至少 1 張、最多 5 張,1280×800 或 640×400 PNG/JPG。
已產生於 `docs/store/screenshots/`(1280×800):

1. `screenshot-1-popup.png` — popup 主編輯畫面(profile + header rules)
2. `screenshot-2-options.png` — options 全頁編輯畫面
3. `screenshot-3-settings.png` — 設定視窗(exclude filters + export)

另需 store icon:上架表單會自動使用套件內 manifest 的 128×128 icon
(`public/icon/128.png`),不用另外上傳。
