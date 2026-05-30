# Systems Thinking Board Game

This is a static, browser-based classroom board game for systems-thinking discussion. One instructor or student shares the screen and acts as game master: they roll the die, move the active player/team, open cards, and advance turns.

The game is not online multiplayer. It runs in one browser session and uses only plain HTML, CSS, and vanilla JavaScript.

## How to open locally

Open `index.html` in a web browser. No install step, server, account, or build tool is required.

## How to publish on GitHub Pages

1. Put `index.html`, `styles.css`, `app.js`, and `README.md` in a GitHub repository.
2. In the repository settings, open **Pages**.
3. Choose the branch that contains these files.
4. Save the Pages setting and open the published URL when GitHub provides it.

## Where to edit things

Board colors are in `app.js` in the `boardColors` array.

Movement rules are in `app.js` in the `applyLandingEffect` function.

Blue and green card decks are in `app.js` in the `blueCards` and `greenCards` arrays.

Default player tokens are in `app.js` in the `defaultTokens` and `defaultNames` arrays.

Visual styling is in `styles.css`.

## Non-chaining movement rule

When a player rolls and lands on a space, only that original landing space applies its effect. For example, if the player lands on blue, the game opens a blue card and moves that player forward 2 spaces. If the new space is green, red, yellow, blue, or purple, that new space does not trigger another effect.

## Game-master-controlled multiplayer

The app supports 2 to 6 players or teams in one browser window. The game master chooses the number of teams, optionally edits team names, and starts the game. The app tracks whose turn it is and shows every token on the board. The game master clicks **Next player** after a turn and any card discussion is complete.

## Future improvements

- Add printable card lists.
- Add optional custom board editor.
- Add keyboard shortcuts for the game master.
- Add an optional timer for classroom rounds.
- Add import/export for custom class decks.
