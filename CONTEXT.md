# Reheader

A browser extension that modifies HTTP request/response headers via declarativeNetRequest, organized into switchable profiles.

## Language

**Profile**:
A named, self-contained set of header modifications. Exactly one profile is selected at a time; only the selected, enabled profile produces rules.
_Avoid_: preset, configuration set

**Header Rule**:
A single header modification (name + value) within a profile, for either the request or the response side. An empty value means "remove the header"; a non-empty value means "set it". Each rule has its own on/off toggle.
_Avoid_: header entry, modification

**Global Exclude Filter**:
A regex URL pattern, defined once for the whole extension, that exempts matching requests from all modifications. Each filter has its own on/off toggle.
_Avoid_: allow rule (DNR implementation term), blacklist

**Uses Global Filters**:
A per-profile opt-in that decides whether the global exclude filters apply to that profile's modifications.
_Avoid_: filter toggle (ambiguous with a filter's own toggle)

**Apply**:
A modification taking observable effect on network traffic. The only ground truth is the traffic itself, not the stored config or the compiled rules.

**Exempt**:
A request left completely unmodified because a global exclude filter matched it.
_Avoid_: blocked, filtered out

**Document Request**:
The main-frame navigation request for a page itself, as opposed to a **Subresource** request (script, image, fetch/XHR, ...). The distinction matters: DNR treats main-frame requests specially, and they must be covered explicitly.
_Avoid_: page request
