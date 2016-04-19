+++
date = "2015-04-22T18:00:00+02:00"
draft = false
title = "Concert: Battle for Gødtfrey"
tags = ["Game Design"]

+++

{{< youtube yB2xjIn_9JQ >}}

<!--more-->

# The Band

Our fictive persona-band, GØDTFREY, is a Viennese medieval folk metal/rock band founded in the year 2010. They remotely resemble bands like Schandmaul and InExtremo. They met each other in a pub during their time as students and released 2 EPs and 1 LP up until now.

Due to their themed album releases they are able to use the smartphone application to let the user enter an epic battle between the forces of light and evil that decide which course their concerts take.

They mostly play live concerts in smaller locations like the “Arena Wien” and the “WUK”.

Members:

* Bagpipes - Günther
* Drummer & Kettledrum - Wolfgang
* Violin - Julia
* Opera singer & C-Flute - Evelynn
* Bass Guitar - Johann
* Lute & E-Guitar - Alex-Wolfgang

# The Idea Explained

The fans attending the concert get a link via one of several ways (the ticket shop, the ticket, in front of the concert hall,...) that allows them to download the app and create an avatar. At the concert the persons position is triangulated and the avatar placed on a corresponding location on the screen.

Dancing causes the avatar to burst into moves of about the same intensity. As the fans continue to dance their individual avatars slowly charge up. After the avatar's reach a maximum capacity, with a clearly visible burst of energy they discharge into the main power bar.

The band has prepared two differently themed songs and stage settings. E.g.:

* **"good":** angelic singers voice, string instruments and flutes, blue stage lighting, artificial snow, etc.
* **"evil":** the singer growls, heavy e-guitare, red lighting, flamethrowers, etc.

Depending on which side the power bars balance is on, a band can flip the themes. Either live, if they're crazily prepared, between songs or only for the final song (which is the minimal effort on their end of things).

Not in the video but an interesting idea (that came with the help of the manager card): The measured dance-activity can be used to determine the songs that work well. Also the avatars could be used for merchantising ("your avatar and the band's avatars as a print") which could be gifted to the hardest rocking fans for free as an incentive.

# Analysis

A circular area chart mapping the solution on 6 metrics for audience participation<sup>[[1]](#ref1)</sup>:

<img src="/media/gameful_concerts/audience_participation_dimensions.jpg" alt="Circular area chart. See text below." />

See the [slides](https://owncloud.tuwien.ac.at/public.php?service=files&t=5b07f0b690f75bfcfe34b84be1b9cd5c&download) for their definition. Below, I'll go into the reason for the values we assigned:

* **Control Design Freedom (~0.3):** As the effect is tightly coupled to the story, it might not make much sense to control anything beyond the decision between the two different song-tracks and corresponding stage-effects. The positioning that's used for placing the avatars could be used to control other interactions (e.g. between specific avatars)
* **System Versatility (~0.7):** The setup of the positioning beacons and beamer might take a while in event-locations not already equipped with them, but not too long. For the mapping between auditorium and screen space to work well, the room should be roughly rectangular.
* **Audience Interaction Transparency (~1.0):** One's avatar should be uniquely identifiable by it's looks and relativ position on the screen. Stronger dancing causes stronger of the avatar (with pre-defined dance-moves) and the charge-effects are very visible and cause a clearly noticeable shift in power-bar. The midpoint is clearly marked and if the powerbalance passes it, the next song and it's stage effects change distinctively. All in all it should be very clear, in our perception, what effect one's dancing has on the show.
* **Audience Interaction Distribution (~1.0):** Most people will have a smartphone. Alternatively cheap dedicated hardware (e.g. wristbands) can be handed out, though these require an alternative way to create the avatar (e.g. terminals, one's homepc, a friend's smartphone)
* **Focus (~0.8):** The projection is behind the actual band and about as distracting as most other visual shows. The dancing itself should be the same as in other concerts.
* **Active / Passive Audience Affinity (~0.2):** Without a smartphone (or dedicated hardware if it's within the budget) there's no way to interact.

# Design Process

Directly after the lecture we **decided** on designing for a **folk metal band** similiar to Schandmaul/InExtremo. Due to a lack of time directly after the lesson, we agreed to meet again in a week.

Over the course of that week, I'd jotted down a few notes to my **notebook**:

<!-- thumbnail syntax isn't pretty :| -->
<a href="/media/gameful_concerts/notebook/1.png">
    <img src="/media/gameful_concerts/notebook/thumb/1.png">
</a>
<a href="/media/gameful_concerts/notebook/2.png">
    <img src="/media/gameful_concerts/notebook/thumb/2.png">
</a>
<a href="/media/gameful_concerts/notebook/3.png">
    <img src="/media/gameful_concerts/notebook/thumb/3.png">
</a>

We met at the Fachschaft Informatik. During the process that will be descriped below, we took notes in [**this titanpad**](https://titanpad.com/64PQ6Cx3Gq).

First we noted down which interactions already had come to mind from our experiences with rock and metal concerts, so as not to lose them:

* circle dances
* mosh pit
* wall of death
* condom baloons
* headbanging
* clapping
* if indoors: smartphone cam
* crowd-surfing
* das ruderboot
* inflatable shark
* foam cannon
* flamethrowers(!)
    * witch burning?

After that, we continued to the main excercise, LiveMAP.

## LiveMAP

This part contains my personal experience. To get [Florian's](http://salzstangerlman.tumblr.com/post/116855046536/aufgabe-3-livemap-feat-g-dtfrey) and [Rene's](http://gameful.renekoller.com/2015/04/22/week-3-livemap/) take on the process, check out their blogs.

We drew cards roughly in three rounds, then started converging. Occasionally the others swapped out their role-cards relatively early as they weren't very useful for them. I'd gotten the role-card/lense of creator (e.g. designer, programmer,...), which proved to be an okay enough starting point when thinking. However it mostly stayed in the background for me as the thought- and discussion-flow tended to quickly move away, staccatoesquly throwing out idea after idea, in a self-sustained tune. Thus in a way it
served it's purpose of providing a starting point.

I started the **first round** with the Motivation-card no. 9 - "Include someone for academic reasons". This cards meaning only became clearer after turning it. However I didn't get much time to ponder on the back-side, as my partners quickly burst out with some ideas on their own, that got a discussion started. In general this would prove to be somewhat of a theme in the process (see [below](#timetothink))

For the **second round** I kept my role (I liked it) and drew from the Interaction-deck the No 32, "consider interaction in terms of acoustics that is artificially generated". We quickly left the focus created by the cards and went (back?) to the previous stream of ideas. In this round a few of core ideas for the final concept emerged - namely:

* projecting avatars for the dancing people on a surface behind the band
* allowing the most enthusiastic dancer(s) to pick a song to be played (their favourite one?) or influence effects on the stage
* from the idea of wall-of-deaths: make it two factions dance-battling each other

The card kept laying in front of me throughout the rest of it's process. In the end, it had made it's way into the concept: Songs are arranged along two general accoustic themes (e.g. "angelic, etherical, beautiful" vs "demonic, hard, grungy"). The winning side swings the song selection in favour of their theme.

We decided that the theme-switches should be discrete in style (binary in fact) and time (only between songs). This allows the band to prepare the alternative songs and reduces the technical overhead of dealing with quickly changing accoustic settings. As a consequence, there's no improvisation involved, for which Metal (or most genres with lyrics and melody) tend to be badly suited in our perception. In the very least to us it seem to be very hard to pull off a seemless improvisation on
avariation variation of melody/scale in a song, let alone lyrics (see below).

The **third round** yielded me no23 from the Influence-deck: "Influence the content considering the lyrics." At this point we had relatively settled on the dance-battle idea. The card added "lyrics" to the the list of factors influenced by the winning dancers. This was also the point where we decided to allow people to select songs (instead of influencing them in real-time) for the reasons already discussed above.

After that we mainly refined the dance-battle concept. Most of the elements we'd use already had emerged by this point and fell into place now. Elements and decisions that emerged only at this point were:

* power-meter that pushes between the colors <code>|=====>|<========|</code>
* people should be able to choose their faction ahead of time (so they can rock for the same side as their friends, or oppose them in friendly competition)
* we'd use smartphones' gyroscopic sensors and triangulation capabilities as a base instead of other hardware, as they're cheap for the organizers (most people already have one). However this also means that we can't guarantee participation for everyone (unless the phones are complimented with throw-away wearables)
* customizing the avatar before-hand allows to find it on the projection
* avatars can be used for merchandising as well (your ava + the bands ava on prints). The hardest dancer(s) could be awarded with some of it for free.
* the intensity of dancing per song can be used to determine which songs appeal to the audience in that region.


Two issues in our process severly handicapped the cards' usefullness for us:

<a id="timetothink"></a>**Time to Think**: The phases of silence necessary to reflect on the cards tended not to last long enough (at least for me) to get any deeper value from them. Every time we got stuck and decided to go for another round of cards, we'd take a few moments to read them. Until someone would inevitably throw an idea into the ring and we'd return to a variation of the discussion from before or go off into a direction that had little to do with the cards i held. I think we should have set aside a fixed amount of time to reflect on the cards - or at least ask around if everyone's done with their
card - before starting the discussion for that round. I think this should be emphasized when teaching the method to first-timers.

<a id="skepticism"></a>**Skepticism**: The experience that conversations tended to diverge quickly from the cards focus might be attributed to a certain prevalent **skepticism of the method** in the team. For my part, I had never worked with design cards before (only with other association techniques, like using random magazine snippets). Also at several occassions before starting and in the early phase someone would voice that they felt restricted by the cards. This base mood might be the reason why we didn't get
into the cards much, respectively, they didn't play too large a role for us. However, I think, this factor should fade away if we would do more sessions with them. At least for me they proved worthwhile to explore further (with a few adaptions in our process)

In general I find the idea to use the cards' focus very appealing. Tools like these tend to direct the search of the design space away from the well trodden paths and over-done solutions (that we happened to use in this concept in the form of smartphone-apps using the gyroscopic sensors). For what they also proved very useful was viewing an already existing concept through a new facet / point of view.

# References

<ol>
    <li id="ref1"> Mazzanti, D. Zappi, V. Caldwell D. BrogniA., 2014. *Augmented Stage for Participatory Performances*. In Proceedings of the International Conference on New Interfaces for Musical Expression, pp. 29-34.
    </li>
</ol>
