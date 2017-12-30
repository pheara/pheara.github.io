+++
date = "2017-12-29T00:52:00+02:00"
title =  "User Research in a “New Age of Computing”"
tags = ["User Research Methods"]

+++

![alexa personal digital assitant](/media/urm/alexa.jpg)

This is my submission for the challenge report submission in the course user research methods. It tries to answer
the question about the use and role of user research in the "new age of
computing we are entering into".

<!--more-->

The "New Age of Computing"
==========================

> What about user research and the new age of computing that we are
> entering into? Is there still a role for user research?

I think a large part about the "uncertainty" of user researches role in
this purported new age of computing is related to the advances in
machine learning and artificial intelligence and a vision that these
could automate the gathering of data and design/generating of
interfaces. That or from a (mistaken assumption) that some interfaces
don't require design any more because they're e.g. using natural
language interfaces and everybody should be able to interact with any of
these by default.

"Not needing design" in natural language interfaces is relatively easily
refuted: The current variants still struggle with contextual information
and the inherent unpreciseness of human language, even for so trivial
things as "remind me later this week" <span class="citation">(Rong et
al. [2017](#ref-RongManagingUncertaintyTime2017))</span>. Also, in their
current state, they are -- in one aspect -- a step back to command line
interfaces: they require knowledge which commands are available and what
can be expected from the system. Lastly, their notorious problems with
accents have become quite famous <span class="citation">(*Scottish
Elevator With Voice Recognition*
[2017](#ref-ScottishElevatorVoice))</span>. All of these mean that
research on the context is required and design decisions made, that need
to be informed.

Another way of "not needing design" would be the scenario where a given
task is taken out of the users hands entirely, as is the vision for
autonomous cars. Even if the vision came to pass, there'd still be
interfaces -- e.g. specifying where the car should go -- as well as
system properties to design, that require knowledge about the people and
their context and thus user research. This should hold true, as long as
there are humans and technology as there always will be a point where
they interact. However, in any way, the current reality of
(semi-)autonomous cars is far from that, as these cars require constant
oversight and thoughtful ways of signaling and dealing with handover
<span class="citation">(van der Heiden, Iqbal, and Janssen
[2017](#ref-vanderHeidenPrimingDriversHandover2017))</span>. If these
aren't handled well, problems in the engine can easily lead to dangerous
situations <span class="citation">(Brown and Laurier
[2017](#ref-BrownTroubleAutopilotsAssisted2017))</span>.

The more probable scenario, but I'd argue still unlikely or at least
very far off future, is that research and design will be fully
automatized with the use of big data, modern machine learning and
extensive personalisation, adaptive interfaces-for-one as well as
procedural content generation and computational creativity. However, in
all of these cases the algorithms need massive tweaking of
meta-parameters, a careful selection of a training set, as well as an
integration with other interface methods (think of e.g. filtering and
sorting of Facebook-feed with the rest of Facebook-app and the
post-primitives). So in most cases, I'd argue these technologies are
better seen as tools during the research phase (e.g. most things that
fall under data science), as tools to build interfaces with (e.g.
recommender systems, procedural generation) or as features of the
artifact itself (e.g. online style-transfer on images[^1^](#fn1){#fnref1
.footnoteRef} that use deep neural networks in particular auto-encoders
in the background)

So, I'd argue that these technologies, just like the many others that
are currently developed (e.g. affordable VR/AR-HMDs) or already exist,
are either tools that aid research, aid design or are used as part of
the designed artifact or system itself.

Thus, I think the more interesting question about this "New Age of
Computing" is not *if* user research will still be a thing, but *what*
thing it -- and HCI-research in general -- should be in it, what role it
should play. This applies particularly in regard to the larger societal
issues arising around the use of designed technologies, e.g. the
vanishing of low-skill jobs due to automation, the digital divide,
power-dynamics and terrible work reality in crowd-work, filterbubbles
and their effect on democracy, algorithmic bias and accountability,
(mass) surveillance and manipulative design[^2^](#fn2){#fnref2
.footnoteRef}. In this regard, Ben Schneiderman <span
class="citation">([2017](#ref-ShneidermanGrandchallengesHCI))</span>
lists the following "Grand Challenges" for HCI (and thus user research
as integral part of it):

-   Develop a handbook of human needs
-   Shift from user experience to community experience
-   Refine theories of persuasion
-   Encourage resource conservation
-   Shape the learning health system
-   Advance the design of medical devices
-   Support successful aging strategies
-   Promote lifelong learning
-   Stimulate rapid interface learning \[e.g. via multilayer
    interfaces\]
-   Engineer new business models
-   Design novel input and output devices
-   Accelerate analytic clarity \[by utilizing big data\]
-   Amplify empathy, compassion, and caring
-   Secure cyberspace
-   Encourage reflection, calmness, and mindfulness
-   Clarify responsibility and accountability \[especially with
    autonomous machines\]

The Role of User Researchers
============================

> What is this role and how will it change? What could it contribute,
> what ways would it need to be adapted?

<span class="citation">Brownlee
([2016](#ref-BrownleeDesignJobsThat2016))</span> argues that a few roles
will fade out or lose in significance, will be split up or merged into
others, as well as some others will emerge: He argues that *UX Designer*
as a job description will be applied less often, as it's become a very
broad umbrella term anyway. Similarly, he thinks that *Design Research*
has become so fundamental for everyone, that they demand for people only
doing that might recede. Furthermore, in his opinion, visual designers
will (more) heavily rely on algorithms and procedural generation,
(Post-)Industrial designers will (need to) increasingly design
computerized products. As for new design- and research-jobs he points
out: the *virtual interaction designer*, the *specialist material
designer* (e.g. 3d printing and smart materials), the *algorithm- and
AI-design specialist*, the *design strategist* that informs
policy-makers, *organization designers*, and most and foremost all of
the above as freelancers.

John Brownlee isn't the only one pointing out the increasing integration
of novel algorithms with the design and research processes:

<span class="citation">Dove et al.
([2017](#ref-DoveUXDesignInnovation2017))</span> talks about the design
problems and challenges of machine-learning systems, studies how the
developer- and design-teams interact and especially points out a
lack/insufficiency of machine learning frameworks suited for rapid
prototyping by designers, the lack of material that explain the
possibilities and limits of ML to them and the unrefinedness from a
design-perspective of the "medium" (as can be seen e.g. in the many
problems digital personal assistants and speech interfaces in general
still struggle with).

I think extensive and rigorous user research (as part of design
iterations) might help somewhat with that unrefinedness. In general, it
could do this via study of which algorithms and parameters work for
which use cases, what their behaviours are, etc. In particular, on a
project level, user research can inform what good and bad example
generated artifacts are from which rules can be derived or against which
algorithm-parameters can be fine-tuned, i.e. the critical step in
designing generators <span class="citation">(Kompton
[2017](#ref-Komptonyouwantbuild))</span> and I'd argue machine learning
systems as well.

Thus for people doing user research, the new technologies could mean
additional tools for their belt as well additional subject matter to
research around.

As with the "new age" section above, I also think there's a more
interesting question here as well: instead of asking for the things that
"will" be, i.e. that can be said to happen with any degree of certainty,
there's the question of what their role (and tackled challenges) *could*
be, or even more so, *should* be.

As far as the challenges are concerened, I'd like to point to the
(societal) issues at the end of the [section
above](#the-new-age-of-computing) and by <span
class="citation">Shneiderman et al.
([2017](#ref-ShneidermanGrandchallengesHCI))</span>. In regard to these
I'd like to stress (user) researchers' role in informing policy-makers
to make responsible decisions on technology regulation, use and
development. On this Pargman et al <span class="citation">Pargman et al.
([2017](#ref-PargmanSustainabilityImaginedFuture2017))</span> write

> It should however be remembered that it is not uncommon in decision
> making to only refer to "what will happen" (for example "you can’t
> stop innovation so you shouldn't even try"), as if it was impossible
> to decide what future we want and try to influence events by working
> towards the realization of particular futures.

Pargman et al call these "will"-questions predictive scenarios and argue
for the use of explorative scenarios ("what can happen?") and normative
scenarios ("what should happen?") in the research informing
policy-decisions.

In regard to changing research methodology, some of Shneiderman's Grand
Challenges latter also argue for that and a change in the underlying
theory of doing user research itself, with an suggested increased focus
on instrumentalizing big data, as well as theories of human needs and
persuasiveness, and empathy, compassion, caring as well as community
experience. A trend that is already occuring is dropping the term "user"
in favor of a more general "human" to break up this power-structure and
broaden the horizon accordingly. Baumer et al <span
class="citation">Baumer and Brubaker
([2017](#ref-BaumerPostuserism2017))</span> pick this up by analyzing
the "user"-concept throughout the three waves and arguing for
post-userism, i.e. looking beyond the users represented in
system/data-structures, user-interfaces, design-processes as well as
design- and research-ideology. They point out five scenarios that the
classical user-concept wouldn't capture:

-   *indirection:* people interacting with system via others
-   *transience:* no distinction between multiple interactions by one or
    many persons, e.g. public displays
-   *multiplicity:* one person with multiple user-accounts for multiple
    roles
-   *absence:* e.g. people without an fb-account are still impacted by
    it
-   *hybrid:* some actors can be seen as in-between of organization, AI
    and human individual. for a very crude example: semi-automated
    customer service

Conclusion
==========

Concluding, I'd argue that, yes, user research will still play a role,
as long as there are humans interacting with and being influenced by
technology. The developments that constitute this "New Age of Computing"
should be seen as providing new tools for research, design, development
and as basis of build artifact, but also are technologies and method
from which new societal challenges arise, that need to be studied and
addressed.

References
==========

<div id="refs" class="references">

<div id="ref-BaumerPostuserism2017">

Baumer, Eric P. S., and Jed R. Brubaker. 2017. “Post-Userism.” In
*Proceedings of the 2017 CHI Conference on Human Factors in Computing
Systems*, 6291–6303. CHI ’17. New York, NY, USA: ACM.
doi:[10.1145/3025453.3025740](https://doi.org/10.1145/3025453.3025740).

</div>

<div id="ref-BrownTroubleAutopilotsAssisted2017">

Brown, Barry, and Eric Laurier. 2017. “The Trouble with Autopilots:
Assisted and Autonomous Driving on the Social Road.” In *Proceedings of
the 2017 CHI Conference on Human Factors in Computing Systems*, 416–29.
CHI ’17. New York, NY, USA: ACM.
doi:[10.1145/3025453.3025462](https://doi.org/10.1145/3025453.3025462).

</div>

<div id="ref-BrownleeDesignJobsThat2016">

Brownlee, John. 2016. “5 Design Jobs That Won’t Exist In The Future.”
*Co.Design*. September 1.
<https://www.fastcodesign.com/3063318/5-design-jobs-that-wont-exist-in-the-future>.

</div>

<div id="ref-DoveUXDesignInnovation2017">

Dove, Graham, Kim Halskov, Jodi Forlizzi, and John Zimmerman. 2017. “UX
Design Innovation: Challenges for Working with Machine Learning As a
Design Material.” In *Proceedings of the 2017 CHI Conference on Human
Factors in Computing Systems*, 278–88. CHI ’17. New York, NY, USA: ACM.
doi:[10.1145/3025453.3025739](https://doi.org/10.1145/3025453.3025739).

</div>

<div id="ref-Komptonyouwantbuild">

Kompton, Kate. 2017. “So You Want to Build a Generator….” *Kate
Compton*. Accessed December 29.
<http://galaxykate0.tumblr.com/post/139774965871/so-you-want-to-build-a-generator>.

</div>

<div id="ref-NguyenChinamightuse">

Nguyen, Clinton. 2017. “China Might Use Data to Create a Score for Each
Citizen Based on How Trustworthy They Are.” *Business Insider
Deutschland*. Accessed December 29.
<http://www.businessinsider.de/china-social-credit-score-like-black-mirror-2016-10>.

</div>

<div id="ref-PargmanSustainabilityImaginedFuture2017">

Pargman, Daniel, Elina Eriksson, Mattias Höjer, Ulrika Gunnarsson
Östling, and Luciane Aguiar Borges. 2017. “The (Un)Sustainability of
Imagined Future Information Societies.” In *Proceedings of the 2017 CHI
Conference on Human Factors in Computing Systems*, 773–85. CHI ’17. New
York, NY, USA: ACM.
doi:[10.1145/3025453.3025858](https://doi.org/10.1145/3025453.3025858).

</div>

<div id="ref-RongManagingUncertaintyTime2017">

Rong, Xin, Adam Fourney, Robin N. Brewer, Meredith Ringel Morris, and
Paul N. Bennett. 2017. “Managing Uncertainty in Time Expressions for
Virtual Assistants.” In *Proceedings of the 2017 CHI Conference on Human
Factors in Computing Systems*, 568–79. CHI ’17. New York, NY, USA: ACM.
doi:[10.1145/3025453.3025674](https://doi.org/10.1145/3025453.3025674).

</div>

<div id="ref-ScottishElevatorVoice">

*Scottish Elevator With Voice Recognition*. 2017. Burnsitown Comedy
Show. Accessed December 29.
<https://www.youtube.com/watch?v=BOUTfUmI8vs>.

</div>

<div id="ref-ShneidermanGrandchallengesHCI">

Shneiderman, Ben, Catherine Plaisant, Maxine Cohen, Steven Jacobs,
Niklas Elmqvist, and Nicholoas Diakopoulos. 2017. “Grand Challenges for
HCI Researchers | ACM Interactions.” Accessed December 22.
<http://interactions.acm.org/archive/view/september-october-2016/grand-challenges-for-hci-researchers>.

</div>

<div id="ref-vanderHeidenPrimingDriversHandover2017">

van der Heiden, Remo M.A., Shamsi T. Iqbal, and Christian P. Janssen.
2017. “Priming Drivers Before Handover in Semi-Autonomous Cars.” In
*Proceedings of the 2017 CHI Conference on Human Factors in Computing
Systems*, 392–404. CHI ’17. New York, NY, USA: ACM.
doi:[10.1145/3025453.3025507](https://doi.org/10.1145/3025453.3025507).

</div>

</div>

<div class="footnotes">

------------------------------------------------------------------------

1.  <div id="fn1">

    </div>

    e.g. <https://deepart.io/>[↩](#fnref1)

2.  <div id="fn2">

    </div>

    for a very extreme case see Sesame Credit, a system heavily relying
    on gamification and operand conditioning, where friends with bad
    ratings pull you down with them, and where those ratings could soon
    determine access to jobs, social security, visa, etc <span
    class="citation">(Nguyen
    [2017](#ref-NguyenChinamightuse))</span>[↩](#fnref2)

</div>

