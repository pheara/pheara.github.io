+++
date = "2015-03-25T21:30:30+01:00"
draft = false
title =  "Board Game: Pillow Fight"
tags = ["Game Design"]

+++

Pillow Fight is our solution to the challenge to design a wargame without borders (in our case, even without deaths).

<!--more-->

# The Challenge - No Frontier

From "IRON DESIGNER CHALLENGE 5—WAR WITHOUT FRONTIERS", page 39:

<blockquote>In games featuring the teritorial acquisition dynamic, and especially in war-themed games, territories are rarely acquired through a comical foot race. They’re usually acquired through the death, regardless of how abstracted, of another player’s bits. As a result of that death, the player gets the other player’s territory. Whoever has the territory wins the war. Another common dynamic, “destroy the opposing side,” is used for games that don’t have territory.
For this exercise, however, you’ll be pushing yourself beyond those traditional borders. Simulate and resolve a Civil War battle without using territorial acquisition or destruction of all units on the enemy side as the primary gameplay dynamic.</blockquote>

<blockquote>ergänzung: in unter 30 Minuten spielbar, dafür muss es nicht unbedingt bürgerkrieg sein.</blockquote>


# The Process

We ([hirnsalat](http://hirnsalat.github.io/gameful-design/), [peacememories](http://peacememories.github.io/gameful-design/) and [m0ru](/)) met up last Thursday for a little brain-storming session. We already had a few concepts and mechanics-fragments beforehand:

![Scans of m0ru's sketchbook](/media/pillow_fight/sketchbook.png)

During the session we tried to explore the design space starting with different mechanics and themes as can be seen on the whiteboard directly below. The theme-based generators (in red) mostly focussed on military and/or political conflicts (e.g. "cyberwar", "spy game", "gerrymandering", "elections"). The mechanical ones (in green) started off with alternative win-conditions we could use. You can find them them below the center in the right half of the whiteboard. The most advanced cluster of mechanical and thematic fragments centered around an idea for modelling peace negotiations (at the whiteboard: starting at the bottom left and expanding towards the right and up). As backdrop for the negotiations a more or less automatic conflict would have pushed back and forth on the quickly sketched board that you can see. The goal would be to end the conflict, by negotiating a set of terms to which both sides generals (non-player characters / mechanics) can agree.

![Photo of whiteboard during initial brainstorming](/media/pillow_fight/brainstorming_whiteboard.png)

During our discussion we got inspiration from another colleague, who noted that all of the mechanics/themes we were talking about seemed rather depressing and cynical, which spawned the idea to go towards the other of that extreme of that spectrum - from "cute" to "stuffed animal" to "pillow" to "pillowfight". The mechanics we salvaged from various board-, pen and paper roleplaying and tabletop games, and radically simplified them, only adding each mechanic after careful consideration and being sure that it is necessary. For most of them we also did before/after playtests. On the whiteboard below you can see, that most never made it beyond the "optional" status.

![Whiteboard-picture created while refining "Pillow Fight"](/media/pillow_fight/final_whiteboard.png)

# Pillowfight - The Story

You're in your good friends rather large flat (some might call it a penthouse/villa) and going at it with their modest supply of pillows.

# Pillowfight - Rules

The game is playable from three players upwards.

## Setup

The game is played on a rectangular **board with a grid** on it (e.g. checkerboard, go-board,..), representing a room.
First, one player **sets up** the **walls** and **furniture** to provide cover.
Another player places the **pillows** on top of furniture or on the floor.
Finally, a third player decides **who goes first**.

Players place their characters, starting with the first player and continuing clockwise. The **characters** can be **placed anywhere** on the floor, though you might want to get some terrain between you and the other players.

## Playing a Turn

As with placing the characters, players take turns clockwise.
During a turn, you can take two actions, which can be either moving, picking up pillows or attacking.

### Moving

You can move across **three squares**, including diagonals, but you can only walk on the floor. No climbing on furniture please.

![Movement illustration/examples](/media/pillow_fight/movement.svg)

### Picking up a pillow

If a pillow is adjacent to your character or directly below you, you can pick it up, as long as you are not already carrying a pillow.

### Attacking

You can attack a player if you are **holding a pillow** and you are either standing next to them or there are no walls in the way.
Attacking is done by selecting a target and rolling a die. The targeted person can then defend by rolling another die. If you **roll** a **higher** number than them, you hit them and score a point.
You can only attack **once per turn**.

There are two ways of attacking an opponent:

**Pillow Swinging (Melee)**

If you stand next to a player you can hit them with your pillow directly. This lets you **keep your pillow**, but if you roll a 1 or 2, your **pillow gets torn** (and removed from the game).

**Pillow Throwing (Ranged)**

You can throw a pillow if there are no walls between you and your target (there's no range limitation). Your opponent might use cover to protect themselves from your throw (explained in the cover section).

When throwing, you **lose your pillow**. The pillow will either land **at your targets feet** or, if they don't have a pillow in their hand and roll a 5 or higher, **they catch it** - which is the same as picking up a pillow.

#### Cover

Cover can be used when defending against ranged attacks. There are two types of cover: walls and furniture. You need to **stand adjacent** to an object to get cover from it. If someone on the other side wants to throw at you: walls block attacks completely, but furniture only gives a -1 penalty on the attack roll. If you're standing close to or at at an edge of a wall or piece of furniture, look at the graphics below to see how well others can throw at you. The examples use a wall. In the case of furniture the areas marked "impossible" would give a -1 penalty instead.

To determine which squares you have cover from, look at the squares adjacent to you and expand the cover status orthogonally. If there is an object that grants cover directly below your character, you have cover from all squares below it. The same applies to all 8 directions.

Cover doesn't apply against pillow swinging (melee).

![Taking cover at behind a wall - being attacked - - illustration](/media/pillow_fight/cover_edge.svg)
![Taking cover at a corner of a wall - being attacked - illustration](/media/pillow_fight/cover_corner.svg)

![Throwing around corner - Illustration](/media/pillow_fight/cover_corner_reverse.svg)
![Throwing along wall - Illustration](/media/pillow_fight/cover_along_wall.svg)

## Victory Condition

The game ends when either a player lands **5 hits**, or when all the pillows have been destroyed.In the latter case, the player with the **most landed hits** wins.


# Pillowfight - Gameplay

Directly below you can see a photo of the game in the first few turns, the **pillows** (white checkers pieces) are spaced out relatively evenly, concentrating slightly on the **furniture** (pieces of paper with tables and couches on them). The long, blank pieces of paper represent **walls**. The colourful pieces are the **players**.

![Board during Early Game](/media/pillow_fight/early_game.jpg)

The **first-turn advantage** solves itself, as going first means you get to **throw first**, however people can react to you during setup and **pick starting locations that counter** yours (e.g. behind walls)

The following photo was taken at the end of our last playtest. Due to melee mechanic that allows for **pillows to tear**, almost all pillows were used up (except for the top right corner). We have included that mechanic **to fix "melee"**, which models hits with pillows where you keep holding them. The last part was what made it superior in almost all situations to throwing (and thus losing) your pillow. Before we introduced the mechanic, games consisted of people just piling somewhere on the map and taking turns to just roll the dice, thus forgoing the **game depth** that comes from **positioning** and **planning** with and around the use of **cover**. Now there's a definitive **trade-off** between melee and ranged that has to be evaluated for every situation, thus adding **choice**

![Board during Late Game](/media/pillow_fight/late_game.jpg)

We suggest playing the game with at least three players or factions, as this allows for the third party to exploit and thus break-up stale-mates between the first two. This ensures a dynamic gameplay. Also the possibilty for alliances somewhat counter-balances any inequalities from different skill-levels to imbalanced map setup.


# Pillowfight - Additional Optional Mechanics:

Sadly we didn't have the time to play-test the following (as ideas for those came only shortly before or while writing this documentation):

* full-defense action: gives +1; rebalance by weighing tie braker in favour of attacker
* catching also works in close-combat (is pillow theft then)
* melee blocking: having a pillow in defense gives +1
* 2-3 fragile objects, if they shatter the game ends
* drop back to d&d-style cover mechanics (they deal better with edge cases caused by walls)
