# Vecosoft — Assessment Submissions

Each task lives in its own folder. Open a folder's README for that task's full details, design notes, and setup/run instructions.

## [task1-order-tracking/](task1-order-tracking/) — Task 1: Order Tracking Screen

A mobile order tracking screen (HTML/CSS/JS, no build step) covering the delayed, delivered-but-not-received, and tracking-not-available-yet states, plus a light/dark background toggle. See [task1-order-tracking/README.md](task1-order-tracking/README.md) for the live demo link and how to run it locally.

## [task2-lru-cache/](task2-lru-cache/) — Task 2: LRU Cache

A Least Recently Used cache (Node.js) with `get`/`put` in O(1) average time, plus optional TTL/expiration support. See [task2-lru-cache/README.md](task2-lru-cache/README.md) for the data structure explanation, complexity analysis, and how to run the tests/example.

## AI usage disclosure

AI tool used: **Claude Code** (Anthropic), running Claude Sonnet 5, in a single continuous session. No other AI tool was used for this assessment.

### Complete prompt history

Every prompt sent to Claude Code in this session, verbatim, in the exact order sent. Where a message included an image attachment with no accompanying typed text, that is noted instead of the (nonexistent) text.

1. "go through this, I'll give you 4 individual tasks" *(with 2 screenshots of the assessment's general instructions)*
2. "I added github"
3. "this is the first task." *(with 2 screenshots of Task 1's brief)*
4. "I'll deploy it myself, there are some changes that needs to be done"
5. "do not use dark backgroud. use light background then add an option to change the background. also you created it directly 360-430 px. this is supposed to be the responsive design size. but first it should it not be available for version?"
6. "this is the second task, can i use this repo or do i need a separate repo for this. do not do anything now" *(with 2 screenshots — these were accidentally duplicate Task 1 screenshots)*
7. "t 2" *(with 2 screenshots of Task 2's brief)*
8. "this is the second task, can i use this repo or do i need a separate repo for this. do not do anything now"
9. "for the first task, create a separate branch and then push and merge the contents"
10. *(1 screenshot of Task 4's brief — Figma/UI Design, optional — with no accompanying typed text)*
11. "do urself"
12. "remove all the co authered by claude in the commits"
    - Follow-up clarifying question from Claude ("rewrite and force-push all 3 branches?") — answered by selecting: "Yes, rewrite and force-push"
13. "now add in the main readme.md that each folder has their respective task details with setup actions"
14. "use /anthropic-skills:frontend-design for the design of task 1"
15. "commit push, do not say co authered by claude"
16. "where is the main readme, i cant see"
17. "default main"
18. "do not use this green color for the actions"
    - Follow-up clarifying question from Claude ("what color instead?") — answered by selecting: "Charcoal/black"
19. "same for the selected tabs too"
20. "delivery progress part too"
21. "push and merge"
22. The mandatory AI-prompt-history disclosure instructions (this task), ending with "qin the readme" — which produced this section.

### Complete prompt history — Task 2 & Task 3 session

AI tool used: **Claude Code** (Anthropic), desktop app. Prompts below are verbatim, in the exact order sent, for the session covering Task 2 and Task 3.

1. "I have given you task 2, there is a folder created for task 2. do there" *(with 4 screenshots attached showing assessment general instructions, Task 2 — LRU Cache spec, and requirements)*
2. "create a new branch then push and merge. do not add co authored by claude anywhere"
3. "this is the task 3" *(with 1 screenshot attached showing Task 3 — Algorithm Explanation & Critical Thinking spec)*
4. "For your submission screenshot, please run these yourself in a terminal so you have a genuine screenshot to attach (I can't capture your terminal output as an image):

   ```
   node lruCache.test.js
   ```

   ```
   node example.js how to check
   ```"
5. "what else do i need" *(with 1 screenshot attached showing terminal output of running `node lruCache.test.js` and `node example.js`)*
6. "If you use ANY AI tool during the assessment, you must submit the COMPLETE prompt history for EVERY AI tool used.
   You must include:
   * Every prompt, question, instruction, or request sent to AI
   * In the exact order it was sent
   * No omitted prompts
   * No rewritten prompts
   * No combined prompts
   * No summarized prompts
   * Prompts from every AI tool used

   If possible, provide an exported/shared conversation link accessible without login. Otherwise, paste the complete prompt history into your submission.
   give" *(with 1 screenshot attached showing the submission form with GitHub Repository and Output Screenshot fields)*
