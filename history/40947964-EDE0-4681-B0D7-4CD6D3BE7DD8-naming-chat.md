# CHAT

Session ID: 40947964-EDE0-4681-B0D7-4CD6D3BE7DD8
Session File: .claude-session-id

## Project Context

- CONTEXT.md: `/Users/erikwu/GithubRepo/reheader/CONTEXT.md`
- Navigator loaded-context summary: The current project, Reheader, is a deliberately focused browser extension that modifies HTTP request and response headers through switchable Profiles. Its distinguishing concepts are Header Rules, one selected Profile at a time, Global Exclude Filters, and request/response coverage. Redirects, cookie tooling, and general on-page debugging are out of scope.
- Driver first-read requirement: Read `CONTEXT.md`, `README.md`, and `CLAUDE.md` before proposing names; record how the narrow product scope affects the naming criteria.

## Collaboration Protocol

- Codex is Navigator; Claude Code is Driver.
- This collaboration session id is `40947964-EDE0-4681-B0D7-4CD6D3BE7DD8` and must appear in every Driver/Navigator entry.
- The canonical session id source is `.claude-session-id`; every Claude CLI call must read the UUID from that file immediately before invocation.
- Use `claude -p --dangerously-skip-permissions --effort max --session-id <session-id-from-file> "<prompt>"` for the first call and `claude -p --dangerously-skip-permissions --effort max --resume <session-id-from-file> "<prompt>"` for follow-ups.
- Prefix each substantive entry with `[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8]`.
- Claude Code writes decisions, questions, and naming analysis here.
- Claude Code must not edit product or project documentation files, commit, push, or perform a rename.
- Codex independently evaluates the candidates and sends critique back until naming consensus is explicit.

## Task Context

- Issue reference: User-requested naming collaboration; no GitHub issue was provided.
- Goal: Create a novel, technology-forward replacement name because `Reheader` is already used by someone else.
- Acceptance criteria: A clear first choice plus a small ranked shortlist; each name should be concise, pronounceable, relevant to focused HTTP header modification, and defensible as a developer-tool brand.
- Constraints: Do not imply broader proxy, redirect, cookie, or page-debugging capabilities. Do not rename files, code, repository, extension metadata, or documentation in this task.
- Availability caveat: Web/GitHub/package/store checks can reject obvious collisions but are not trademark clearance or a guarantee of domain/handle availability.

## Shared Context

### Navigator

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] The product's essence is controlled mutation of HTTP headers at the browser boundary. Strong naming territories include boundary/gate/edge concepts, signal or protocol concepts, and precise coined words. Weak directions include generic combinations such as Header Tool, broad claims such as Proxy, and names that are hard to spell after hearing once.

### Driver

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Independent product read: Reheader applies exactly one selected, enabled Profile of header rules — set or remove, on both the request and the response side — to browser traffic, compiled into declarativeNetRequest session rules. It declares rules the browser enforces; it never intercepts, inspects, routes, or blocks traffic. Global Exclude Filters are regex escape hatches that exempt matching requests entirely. Essence in one line: a switchable identity of precise header edits, stamped onto every request and response at the browser boundary.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Naming constraints (derived independently): (1) must read as focused header modification — no implication of proxying, redirecting, cookie tooling, blocking, or page debugging; (2) concise, spellable after one hearing, clean in lowercase for repo/package/store handles; (3) must be differentiated from the incumbent namespace — ModHeader, Header Editor, Modify Header Value, Requestly (training-data knowledge, to be verified) already own the descriptive header-compound space, so descriptive compounds are simultaneously collision-prone and generic; (4) must not contradict CONTEXT.md Avoid vocabulary (preset, clone, blacklist, allow rule); (5) a store tagline ("<Name> — switchable HTTP header profiles") can carry the descriptive load, so the name itself need not contain "header".

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] How the narrow scope shapes the name: a deliberately single-purpose tool earns a small concrete-noun name with hand-tool energy, not a platform-suffix brand. Overclaim is the dominant failure mode — gate/shield/tunnel/proxy vocabulary claims traffic control the product refuses to do; underclaim is a lesser but real risk (a request-only or CORS-only name would misdescribe response-side coverage). The exempt mechanic is an internal DNR detail (allow rules) and must not surface in the brand.

### Consensus / Open Questions

- Whether a descriptive compound or a more ownable coined brand should lead.
- Which candidates survive current collision checks.

## Repository Context

### Navigator

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Inspected `CONTEXT.md`, `README.md`, `CLAUDE.md`, `package.json`, relevant manifest/i18n references, repository status, and current branding occurrences. The repository is clean on `main` and no product changes are authorized.

### Driver

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Read this session (after the interrupted print run): CONTEXT.md (ubiquitous language plus its Avoid terms), README.md (scope statement, DNR compile model, layout), CLAUDE.md (architecture; explicit out-of-scope list: redirects, cookie tooling, on-page tools), CHAT.md (protocol and Navigator entries). Constraints honored: only CHAT.md edited; no rename, commit, push, or browsing performed.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Brand-relevant repository observations: the codebase already speaks a precision/signal dialect (`text-signal` theme token, self-hosted fonts, framework-free tested core) — a craftsmanlike, precise name matches the existing product personality rather than inventing a new one. Per README, the user-facing name lives in `public/_locales/en/` i18n plus the WXT manifest config, so the eventual rename surface is small (out of scope for this task).

### Consensus / Open Questions

## Naming Plan

### Navigator

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Generate candidates across several distinct naming territories, score their semantic fit, novelty, memorability, pronunciation, and technology feel, then challenge the strongest names for misleading scope, awkward sound, and likely collision. Use live search only after a shortlist exists.

### Driver

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Method: 18 candidates across five territories; each gets a one-line rationale plus pronunciation/scope flags; scored 1–5 on semantic fit, novelty, memorability, pronunciation, technology feel; top six ranked below. Collision notes are training-data knowledge only — live checks are the Navigator's next step per plan.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Territory A — Protocol & wire (name what headers literally are on the wire):

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 1. **Fieldline** — RFC 9110's own term for one header line ("field line"): exact to insiders, brand-shaped to everyone else. Flags: physics field-line echo; most descriptive of the set, hence least ownable.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2. **Sideband** — radio engineering's channel that carries metadata alongside the main signal — precisely headers' relationship to the payload. Flags: obscure outside RF/DSP circles; likely audio/SDR tool collisions.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 3. **Vary** — an actual HTTP response header that also means "to change"; the tool varies headers per profile. Flags: generic verb, near-unsearchable; the joke is invisible to non-insiders.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 4. **Modeline** — vim's configuration line at the head of a file that changes behavior — a header directive by another name. Flags: vim-bound association; "mode" is adjacent to, not equal to, headers.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 5. **Preflight** — the CORS preflight is HTTP's most header-centric moment, with an aviation-checklist care connotation. Flags: risks reading CORS-only (an underclaim); CI tools already use the word.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Territory B — Print & editorial (the printed head as identity):

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 6. **Letterhead** — identity pre-printed at the head of every outgoing letter; switching profiles is switching stationery — the closest metaphor to Profiles in the whole space. Flags: three syllables; corporate-stationery vibe lowers raw technology feel.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 7. **Masthead** — the block at a publication's head declaring its identity. Flags: nautical second meaning; media-tool collisions likely.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 8. **Imprint** — a publisher's identity block plus the act of stamping it on. Flags: crowded brand word across app stores.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 9. **Byline** — the line declaring who a piece is from; profiles change who your requests say they are from. Flags: journalism-tool collisions; leans identity-only, understating general set/remove.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 10. **Frontmatter** — metadata that precedes content; developers already use the word for exactly that. Flags: strongly YAML/static-site associated — could read as content tooling; three syllables.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Territory C — Threshold & structure (the boundary where modification happens):

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 11. **Lintel** — the beam over a door, which builders literally call a "header": a load-bearing header at the threshold every request crosses. Flags: "lint-" may momentarily suggest a linter; contains "intel" (dictionary-word defense, still worth a check); near-homophone of "lentil" in fast speech.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 12. **Transom** — the pane above a door; "over the transom" = things arriving at the threshold. Flags: archaic, weakest recognition of the set; nautical stern meaning.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 13. **Headgate** — the real-world gate at the head of an irrigation canal, controlling what flows through; contains "head". Flags: "gate" implies allow/block — exactly the overclaim the task forbids; livestock-restraint second meaning.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Territory D — Craft & tuning (precise hand adjustment):

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 14. **Headstock** — the head of a guitar, where the tuning pegs live; profiles read naturally as tunings you switch between. Flags: guitar/lathe niche; "-stock" finance echo.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 15. **Headwright** — "-wright" = craftsman (shipwright, Playwright): one who crafts heads, with a free write/right homophone. Flags: spelling forks under dictation (notably "headright", a colonial land-grant term to avoid); can read Playwright-derivative.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 16. **Overstrike** — the typewriter act of striking over what is already printed — overriding what the head says. Flags: "strike" connotes blocking/aggression; typewriter reference is aging.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 17. **Inflect** — grammar: altering a word's form to change its function without replacing the word — surgically apt for header mutation. Flags: fully abstract, no header cue; Inflection-AI adjacency.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Territory E — Wordplay wildcard:

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 18. **Overhead** — over + head: it overrides headers, and headers are HTTP's overhead — a double insider pun with instant recall. Flags: "overhead" is a performance-cost word — the wrong connotation for a zero-overhead declarative tool; projector meaning.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Excluded for known collisions before scoring: Postmark (ideal metaphor — metadata stamped in transit — but a well-known transactional-email service), Headroom (audio term plus Max Headroom, but headroom.js is an existing header-adjacent library), Envoy and Janus (proxy / WebRTC incumbents), and every Mod-/Header- descriptive compound (reads as a ModHeader clone).

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Ranked top six (semantic fit / novelty / memorability / pronunciation / technology feel, 1–5 each):

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 1. **Lintel** — 5/5/4/4.5/3.5 = 22.0. The one name whose metaphor is literal — builders call the beam over an opening a header — and it sits at the boundary every request passes through. Short, lowercase-clean, and to my knowledge unused in developer tooling. Verify: Intel adjacency, lentil mishearing, existing lintel-named projects.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2. **Sideband** — 4.5/4/3.5/5/4.5 = 21.5. The truest engineering metaphor for what headers are, and the most technology-forward name of the set. Verify: SDR/audio-tool collisions.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 3. **Letterhead** — 5/4/5/5/2.5 = 21.5. The best Profiles metaphor available — switching stationery — and instantly explainable; ties Sideband and loses the tiebreak only on the brief's technology-forward requirement.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 4. **Headstock** — 4.5/4.5/4/5/3 = 21.0. Literal "head" plus the tuning metaphor; warm, concrete, and novel in this space. Wins the tiebreak over Fieldline on novelty.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 5. **Fieldline** — 5/3/3.5/5/4.5 = 21.0. The standards-literal fallback: RFC 9110's own vocabulary without descending to "Header Tool".

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 6. **Headwright** — 4/4.5/3.5/4/4 = 20.0. The most ownable coined option. Note: Overhead scored 20.5 but is excluded from the six on judgment — a performance-cost word is a brand defect for this tool, not just a flag.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] First choice: **Lintel**, presented as "Lintel — switchable HTTP header profiles" so the tagline does the descriptive work.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Position on the open question (descriptive vs coined): lead with a real-word metaphor (Lintel) — descriptive compounds are incumbent-crowded and generic, while a fully coined word starts cold on meaning; Fieldline is the descriptive fallback if the metaphor is judged too oblique.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Questions for Navigator: (a) how to weight technology feel vs memorability for the Sideband/Letterhead tie at #2–3; (b) should the name carry explicit head-material (Headstock, Letterhead, Headwright) or is implicit metaphor plus tagline stronger (Lintel, Sideband, Fieldline)?; (c) run collision checks on the six before consensus, per the plan's search-after-shortlist rule.

### Consensus / Open Questions

## Consensus Gate

- Shared product intent: Name a focused browser extension that deliberately sets or removes request and response headers through switchable Profiles. The name should feel novel and technological without claiming proxying, routing, inspection, blocking, security, redirects, cookies, or general page debugging.
- Scope / out of scope: Naming recommendation only. No repository, package, manifest, UI, documentation, remote, or store rename is authorized in this task.
- Chosen naming territory: An ownable mechanism-rooted coinage whose descriptive load is shared with a clear tagline. `Protomend` combines protocol with amend: precise, deliberate changes to protocol metadata.
- Ranked candidates: 1. **Protomend**; 2. **Foreglyph**; 3. **Wireglyph** (conditional on copy that prevents a packet-inspection interpretation).
- Verification: On 2026-07-16, all three had no exact npm package, PyPI package, or GitHub repository name found; `.com` and `.dev` RDAP returned not found; broad web, Chrome Web Store, Firefox Add-ons, and initial Justia trademark searches returned no exact matches.
- Deferred unknowns: Search screening is not legal trademark clearance, registrar availability can change, and the user has not yet approved or registered the name.
- Definition of done: Codex and Claude independently understand the product, have rejected collided or misleading names, explicitly agree on a ranked shortlist and tagline, and report the verification limits without changing the product.

## Driver Log

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2026-07-16 — Resumed after the interrupted print run; session ID 40947964-EDE0-4681-B0D7-4CD6D3BE7DD8 preserved (header of this file and `.claude-session-id` untouched). Read CONTEXT.md, README.md, CLAUDE.md, CHAT.md; appended independent product read plus constraints (Shared Context), repository observations (Repository Context), and 18 candidates in five territories with a ranked top six, first choice Lintel (Naming Plan). Only CHAT.md was edited; no rename, commit, push, or browsing. Next: Navigator critique and collision checks on the shortlist.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2026-07-16 — Round 2 after Navigator's live rejection of all six first-round finalists. Appended under Fix Loop: acceptance of the rejection evidence, round-2 method with adversarially pre-filtered veins, 12 coined candidates across four construction patterns (each with roots, pronunciation, meaning, strongest failure mode), one flagged non-coined extra (Heddle), a ranked top five for live verification (Manifex, Kernset, Trimtab, Declaro, Rubricon; alternate Linesmith), and per-name verification notes. Constraints honored: only CHAT.md edited, only Fix Loop and Driver Log touched this round; no browsing, rename, commit, or push; session ID preserved. Next: Navigator live collision checks on the five.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2026-07-16 — Round 3: adversarial critique of the seven pre-screened candidates; no new names generated (three survive, so the all-fail replacement clause was not triggered). Appended under Fix Loop: the shared three-strike finding against the mux morpheme, per-candidate batteries across all seven tests (pronunciation, dictation, category, scope truth, Mux adjacency, tagline fit, strength without etymology), ranked top three (Protomend; Foreglyph; Wireglyph conditional), rejection of Muxstamp/Headmux/Hedmux/Muxmark with concrete reasons, divergence notes against the Navigator's provisional ranking, and the recommendation: display name Protomend, tagline "Protomend — switchable HTTP header profiles". Constraints honored: only CHAT.md edited (Fix Loop and Driver Log only); no browsing, rename, commit, or push; session ID preserved. Next: Navigator decision and Consensus Gate fill-in.

## Verification

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Navigator verification completed on 2026-07-16. The first two generated rounds were checked against live web results and rejected for exact active software/app/company conflicts or poor brand fit. The third-round finalists were checked against npm, PyPI, GitHub repository-name search, Verisign `.com` RDAP, Google Registry `.dev` RDAP, broad web search, Chrome Web Store, Firefox Add-ons, and an initial Justia trademark search. Protomend, Foreglyph, and Wireglyph produced no exact match in those checks. A professional trademark search and actual domain/handle registration remain separate work.

## Navigator Review

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] First-round collision review, checked live on 2026-07-16: the shortlist does not clear the acceptance bar. Lintel is already the name of a current developer-facing SAST product at `lintelcode.dev` and a separate maintenance SaaS at `getlintel.com`. Sideband is already used by Reticulum messaging software and an iOS audio app. Letterhead is an active newsletter SaaS and an exact-name Chrome Web Store extension. Fieldline is used by several active SaaS products and has a software-services trademark application. Headwright has an established exact-match `.com` used for technology/design work. Headstock has no same-category collision found in the initial search, but its primary music-instrument meaning overwhelms the HTTP metaphor and weakens ownability.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Decision: reject all six as final recommendations. The second round should prioritize an ownable coined name with credible engineering morphology, six to nine letters where possible, easy pronunciation, and a clean lowercase handle. The tagline may explain header modification. Avoid generic dictionary nouns and the crowded `header`/`mod` namespace; also avoid terms that imply proxying, routing, blocking, security, or request-only behavior.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Final Navigator decision: accept the Driver's third-round critique and ranking. **Protomend** remains first because it is pronounceable, spells as heard, truthfully spans request and response header modification, and avoids the false routing/multiplexing implications found in the mux family. **Foreglyph** is the safer metaphorical backup; **Wireglyph** is more visually brandable but carries a packet-tool association. Consensus is explicit: use the display line **Protomend — switchable HTTP header profiles**. No product or documentation rename is performed because the user requested ideation, not implementation.

## Fix Loop

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Driver requested to produce a second generation after absorbing verified collision evidence. Required output: 12 coined candidates across at least three construction patterns, explicit word roots and pronunciation, failure-mode critique, and a ranked top five for Navigator live verification.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Accepted: all six first-round finalists are rejected on the live evidence in Navigator Review (Lintel → lintelcode.dev + getlintel.com; Sideband → Reticulum + iOS audio app; Letterhead → newsletter SaaS + exact-name CWS extension; Fieldline → active SaaS + trademark filing; Headwright → established .com; Headstock → brand-fit failure). Round 2 is fully coined per brief: 6–9 letters, one obvious pronunciation, clean lowercase, credible engineering morphology, tagline carries the header explanation; no generic dictionary nouns, no header/mod compounds, no proxy/routing/blocking/security/request-only implications, no first-round recycling.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Round-2 method: 12 coined candidates across four construction patterns — P1 Latin first-person verbs (the tool states what it does), P2 agent/instrument suffix coins (artifex / stencil / wordsmith morphology), P3 technical-term welds (two real engineering morphemes fused into a new string), P4 story-blends (two allusions fused). Veins adversarially pre-filtered before listing: any ad- prefixed coin (reads adtech/adblock inside an extension store), Signel (one letter from Signal — typosquat read), Prefixa (lives in Autoprefixer's mind-space), Overtype (a synonym re-serve of first-round Overstrike — concept recycling), bank-/key- morphemes (finance and credential misreads).

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] P1 — Latin first-person verbs:

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 1. **Declaro** (7, deh-KLAH-roh) — roots: Latin declarare, first person "I declare". Meaning: the mechanism named honestly — the tool declares header state via declarativeNetRequest and the browser enforces it; it never intercepts. Strongest failure mode: reads as customs/legal-declaration software if the DNR story is not told.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2. **Prefigo** (7, preh-FEE-goh) — roots: Latin praefigere, first person "I fasten in front" — the classical verb for affixing something at the head. Meaning: fastens metadata to the front of every message, request and response alike. Strongest failure mode: opaque until the etymology is told once; Prego/Figo sound-echoes invite jokes.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 3. **Emenda** (6, eh-MEN-dah) — roots: Latin emendare; textual emendation is the scholarly craft of line-precise manuscript correction. Meaning: minimal, line-level edits to a message already written. Strongest failure mode: one letter from "amend/emend", so it can read as a proofreading tool rather than a network tool.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] P2 — Agent/instrument suffix coins:

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 4. **Manifex** (7, MAN-ih-feks) — roots: Latin manus (hand) + -fex (maker, as in artifex, pontifex); deliberate resonance with "manifest" — the shipping document that declares a cargo's metadata, and manifest.json, the artifact every extension developer knows. Meaning: the hand-maker of the message's declared metadata. Strongest failure mode: "mani-" invites a consumer manicure misread; the -fex construction needs its artifex precedent stated once.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 5. **Linesmith** (9, LINE-smith) — roots: (field) line + -smith on the wordsmith/locksmith pattern. Meaning: a craftsman of header lines — set, remove, refine. Strongest failure mode: "linesman" mishearing pulls toward sports officiating; longest string in the set, at the 9-letter ceiling.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 6. **Stampel** (7, STAM-pel) — roots: stamp + -el instrument diminutive (stencil, pencil); cognate wink at German Stempel, a rubber stamp. Meaning: the small tool that stamps a chosen identity onto every message in both directions. Strongest failure mode: faintly toy-like register; stumble/trample mishearing.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] P3 — Technical-term welds:

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 7. **Kernset** (7, KURN-set) — roots: typographic kern (micro-adjustment of what is already set) + set (typesetting, and literally the tool's primary verb — set/remove). Meaning: precision micro-adjustment applied at the moment things are set. Strongest failure mode: first-glance misread as a font utility; secondary "kernel set" OS misread.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 8. **Trimtab** (7, TRIM-tab) — roots: welded from "trim tab", the miniature control surface whose tiny deflection moves the whole craft — Buckminster Fuller's chosen epitaph ("Call me Trim Tab"); "tab" is browser-native vocabulary by happy accident. Meaning: the smallest precise adjustment with outsized effect on the whole exchange. Strongest failure mode: the Fuller-lore namespace is actively used by consultancies and nonprofits (moderate collision risk), and trim carries a faint course-control whiff against the no-routing rule.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 9. **Capline** (7, KAP-line) — roots: welded from typography's "cap line", the invisible boundary line capitals rise to. Meaning: the top line of set text, standing for the top lines of a message. Strongest failure mode: "cap" reads as limit/quota, making it sound like a rate-limiter.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 10. **Foreline** (8, FOR-line) — roots: fore- (before, as in foreword) + line. Meaning: the lines that run before the body — on both sides of the exchange. Strongest failure mode: semantically the blandest of the set; an obscure vacuum-engineering homograph exists.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 11. **Swapset** (7, SWOP-set) — roots: hot-swap (replacing a component in a running system without stopping it) + set. Meaning: the rule set you swap live — the only candidate that names the Profiles switch directly. Strongest failure mode: "swap meet" flea-market register drags the tech feel; finance-swap echo.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] P4 — Story-blend:

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 12. **Rubricon** (8, ROO-brih-kon) — roots: Latin rubrica, the heading written in red that gave us "rubric", fused with the Rubicon, the boundary whose crossing commits you. Meaning: the red heading at the crossing point — headings rewritten exactly where traffic crosses. Strongest failure mode: a permanent typo-tax toward "Rubicon"; education-rubric drift.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Flagged extra, outside the required twelve because it is a real (if near-unknown) word rather than a coinage: **Heddle** (6, HED-l) — the loom wire every warp thread passes through; raising a different heddle set changes the woven pattern without touching the threads — an exact mechanical metaphor for Profiles — and its hed- onset echoes "header" without being a header compound. Consider for live verification only if the coined-only rule is relaxed.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Ranked top five for live verification: 1. **Manifex** — most distinctive string in the set, classical morphology, -ex tech ending, and the manifest.json resonance lands with extension developers; 2. **Kernset** — instantly parseable to developers, crisp, and "set" is the product's literal verb; 3. **Trimtab** — beloved engineering lore and a concrete object, accepted with its known namespace risk; 4. **Declaro** — the most mechanism-true name available; 5. **Rubricon** — the most memorable story, accepted with its typo-tax. First alternate if one of the five falls: **Linesmith**.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Verification notes for Navigator: check exact-string products, CWS/AMO extensions, npm/PyPI packages, and .com/.dev for the five; for Trimtab specifically check Fuller-affiliated orgs and consultancies; for Declaro check legal-tech; for Kernset check font tooling; for Manifex check logistics/manifest software; for Rubricon check both spellings (rubricon and rubicon products).

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Second-round live review: Manifex is active shipping software and several other apps; Kernset is an active developer-facing CMS; Trimtab is a technology/data consultancy; Declaro is used by multiple apps; Rubricon is an active AI-agent evaluation tool and package; Linesmith is an active editor extension and technology company; Heddle is an active coding-agent product with a software trademark filing. The entire second-round ranking is rejected.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Navigator constructed a mechanism-based third round and pre-screened exact strings on 2026-07-16. Seven candidates remain: **Protomend** (protocol + amend; precise amendment of protocol metadata), **Foreglyph** (fore + glyph; structured marks before the message body), **Wireglyph** (wire + glyph; structured metadata marks on the wire), **Muxstamp** (a multiplexer selects one Profile, then its header state is stamped onto traffic), **Headmux** (header + multiplexer), **Hedmux** (compressed header + multiplexer), and **Muxmark** (one selected Profile marks traffic). Wirequill was rejected because its exact `.com` is registered; Metamend and Metaflect were rejected on active exact/near-exact technology usage.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Pre-screen evidence for all seven: exact npm package absent, exact PyPI package absent, no exact GitHub repository name found, `.com` RDAP returned not found, `.dev` RDAP returned not found, and broad web plus Chrome Web Store, Firefox Add-ons, and Justia trademark searches returned no exact matches. This is collision screening, not legal trademark clearance and not a promise that a registrar will still show domains available later.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Navigator provisional ranking before Driver critique: 1. **Protomend** — best balance of natural pronunciation, protocol relevance, technology feel, and ownability; concern: `mend` may imply repairing something broken. 2. **Muxstamp** — strongest product-mechanism story; concerns: the `ks-st` consonant cluster and adjacency to the established Mux video platform. 3. **Wireglyph** — most visual and brandable; concern: `wire` can overstate low-level interception. 4. **Hedmux** — shortest and most ownable; concern: cryptic spelling. 5. **Foreglyph** — elegant and accurate before-payload metaphor; concern: weaker connection to switching Profiles. Headmux and Muxmark remain useful controls but inherit the `mux` concerns.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Driver requested to adversarially review these seven rather than generate more names: test pronunciation, dictation spelling, category implication, product-scope truth, Mux-brand adjacency, tagline fit, and whether the name still works if users never hear the etymology. Return an explicit ranked top three or reject all seven with concrete reasons.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Round-3 Driver critique: adversarial review of exactly the seven pre-screened candidates. No replacement names are generated — three of the seven survive, so the all-fail clause is not triggered.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Shared finding on the mux morpheme (applies to Muxstamp, Headmux, Hedmux, Muxmark): it fails three of the seven tests regardless of suffix. (i) Mux-brand adjacency — mux.com is an established developer-facing video platform, and two of the constructions read like its product SKUs. (ii) Unintended category — in Go and web-server vocabulary, mux literally denotes a request router (http.ServeMux, gorilla/mux), colliding head-on with this session's no-routing rule for the exact developer audience this extension serves. (iii) Scope truth — to HTTP-literate reviewers, mux says stream/header multiplexing (HTTP/2, HPACK), a mechanism claim the product does not perform, in the product's own protocol domain. The EE steelman is acknowledged — a multiplexer is a selector, and Profile selection is genuinely mux-shaped — but it is audience-wrong: web developers read mux as router or video muxing, not as a selector switch.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 1. **Protomend** — pronunciation: PRO-toh-mend, one natural reading, no cluster. Dictation: spells as heard; minor "protamend" vowel-drop risk. Category: two misreads — protobuf tooling (".proto"/proto owns the prefix for backend developers) and remedy-brand register (-mend endings pattern with healthcare/supplement names); neither is on the forbidden list. Scope truth: cleanest of the seven — no proxy/routing/blocking/security/request-only implication; "mend" soft-frames deliberate modification as repair, which is misdirection rather than falsehood, and the dominant real use of header profiles (making a dev exchange work) is honestly mend-shaped. Mux adjacency: none. Tagline fit: "switchable HTTP header profiles" counters the repair frame with deliberate-configuration language. Without etymology: proto and mend are transparent English morphemes — a cold reader lands nearer the truth than with any other candidate. Verdict: pass.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 2. **Foreglyph** — pronunciation: FOR-glif, easy. Dictation: the fore/four/for homophone fork at the first morpheme is a permanent voice tax; "glyph" spells correctly for developers, "glif" for others. Category: sits in font/icon tooling's shadow — Glyphs.app, a major font editor, anchors the -glyph category — with a secondary rune/gaming read. Scope truth: clean, no forbidden implication; note "marks before the body" is presentational where headers are semantic key-value lines. Mux adjacency: none. Tagline fit: the tagline carries all the real meaning; the name contributes only before-ness. Without etymology: a cold reader guesses fonts, not networks. Verdict: pass with reservations.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 3. **Wireglyph** — pronunciation: WIRE-glif, easy. Dictation: cleaner than Foreglyph (no homophone), same glyph/glif risk. Category: the two most famous Wire- developer brands are a packet sniffer (Wireshark) and a VPN (WireGuard), so the name inherits inspect/tunnel associations sitting exactly in the forbidden zone — while the morpheme itself is truthful ("wire format", "on the wire" are neutral standard vocabulary, and the tool does change what goes onto the wire). Scope truth: true by meaning, risky by neighborhood. Mux adjacency: none. Tagline fit: works, but the listing must lead with "declares rules; never inspects traffic" to defuse the inherited frame. Without etymology: the most visual and brandable string of the seven, but a cold reader guesses traffic inspection before header modification. Verdict: conditional pass.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 4. **Muxstamp** — pronunciation: the /ks-st/ boundary elides to "muck-stamp" or "muxtamp" in speech — fails say-it-once-cleanly. Dictation: the doubled sibilant drops ("muxtamp") or resolves to "muckstamp". Category: -stamp's dominant developer association is timestamp, and in video a mux timestamp (PTS/DTS in muxed streams) is nearly a real term; the whole reads like a Mux-the-company product SKU (Mux Video, Mux Data, Muxstamp). Scope truth: the select-then-stamp story is the truest mechanism narrative in the mux family, but only after explanation — cold, the mux morpheme claims multiplexing the product does not do. Mux adjacency: worst of the set. Tagline fit: a tagline cannot cure a mechanism-false name. Without etymology: reads as video timestamping. Verdict: reject.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 5. **Headmux** — pronunciation: HED-muks, easy. Dictation: moderate (mux becomes mucks/max for non-developers). Category: reads as header multiplexing — a real HTTP/2/HPACK concept the product does not perform — and re-enters the header-compound namespace this session banned in round 2; in audio, a head mux plausibly names a headphone-source switcher. Scope truth: false mechanism claim in the product's own domain. Mux adjacency: direct. Tagline fit: the tagline would spend itself un-claiming multiplexing. Without etymology: wrong guess for both developer and audio readers. Verdict: reject.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 6. **Hedmux** — pronunciation: easy once seen. Dictation: fatal — /hed/ is spelled "head" by default English, so every spoken mention needs "H-E-D, no A"; the newsroom jargon "hed" that justifies the spelling is unknown to most developers. Category and scope: inherits every mux strike; the vowel-dropped spelling also reads as 2008-era startup coinage against the technology-forward brief. Mux adjacency: direct. Tagline fit: moot under the spelling tax. Without etymology: meaning-empty cold. Ownability is real but purchased with a permanent spelling tax. Verdict: reject.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] 7. **Muxmark** — pronunciation: MUKS-mark, sayable. Dictation: moderate (muxmarc, mucksmark). Category: -mark in developer vocabulary means benchmark — cold, Muxmark reads as a benchmarking tool for multiplexers — and mux+mark also lands on watermarking, again inside Mux-the-company's product space. Scope truth: marking traffic is truthy; the mux morpheme is not. Mux adjacency: SKU-like, as with Muxstamp. Tagline fit: fights two wrong categories at once. Without etymology: benchmark or watermark, never headers. Verdict: reject.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Ranked top three: 1. **Protomend** — the only candidate passing every hard gate (pronunciation, dictation, scope truth, zero Mux adjacency); its two misreads are absorbable misdirection, not violations. 2. **Foreglyph** — the only other scope-clean candidate; ranked despite the fore/four dictation fork and the Glyphs.app category shadow. 3. **Wireglyph** — conditional: strongest visual brand and a truthful morpheme, admitted only with the inspect/tunnel-neighborhood caveat handled in store copy. Rejected with reasons above: Muxstamp, Headmux, Hedmux, Muxmark — the shared mux strikes are each independently disqualifying for this product's audience and scope rules.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Divergence from Navigator's provisional ranking, with reasons: concur on Protomend at #1. Muxstamp falls from #2 to rejected — the consonant cluster, the Mux-SKU read, and the timestamp/PTS capture are three independent strikes, any one of which would demote it. Hedmux falls on dictation alone. Wireglyph holds at #3 only under its caveat. Foreglyph rises to #2 as the remaining scope-clean candidate.

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Recommendation: display name **Protomend**, tagline "**Protomend — switchable HTTP header profiles**". The store description should open with "set or remove request and response headers per profile" so deliberate modification, not repair, frames the mend morpheme; note that mend's gentleness is also an asset — it is the rare change-verb with zero security or aggression connotation, which suits extension-store review.

## Final Closeout

[40947964-EDE0-4681-B0D7-4CD6D3BE7DD8] Naming collaboration complete. Recommended display name: **Protomend**. Recommended tagline: **Protomend — switchable HTTP header profiles**. Backups: **Foreglyph**, then **Wireglyph** with a scope-clarifying store description. No GitHub issue was provided, no product files or project documentation were changed, and no commit, push, merge, issue update, or issue close is applicable. The no-doc-change rationale is that this task selects a recommendation only; applying the rename requires explicit user approval as a separate change.
