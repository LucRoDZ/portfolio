# Hero + project-card options

Open the two HTML files in a browser (they follow `prefers-color-scheme`).

- **A — Spec sheet** (`variant-a-spec-sheet.html`): narrow label column + 9-col body, sentence headline, metrics as a ruled 3-up row, projects as a ruled index.
- **B — Masthead** (`variant-b-masthead.html`): name as a giant masthead, headline + CTAs left, metrics as a stat table right, projects as image-led cards.

## Choice: A
1. The headline says what I ship; in B the name takes the space and the positioning becomes secondary — recruiters already know the name from the CV.
2. A's 3/9 split and ruled index read like engineering documentation, which is the brief; B's masthead reads like a magazine cover.
3. Metrics sit full-width under the hero in A, so on mobile they are the second thing you see, not a sidebar pushed below the fold.
4. A ruled index scales to 4 featured + 8 smaller projects; B's image cards need real screenshots I don't have yet (diagrams fill that slot in A).
5. B's 9rem name at 320 px forces clamp tricks and still wraps badly; A degrades to a single column cleanly.
