## Privacy Policy — 使用說明

已發佈為公開 Gist:**https://gist.github.com/erikkkwu/4781f8c7a3271f7eeb14850648093ccf**
把這個網址填入 Developer Dashboard 的 Privacy policy 欄位。
內容變更時,先改下方 markdown 原文,再用
`gh gist edit 4781f8c7a3271f7eeb14850648093ccf` 同步更新 Gist。
(Gist 會保留版本歷史;若要移除敏感內容,要刪掉重建而不是編輯。)

---

# Reheader Privacy Policy

_Last updated: July 13, 2026_

## Summary

Reheader does not collect, store, transmit, or sell any user data. Everything
you configure stays on your device.

## What the extension does

Reheader lets you define rules that modify HTTP request and response headers.
Rules are applied by Chrome's built-in declarativeNetRequest API.

## Data collection

Reheader collects **no data**. Specifically, it does not collect:

- Browsing history, visited URLs, or page content
- Personal or identifying information
- Analytics, telemetry, or crash reports

The extension makes no network requests of its own and contains no remote
code, third-party SDKs, or tracking of any kind.

## Data storage

Your configuration — profiles, header names and values, and filter patterns —
is stored locally on your device using `chrome.storage.local`. It is never
transmitted anywhere. Note that header values you enter (for example,
authorization tokens) remain on your machine only.

Uninstalling the extension deletes this data.

## Header modification

Header rules you define are registered with Chrome's declarativeNetRequest
API, which applies them natively inside the browser. The extension itself
never reads, intercepts, or logs your network traffic or page content.

## Changes to this policy

Any changes will be published at this URL with an updated date above.

## Contact

Questions about this policy can be sent through the support tab of the
extension's Chrome Web Store listing.
