# Chrome Web Store — Privacy practices 填寫內容

Developer Dashboard → 你的項目 → **Privacy practices** 分頁。每格直接貼上對應段落(英文)。

## Single purpose description(單一用途)

> Reheader modifies HTTP request and response headers. Users define header
> rules (set or remove a header) in named profiles; the extension applies the
> selected profile's rules to network requests using Chrome's
> declarativeNetRequest API. That is the extension's only function.

## Permission justifications(逐項權限理由)

### `storage`

> Used to persist the user's configuration (profiles, header rules, and filter
> settings) locally via chrome.storage.local, so rules survive browser
> restarts. No data is synced or transmitted anywhere; everything stays on the
> user's device.

### `declarativeNetRequest`

> This is the core API of the extension. User-defined header rules are
> compiled into declarativeNetRequest session rules with modifyHeaders
> actions, which is how the extension sets or removes request/response
> headers. The declarative API is used precisely so the extension never reads
> or intercepts request contents — Chrome applies the rules natively.

### Host permission: `<all_urls>`

> Header modification is a developer tool that must work on whatever site the
> user is developing or testing against — local dev servers, staging
> domains, APIs, and production sites — so the target hosts cannot be known
> in advance. The permission is used solely so declarativeNetRequest
> modifyHeaders rules can apply to the sites the user targets with their own
> rules. The extension injects no content scripts, reads no page content, and
> makes no network requests of its own.

## Remote code(遠端程式碼)

選 **No, I am not using remote code**。

> All JavaScript is bundled inside the extension package. No code is fetched
> or evaluated at runtime; fonts and all assets are packaged locally.

## Data usage(資料使用揭露)

「What user data do you plan to collect?」— **全部不勾**(不收集任何資料)。

三個 certification 核取方塊全部勾選:

- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

Privacy policy URL:填 `privacy-policy.md` 公開後的網址(見該檔案開頭說明)。
