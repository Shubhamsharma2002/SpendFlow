<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the SpendFlow Expo app. Here is a summary of all changes made:

- **`app.config.js`** (new) — Expo dynamic config that reads `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from environment variables and exposes them via `expo-constants` extras.
- **`.env`** (new) — Contains `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST`, added to `.gitignore` automatically.
- **`src/config/posthog.ts`** (new) — PostHog client singleton, configured via `Constants.expoConfig.extra`, with lifecycle event capture, batching, and debug mode.
- **`app/_layout.tsx`** — Wrapped the app with `PostHogProvider` (autocapture touches, manual screen tracking). Added `usePathname` + `useGlobalSearchParams` to call `posthog.screen()` on every route change.
- **`app/(auth)/sign-in.tsx`** — Tracks `user_signed_in` (with `posthog.identify`) on success and `sign_in_failed` on error. Both the password and MFA paths are covered.
- **`app/(auth)/sign-up.tsx`** — Tracks `email_verification_requested` when a code is sent, `user_signed_up` (with `posthog.identify` and `$set_once: first_signup_date`) on completion, and `sign_up_failed` on error.
- **`app/(tabs)/index.tsx`** — Tracks `home_viewed` on mount and `subscription_card_expanded` (with subscription name and billing info) when a card is opened.
- **`app/(tabs)/insights.tsx`** — Tracks `insights_viewed` on mount.
- **`app/(tabs)/settings.tsx`** — Tracks `settings_viewed` on mount.
- **`app/subscriptions/[id].tsx`** — Tracks `subscription_detail_viewed` with the subscription ID on mount.

## Events

| Event | Description | File |
|---|---|---|
| `user_signed_up` | User completes email sign-up and verification; account is created | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | User successfully signs in with email/password (or MFA) | `app/(auth)/sign-in.tsx` |
| `sign_in_failed` | Sign-in attempt failed (wrong password, unknown email, etc.) | `app/(auth)/sign-in.tsx` |
| `sign_up_failed` | Sign-up attempt failed (email in use, weak password, etc.) | `app/(auth)/sign-up.tsx` |
| `email_verification_requested` | User submitted sign-up form and a verification code was sent | `app/(auth)/sign-up.tsx` |
| `subscription_card_expanded` | User taps a subscription card on the home screen to expand its details | `app/(tabs)/index.tsx` |
| `subscription_detail_viewed` | User navigates to the subscription detail page | `app/subscriptions/[id].tsx` |
| `home_viewed` | User views the home/dashboard screen | `app/(tabs)/index.tsx` |
| `insights_viewed` | User views the Insights tab | `app/(tabs)/insights.tsx` |
| `settings_viewed` | User opens the Settings screen | `app/(tabs)/settings.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/407016/dashboard/1537032
- **Sign-up Conversion Funnel** (email verification → account created): https://us.posthog.com/project/407016/insights/MtXhiqD0
- **Sign-ups & Sign-ins Over Time** (daily trend): https://us.posthog.com/project/407016/insights/m9thBCg2
- **Auth Failure Rate** (sign-in + sign-up failures per day): https://us.posthog.com/project/407016/insights/ByPVwtQF
- **Home Engagement: Views vs Expansions** (DAU home vs DAU card expanded): https://us.posthog.com/project/407016/insights/DdlvNxqK
- **Feature Screen Adoption** (insights / settings / detail DAU): https://us.posthog.com/project/407016/insights/bKAxJoaW

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
