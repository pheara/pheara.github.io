+++
date = "2016-04-12T15:46:01+02:00"
description = ""
keywords = []
title = "Teamrace with Specials"
draft = false
+++

<img src="/media/racetrackspecials/racing_all.png" class="figure">

TL;DR: A racing game, where you try to get your slowest team-member across the finish line first and can discover and do hidden jumping-and-bumping-challenges to activate special effects along the race track at the cost of occupying a team-member for a while. This is Wiktor Manczarski and my solution for the challenge to make a game with an easter-egg that is a distinct game itself.

<!--more-->

## Basic Game

<img src="/media/racetrackspecials/racing1.png" class="figure">

The basic game-play idea is taken from a fan-created game-mode of Project Gotham Racing as described in the [wikipedia article on emergent gameplay](https://en.wikipedia.org/wiki/Emergent_gameplay#Changing_game_objectives). This mode, called “cat and mouse” people play in two teams. In every team there’s one person with a very slow car. The team to get their slow-car across the finish line first, wins. To do this, the players with the fast cars need to ram the enemies slow-car to slow it down or even knock it off the road―all the while protecting their own slow-car.

## Hidden Game: Activating Specials

<img src="/media/racetrackspecials/racing2.png" class="figure">

As a hidden game-mode, there’s several locations along the racing track, where people can leave their cars to activate specials―if they find those spots. Examples ways of leaving the car would be:

* In a factory level: if you “fail” a jump and land on one of the conveyor belts, the driver gets picked up by a crane-claw.
* Crashing the car at high speed at a specific spot so that the driver gets thrown through the wind-shield
* Get flipped by monster
* Jump into teleporter-beam and get teleported out while car stays behind
* A garage or other parking spot where you can leave the car, reachable via:
    * A jump over a ramp out of the level at a specific point
    * A jump over a ramp at a cliff at a certain point
    * A camouflage net on a forest-map wall
    * Crashing through a window into a house

The huge trade-off should be, that the team sends a driver ahead to use on of these spots, looses them for attack and defense on the track. Also, timing is critical―drive ahead too early and lose time, drive ahead to late and you might be too late to activate the special. To increase the time-cost of activating the special, it should take a while to activate it. For this they need to go through a short jumping puzzle and knock a gatekeeper-boss off it’s platform. If multiple players rush for the special, they can knock each other off.

## Specials

<img src="/media/racetrackspecials/racing3.png" class="figure">

* Short-cuts
* Acceleration-strips
* (Moving) roadblocks that are dodge-able or circumventable.
* A tower that repeatedly targets and shoots at passing cars. Visual cues allow dodging the shots easily in a fast-car, but almost impossibly in a slow-car. Thus fast-cars should draw aggro away from their slow-car and ideally onto the enemy one.
* A teleporter that resets back to an earlier position or acts as a short-cut
* Pits
* Map zooms out to allow targeting an orbital laser.


For the special it turns out, that most buffs are more advantageous for the team who’s slow-car is behind and neutral if used by the leading team―e.g. a shortcut or acceleration strip stays activated for the slower team giving them the same advantage. Conversely agnostically harmful specials favor the leading team, as they can wait for their slow-car to pass-by it’s location before they activate it.

## Feedback during lecture

To make playing the slow-car more interesting, that player could be the only one to get a high-level tactical overview and thus a coordinator-role.

A game that requires eight players would be problematic during the demo at the end of the semester. It was suggested to make the slow-car an AI and only use two fast-cars per team, thus reducing the game to four players. This would even allow a couch-multiplayer.

## Variants

* Do laps? This allows reversing.
* More or less team-members
* More than two teams
* Get out anywhere and build stuff, basically turning this into a full-on tower-defense mode with all implications (e.g. resource-management)
* At maximum one person per team can leave their car. Choose the special to go for wisely.
* There’s one overall engineer-token, that’s needed for specials. It changes hands when you’re getting rammed.
* Alternative puzzles instead of jumping and bumping―e.g. logic puzzles.

## Other Game Ideas

* For leaving the level: abuse a “typical” glitch, also breaking the fourth wall in the process.
  * A hacking game alla [Dr. Eval](https://alexnisnevich.github.io/untrusted/) built into another single-player game.
  * Fall out of the map in a shooter. Now viewing the map from below, it turns into a jump’n’run, where you can stomp/head-butt opponents for some damage or coins
* A side-scrolling jump’n’run, that rotates 90° and then falls back into a over-the-shoulder racing game.
* A racing game where you leave the car or fall into a pond, get transformed into a frog and avoid getting run over (remotely like frogger)
* Based on a thought of Felix: A bullet-hell shooter where you can't shoot. You can kill enemies via friendly fire, playing the two factions against each other or via a place-swapping ability.
* A stealth game set to break-beat dubstep where you need to freeze under scrutiny and move otherwise. You play household electronics come to life.
* A coop where you’re playing a level in parallel but split in time, one person in the past, one in the future. The problem: only the past can influence the future. An interesting variant on this is [Super Time Force](https://www.youtube.com/watch?v=Uh4f30VVhbk))
* A stealth game but you’re playing the guards (Tropico?)
* Wiktor Manczarski’s idea: A stealth game, but you’re playing “randomness” (e.g. a radio that switches on to draw the attention of the guards away from the unwitting protagonist)
* visual novel but leave dialog somehow?
* A plattformer where the background can become the foreground, obstacles become space and vis-versa.
