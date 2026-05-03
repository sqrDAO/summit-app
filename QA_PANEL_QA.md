# QA Test Plan — Anonymous Audience Q&A

**Feature:** Anonymous audience Q&A for Panel Discussions, with real-time upvoting and a separate LED-display projection view.

**You'll need:**
- **Two devices** (e.g. one phone + one laptop, or two phones, or two browser windows in different incognito sessions). Real-time sync only matters if "device A" and "device B" are genuinely separate browsers.
- The app URL — either the local dev URL the developer gives you (e.g. `http://localhost:3000`) or the deployed staging URL.
- Firestore rules **must already be deployed** before testing (ask the developer to confirm). Without them, writes will silently fail.

> ℹ️ **Test only on dev or staging.** Don't test against production Firestore — questions submitted during testing persist and would clutter the live event.

---

## URL pattern

There is **no top-level `/qa` route**. Every Q&A URL is nested under a panel session:

| What | URL |
|---|---|
| Audience submit + upvote (mobile) | `/sessions/<panel-id>/qa` |
| LED projection screen | `/sessions/<panel-id>/qa/display` |

Five valid panel IDs:
- `panel-1`, `panel-2`, `panel-3` (May 25)
- `davas-panel-1`, `davas-panel-2` (May 26)

Any other session ID (keynotes, breaks, debates, etc.) **must return 404** for both `/qa` and `/qa/display`.

---

## Test cases

For each, mark **PASS** / **FAIL** and capture a screenshot or short video on FAIL.

### TC-01 · Submit a question (happy path)
1. On device A, open `/sessions/panel-1/qa`.
2. In the textarea, type: `What's the biggest regulatory blocker for builders in Vietnam?`
3. Tap **Submit anonymously**.

✅ Expected:
- Textarea clears.
- Button shows `Wait 30s` and counts down.
- The question appears in the **Live Questions** list within ~1 second.
- The question text is exactly what you typed (no name, no avatar, no identifier).

---

### TC-02 · Real-time sync between devices
1. On device A, leave `/sessions/panel-1/qa` open.
2. On device B, open the **same URL** in a different browser/incognito.
3. On device B, submit a question.

✅ Expected:
- Device A shows the new question within ~2 seconds **without a manual refresh**.
- Counter at the top right updates from `1 so far` → `2 so far`.

---

### TC-03 · Upvote a question
1. On device A, tap the **▲ count** button on any question.

✅ Expected:
- Count increments by 1 immediately.
- The button turns gold and becomes disabled.
- On device B, the same question's count updates within ~2 seconds.

---

### TC-04 · Upvotes drive ordering
1. Have at least 3 questions in the list.
2. From device B (which hasn't upvoted any), upvote the **third** question several times — actually, you can't (one upvote per device). Use a third device or a third incognito window.
3. Get question #3 to have more upvotes than #1 and #2.

✅ Expected:
- Question #3 visually moves to the top of the list on **both** device A and the LED display.
- The reordering happens live, no refresh.

---

### TC-05 · Double-upvote blocked
1. On device A, upvote a question.
2. Try tapping the upvote button again.

✅ Expected:
- Button is disabled (gold/cannot be tapped).
- Count does **not** increment a second time.
- Refresh the page → upvote stays applied (button still disabled, count unchanged).

---

### TC-06 · Cross-tab upvote persistence
1. On device A, upvote a question.
2. Close the tab and reopen the same URL.

✅ Expected:
- The button is still disabled (the device remembers via localStorage `summit_device_id`).

> If the device ID is cleared (e.g. clearing site data, switching to a different device), the user can upvote again. That's expected behavior, not a bug — write it up only if upvotes seem to multiply without that.

---

### TC-07 · 280-character limit
1. Paste this 281-char string into the textarea:
   ```
   aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab
   ```

✅ Expected:
- Counter under textarea turns red and shows `281 / 280`.
- Textarea border turns red.
- Submit button is disabled.

---

### TC-08 · Empty / whitespace-only submission blocked
1. Clear the textarea and tap submit. Then type only spaces and try submit.

✅ Expected:
- Submit button is disabled in both cases.
- No question is created.

---

### TC-09 · 30-second cooldown
1. Submit a valid question.
2. Immediately try to submit another.

✅ Expected:
- Button shows `Wait 29s`, `Wait 28s` … counting down to `0`.
- After the cooldown, button re-enables and reads `Submit anonymously`.
- A second valid question can be submitted normally.

> The cooldown is per-tab and resets on page reload — that's a known limitation, not a bug.

---

### TC-10 · LED display view
1. On a laptop or large screen, open `/sessions/panel-1/qa/display`.

✅ Expected:
- **No bottom navigation, no header banner** — full black background, gold accents.
- Top: panel title in large Anton font + `AUDIENCE Q&A · LIVE` label.
- Top-right: a **gold QR code** that scans to `/sessions/panel-1/qa`.
- Body: top 10 questions sorted by upvotes (highest first). The #1 question is visually larger / highlighted gold; #2–10 smaller.
- Footer: total question count + summit branding.

---

### TC-11 · LED display reflects live changes
1. Keep the display view open on the laptop.
2. From a phone, submit a new question.

✅ Expected:
- The new question appears on the LED screen within ~2 seconds, no manual refresh.
- Upvoting from the phone causes the question to reorder live on the LED screen.

---

### TC-12 · QR code links back to submit page
1. From the LED display view, scan the QR code with a phone camera.

✅ Expected:
- The phone opens `/sessions/panel-1/qa` (same panel ID — not a different panel).
- The submit form is usable from the phone.

---

### TC-13 · Empty state on LED display
1. Open `/sessions/panel-2/qa/display` (assuming panel-2 has no questions yet).

✅ Expected:
- Display shows `BE THE FIRST TO ASK` in large gold Anton font + `Scan the QR code to submit a question.` underneath.
- Footer reads `0 questions submitted`.

---

### TC-14 · 404 for non-panel sessions
Visit each of these — all must return **404 / Page not found**:

- `/qa/display` (no session id)
- `/sessions/qa/display` (still no panel id)
- `/sessions/opening-keynote/qa` (real session, but type=keynote)
- `/sessions/break-1/qa/display` (type=break)
- `/sessions/nonexistent-id/qa` (unknown id)

✅ Expected: 404 for all five.

---

### TC-15 · Entry point on session detail
1. Open `/sessions/panel-1` (the regular session detail page).

✅ Expected:
- A gold **"Open Q&A →"** button is visible near the top, in a gold-bordered card titled `AUDIENCE Q&A`.
- Tapping it navigates to `/sessions/panel-1/qa`.

2. Open `/sessions/opening-keynote`.

✅ Expected:
- **No** Q&A card / button is shown (it's keynote-only, not panel).

---

### TC-16 · PWA / installed mode
1. Add the app to home screen (iOS Safari "Add to Home Screen" or Chrome "Install").
2. Launch from the home-screen icon.
3. Navigate to `/sessions/panel-1/qa`.

✅ Expected:
- Submit + upvote work identically to the browser tab.
- Real-time sync works (test against another device).

---

### TC-17 · Offline behavior
1. With the audience `/qa` page loaded, turn on airplane mode.
2. Try submitting a question.

✅ Expected:
- Submission **fails silently** (no offline queue in v1) — button returns to enabled, but the question never appears.
- Existing questions remain visible (cached).
- Restoring connectivity → page must be refreshed for new questions to stream in.

> If you see a crash or white-screen here, that **is** a bug.

---

### TC-18 · Multi-panel isolation
1. Submit a question on `/sessions/panel-1/qa`.
2. Open `/sessions/panel-2/qa`.

✅ Expected:
- Panel 2's list is **independent** — it does not show panel 1's question.
- Each panel has its own isolated question pool.

---

## Reporting bugs

For each FAIL, capture:

- **TC ID** (e.g. TC-07)
- **URL** you were on
- **Device + browser** (e.g. iPhone 14 Safari, MacBook Chrome 130)
- **Steps to reproduce** (numbered, exact text typed)
- **What you expected** vs **what happened**
- **Screenshot or screen recording** (essential for layout / sync issues)
- **Browser console errors** if any (DevTools → Console tab)

Send to: the developer / Slack channel agreed with the team.

---

## Smoke-test priority order (if short on time)

If you only have 15 minutes, run these in order:

1. **TC-01** (basic submit works)
2. **TC-02** (real-time sync — the headline feature)
3. **TC-03** (upvote works)
4. **TC-10** (LED display renders)
5. **TC-12** (QR code on LED links back)
6. **TC-14** (non-panel routes 404)

Everything else is edge-case polish.
