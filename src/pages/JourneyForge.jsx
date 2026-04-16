import { useMemo, useState } from 'react';

const guideOptions = [
  {
    name: 'Gandalf',
    title: 'The Pilgrim of Fire',
    blessing: 'reads the mood of a room before danger fully arrives',
    voice:
      'Gandalf keeps the company moving with patience, sharp timing, and the kind of hope that sounds stern before it feels kind.',
    opening:
      'At first light the company leaves under a sky the color of old silver, and Gandalf walks ahead as though he already knows which silence matters.',
    turning:
      'When the road begins to close around them, he answers fear with a measured word and a sudden flare that makes even stone seem willing to listen.',
    ending:
      'By the end of the road, everyone in the company has stood a little straighter than when they began, though none of them would admit it aloud.',
  },
  {
    name: 'Aragorn',
    title: 'The Hidden King',
    blessing: 'turns a frightened march into a disciplined passage',
    voice:
      'Aragorn makes the quest feel grounded, weathered, and practical, as if every mile has already been survived by someone worthy.',
    opening:
      'They leave without ceremony, just bootsteps, tightened straps, and Aragorn watching the edge of the horizon for the first mistake.',
    turning:
      'When the path splits between pride and survival, he chooses the harder road without drama and the company follows because his certainty feels earned.',
    ending:
      'The journey closes with weary hands and steadier hearts, the sort of ending that feels less like triumph and more like a vow kept.',
  },
  {
    name: 'Galadriel',
    title: 'The Lady of Light',
    blessing: 'lets the company see beyond what fear is trying to name',
    voice:
      'Galadriel brings a luminous stillness to the tale, turning each choice into something that feels both ancient and terribly immediate.',
    opening:
      'The company begins beneath pale leaves and reflected starlight, as though the forest itself has agreed to watch the first step in silence.',
    turning:
      'At the hour of deepest doubt, Galadriel offers not command but clarity, and the true shape of the road appears where moments earlier there had been only shadow.',
    ending:
      'When the company departs again, they do so marked by a quiet understanding that beauty can be a form of endurance.',
  },
  {
    name: 'Sam',
    title: 'The Faithful Heart',
    blessing: 'keeps the quest alive when grandeur stops being useful',
    voice:
      'Sam makes the story feel close to the ground, generous, stubborn, and much stronger than he first appears.',
    opening:
      'The journey starts with packed bread, a watchful glance back, and Sam carrying more than he meant to because it simply feels wrong not to help.',
    turning:
      'When the stronger spirits begin to fray, Sam answers with plain speech, warm hands, and the sort of loyalty that leaves no room for collapse.',
    ending:
      'The road ends not in spectacle but in care, with the company held together by someone who never once thought himself heroic.',
  },
];

const routeOptions = [
  {
    name: 'Moria',
    title: 'The Black Gates Below the Mountain',
    rhythm: 'tense and echoing',
    image:
      'every footstep carries twice, once through the hall and once through the nerves of the people inside it',
    pressure:
      'The dark does not rush them at once; it waits until everyone has time to imagine what may already be awake.',
    weather: 'cold stone, stale air, and a silence that feels occupied',
  },
  {
    name: 'Rohan',
    title: 'The Wind Roads of the Mark',
    rhythm: 'open and swift',
    image:
      'the plains move like a green sea, and the horizon keeps stepping back each time the company thinks it has finally reached it',
    pressure:
      'Speed becomes its own danger, because the party must decide quickly who they are before the land carries them into history.',
    weather: 'horsewind, wide sky, and the smell of rain crossing grass',
  },
  {
    name: 'Gondor',
    title: 'The White City Watch',
    rhythm: 'guarded and ceremonial',
    image:
      'stone terraces rise in layers, each one asking whether duty can remain noble after too many nights without sleep',
    pressure:
      'The company is never entirely alone; every chamber, wall, and stair seems to measure them against older standards.',
    weather: 'torchlight on pale walls, watch bells, and a constant sense of readiness',
  },
  {
    name: 'Ithilien',
    title: 'The Green Country in Hiding',
    rhythm: 'beautiful and uncertain',
    image:
      'the land looks gentle at a distance, but every branch seems to know how close the war has come',
    pressure:
      'The company must learn the difference between shelter and pause, because beauty here survives by remaining alert.',
    weather: 'soft leaves, running water, and danger tucked behind birdsong',
  },
];

const relicOptions = [
  {
    name: 'Palantir Shard',
    title: 'A broken seeing-stone',
    gift: 'brief glimpses of what lies ahead',
    cost:
      'Its visions sharpen instinct, but they also tempt the company to mistake knowledge for control.',
  },
  {
    name: 'Elven Brooch',
    title: 'A silver leaf-brooch',
    gift: 'quiet passage and grace under watchful eyes',
    cost:
      'It makes the company lighter on the road, though it also reminds them how fragile beautiful things can be.',
  },
  {
    name: 'Dwarven Map',
    title: 'A soot-marked working map',
    gift: 'clarity when roads branch or collapse',
    cost:
      'It solves practical problems brilliantly, but it cannot tell the company what sort of people they become while following it.',
  },
  {
    name: 'Ranger Torch',
    title: 'A weathered field torch',
    gift: 'warmth, courage, and one more hour of movement',
    cost:
      'Its light raises spirits immediately, though every flame is also an announcement to whatever waits nearby.',
  },
];

const JourneyForge = () => {
  const [guide, setGuide] = useState(guideOptions[0]);
  const [route, setRoute] = useState(routeOptions[0]);
  const [relic, setRelic] = useState(relicOptions[0]);

  const forgedJourney = useMemo(() => {
    const title = `${guide.title}: ${route.name} with the ${relic.name}`;
    const hook = `${guide.name} leads the company through ${route.title.toLowerCase()}, carrying ${relic.title.toLowerCase()} that offers ${relic.gift.toLowerCase()}.`;
    const paragraphOne = `${guide.opening} ${route.image.charAt(0).toUpperCase()}${route.image.slice(1)}. ${guide.voice}`;
    const paragraphTwo = `${route.pressure} ${guide.turning} ${relic.cost}`;
    const paragraphThree = `${route.weather.charAt(0).toUpperCase()}${route.weather.slice(1)} surrounds the final stretch, and ${guide.ending} The company remembers that the ${relic.name} offered ${relic.gift.toLowerCase()}, but ${guide.blessing} was the truer reason the journey held.`;

    return {
      title,
      hook,
      paragraphOne,
      paragraphTwo,
      paragraphThree,
    };
  }, [guide, relic, route]);

  const rerollJourney = () => {
    setGuide(guideOptions[Math.floor(Math.random() * guideOptions.length)]);
    setRoute(routeOptions[Math.floor(Math.random() * routeOptions.length)]);
    setRelic(relicOptions[Math.floor(Math.random() * relicOptions.length)]);
  };

  const downloadStoryAsPdf = () => {
    const printWindow = window.open('', '_blank', 'width=960,height=720');

    if (!printWindow) {
      return;
    }

    const html = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${forgedJourney.title}</title>
          <style>
            body {
              font-family: Georgia, 'Times New Roman', serif;
              background: #f8f3e7;
              color: #20160f;
              margin: 0;
              padding: 48px;
              line-height: 1.7;
            }
            .page {
              max-width: 760px;
              margin: 0 auto;
            }
            .eyebrow {
              letter-spacing: 0.3em;
              text-transform: uppercase;
              font-size: 12px;
              color: #8a5a1f;
            }
            h1 {
              margin: 18px 0 10px;
              font-size: 34px;
              line-height: 1.15;
            }
            p {
              margin: 18px 0;
              font-size: 18px;
            }
            .meta {
              margin-top: 28px;
              padding-top: 18px;
              border-top: 1px solid rgba(32, 22, 15, 0.15);
              font-size: 14px;
              color: #5e4937;
            }
          </style>
        </head>
        <body>
          <main class="page">
            <div class="eyebrow">Forged Journey</div>
            <h1>${forgedJourney.title}</h1>
            <p>${forgedJourney.hook}</p>
            <p>${forgedJourney.paragraphOne}</p>
            <p>${forgedJourney.paragraphTwo}</p>
            <p>${forgedJourney.paragraphThree}</p>
            <div class="meta">
              Guide: ${guide.name} | Route: ${route.name} | Relic: ${relic.name}
            </div>
          </main>
        </body>
      </html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.1),transparent_24%),radial-gradient(circle_at_20%_90%,rgba(16,185,129,0.08),transparent_22%)]" />
        <div className="absolute left-[10%] top-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[8%] top-44 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
            Story Workshop
          </span>
          <h1 className="mt-6 font-lotr text-5xl uppercase leading-none text-white [text-shadow:0_0_14px_rgba(251,191,36,0.2)] md:text-7xl">
            Shape a
            <span className="block text-amber-300">Journey of Your Own</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Choose a guide, a road, and a relic to generate a full Middle-earth inspired journey
            from your selections.
          </p>
        </header>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div className="grid gap-7">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Choose the guide
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {guideOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setGuide(option)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        guide.name === option.name
                          ? 'border-amber-400/50 bg-amber-400/10 text-white'
                          : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <p className="font-lotr text-xl text-amber-100">{option.name}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{option.voice}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.24em] text-slate-500">Pick the road</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {routeOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setRoute(option)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        route.name === option.name
                          ? 'border-sky-400/50 bg-sky-400/10 text-white'
                          : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <p className="font-lotr text-xl text-sky-100">{option.name}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{option.image}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.24em] text-slate-500">Choose the relic</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relicOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setRelic(option)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        relic.name === option.name
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-white'
                          : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <p className="font-lotr text-xl text-emerald-100">{option.name}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{option.cost}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(251,191,36,0.14),rgba(14,165,233,0.08),rgba(16,185,129,0.1))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.24em] text-slate-500">Forged story</p>
              <h2 className="mt-5 font-lotr text-4xl uppercase text-white md:text-5xl">
                {forgedJourney.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-amber-100/90 md:text-lg">
                {forgedJourney.hook}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Guide</p>
                  <p className="mt-3 font-lotr text-2xl text-amber-100">{guide.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Route</p>
                  <p className="mt-3 font-lotr text-2xl text-sky-100">{route.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Relic</p>
                  <p className="mt-3 font-lotr text-2xl text-emerald-100">{relic.name}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p className="rounded-[1.6rem] border border-white/10 bg-slate-950/35 px-5 py-4 text-base leading-8 text-slate-200">
                  {forgedJourney.paragraphOne}
                </p>
                <p className="rounded-[1.6rem] border border-white/10 bg-slate-950/35 px-5 py-4 text-base leading-8 text-slate-200">
                  {forgedJourney.paragraphTwo}
                </p>
                <p className="rounded-[1.6rem] border border-white/10 bg-slate-950/35 px-5 py-4 text-base leading-8 text-slate-200">
                  {forgedJourney.paragraphThree}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={rerollJourney}
                className="rounded-2xl border border-amber-300/30 bg-amber-300/15 px-6 py-3 text-sm uppercase tracking-[0.18em] text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-300/25"
              >
                Reroll story
              </button>
              <button
                onClick={downloadStoryAsPdf}
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm uppercase tracking-[0.18em] text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                Download as PDF
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JourneyForge;
