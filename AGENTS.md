<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All editable site settings (feature flags, contact values) live in src/config.ts; pages read from it so owners edit one file.
- Public forms insert directly from the browser into insert-only tables (RLS insert policy for anon); no public read access.
- Text with [BRACKETS] is rendered through the `T` helper so placeholders stay visible until replaced.
