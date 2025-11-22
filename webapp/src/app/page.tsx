"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Wand2 } from "lucide-react";

type ToneOption = {
  id: string;
  label: string;
  description: string;
};

const TONES: ToneOption[] = [
  {
    id: "تحليلي",
    label: "تحليلي",
    description: "يركز على تفكيك الموضوع وشرح علله ومآلاته.",
  },
  {
    id: "سردي",
    label: "سردي",
    description: "يحكي الفكرة على شكل قصة تتدرج في الزمن.",
  },
  {
    id: "إقناعي",
    label: "إقناعي",
    description: "يبني حججًا متتابعة لدعم وجهة نظر محددة.",
  },
];

const INTRO_PHRASES = [
  "من المفيد أن نبدأ بالإشارة إلى أن",
  "لعل أول ما يتبادر إلى الذهن عند تناول هذا الموضوع هو أن",
  "يشكّل هذا السؤال مدخلًا واسعًا لفهم أن",
  "في جوهر النقاش، يمكن القول بأن",
];

const DETAIL_PHRASES = [
  "ويتضح ذلك عند استحضار الأمثلة العملية التي تُظهِر تفاعلات متعددة بين العناصر المؤثرة، وهو ما يدفعنا إلى دراسة السياقات التاريخية والواقعية بعين ناقدة.",
  "ويُعزَّز هذا الفهم عندما نتتبّع التحولات المتراكمة عبر الزمن، إذ نعثر على روابط دقيقة تربط التفاصيل الصغيرة بالإطار العام بصورة متناسقة.",
  "ويبرز هنا دور العوامل الإنسانية والتنظيمية في آن واحد، حيث تتشابك الدوافع الفردية مع السياسات العامة لتشكيل صورة أوضح وأكثر تعقيدًا مما يبدو لأول وهلة.",
  "ويُظهر تتبّع الشواهد العلمية أن المسألة ليست مجرد نظرية مجردة، بل هي شبكة من القرارات والفرص التي تتفاعل في فضاء متغير باستمرار.",
];

const SUPPORT_PHRASES = [
  "هذا الاستنتاج لا يأتي بمعزل عن الواقع، بل ينبني على قراءة متأنية للمعطيات التي تتوزع بين دراسات ميدانية وممارسات يومية وأسئلة الجمهور الواسع.",
  "وليس بعيدًا عن ذلك، فإن مراجعة الآراء المتباينة تمنحنا مساحة للتأمل الهادئ في نقاط الالتقاء والاختلاف، الأمر الذي يثري التحليل ويمنع الانزلاق نحو التبسيط المخل.",
  "وفي خضم ذلك، تتضح قيمة التوازن بين النظرية والتطبيق، حيث يصبح النقاش أكثر عمقًا عندما نُخضعه لتجربة الواقع ونختبر نتائجه الفعلية.",
  "كما أن الإلمام بالمفاهيم الأساسية يمنح المتلقي قدرة على قراءة التطورات المتسارعة دون الوقوع في فخ الأحكام المتعجلة.",
];

const TRANSITION_PHRASES = [
  "من زاوية مكملة،",
  "على المنوال ذاته،",
  "وبالانتقال إلى جانب آخر،",
  "في سياق متصل،",
];

const TONE_INJECTIONS: Record<string, string[]> = {
  تحليلي: [
    "إذ تتشابك الأسباب والنتائج في سلسلة مترابطة تكشف عن ملامح غير مرئية للوهلة الأولى.",
    "ومتى ما قمنا بعزل المتغيرات الأساسية، ظهرت أمامنا صورة أوضح للمشهد الكلي.",
    "ولذلك يصبح التفكيك المنهجي ضرورة لفهم القضية دون الوقوع في استسهال التبسيط.",
  ],
  سردي: [
    "ويذكّرنا ذلك بمسار طويل من الأحداث التي مرّ بها الناس، حيث تتناوب لحظات الأمل والتحدي لتصنع حكاية لا تُنسى.",
    "وتروى في الأوساط الشعبية قصص عديدة تعكس الدروس المتراكمة جيلاً بعد جيل.",
    "ومن خلال سرد التفاصيل الصغيرة، نجد أن المشهد الكبير ينكشف ببطء كما لو كنا نقرأ فصول رواية.",
  ],
  إقناعي: [
    "فإذا أردنا ترجيح كفة المنفعة العامة، فإن الأدلة المتاحة تدفعنا بوضوح نحو هذا الخيار.",
    "وتشير المؤشرات الرقمية والشهادات الموثوقة إلى أن تبني هذا المسار يعود بأثر إيجابي ملموس.",
    "ولكي نكون منصفين، فإن ترك الباب مواربًا أمام التأويلات يضعف الحجة، لذا فإن الحسم بات مطلوبًا.",
  ],
};

const CLOSING_PHRASES = [
  "وفي ضوء كل ما سبق، يغدو التريث في إصدار الأحكام خطوة أساسية تمنحنا رؤية أوسع وأعمق.",
  "لذلك، فإن التعامل مع القضية بروح مسؤولة ومنفتحة يفتح آفاقًا جديدة للابتكار والفهم المتبادل.",
  "وعليه، فإن الاستثمار في المعرفة والتجربة المشتركة يبقى الخيار الأنجع لضمان أثر مستدام.",
  "ختامًا، يمكن القول إن استيعاب الأبعاد المتعددة للسؤال يضمن إجابة طويلة، لكنها دقيقة ومشبعة بالمعنى.",
];

const EXAMPLES = [
  "كيف يمكن للمدارس تحسين مهارات القراءة لدى الطلاب في المرحلة الابتدائية؟",
  "ما أثر التحول الرقمي على الشركات الصغيرة في العالم العربي؟",
  "لماذا تتباطأ المدن في تبني حلول النقل المستدام؟",
];

function hashString(input: string) {
  if (!input.trim()) return 7;
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickFrom<T>(items: T[], seed: number, shift: number) {
  if (items.length === 0) return undefined;
  const index = (seed + shift) % items.length;
  return items[index];
}

function sentenceCase(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateLongAnswer(
  question: string,
  tone: ToneOption,
  paragraphs: number
) {
  const trimmedQuestion = question.trim();
  const seed = hashString(trimmedQuestion + tone.id + paragraphs.toString());

  const intro = `${pickFrom(INTRO_PHRASES, seed, 0)} ${trimmedQuestion || "هذا الموضوع"} بحاجة إلى قراءة هادئة تتبع مساراته المتشابكة بعناية.`;
  const closing = pickFrom(CLOSING_PHRASES, seed, 5);

  const toneSlices = TONE_INJECTIONS[tone.id] ?? [];
  const body: string[] = [];

  for (let i = 0; i < paragraphs - 2; i += 1) {
    const connector = pickFrom(TRANSITION_PHRASES, seed, i + 1);
    const detail = pickFrom(DETAIL_PHRASES, seed, i + 2);
    const support = pickFrom(SUPPORT_PHRASES, seed, i + 3);
    const toneLine =
      toneSlices.length > 0
        ? pickFrom(toneSlices, seed, i + 4)
        : "وتتداخل الطروحات المختلفة لصياغة رؤية أكثر شمولًا.";

    body.push(
      sentenceCase(
        `${connector} ${detail} ${toneLine} ${support}`.replace(/\s+/g, " ")
      )
    );
  }

  const paragraphsContent = [intro, ...body, closing].filter(Boolean);

  return paragraphsContent.join("\n\n");
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [tone, setTone] = useState<ToneOption>(TONES[0]);
  const [paragraphs, setParagraphs] = useState(4);
  const [answer, setAnswer] = useState("");
  const [copied, setCopied] = useState(false);

  const example = useMemo(() => {
    const index = hashString(answer || question) % EXAMPLES.length;
    return EXAMPLES[index];
  }, [answer, question]);

  const handleGenerate = () => {
    const generated = generateLongAnswer(question || example, tone, paragraphs);
    setAnswer(generated);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!answer) return;
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (error) {
      console.error("copy failed", error);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-10">
      <header className="rounded-3xl bg-gradient-to-br from-purple-200/70 via-rose-200/60 to-sky-200/70 p-8 text-right shadow-lg shadow-purple-200/40">
        <p className="text-sm text-purple-900/80">مولّد الإجابات المطولة</p>
        <h1 className="mt-3 text-3xl font-bold text-purple-950 sm:text-4xl">
          صِغ إجابة طويلة وواضحة في دقائق معدودة
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-purple-950/70">
          ادخل سؤالك أو موضوعك، حدّد النبرة والأسلوب، ودع المحرّك يبني لك
          إجابة ثرية بالتفاصيل والجمل الانتقالية بحيث تبدو متوازنة ومدعومة
          بالأمثلة.
        </p>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section className="flex flex-col gap-6 rounded-3xl border border-purple-100 bg-white/70 p-6 shadow-lg backdrop-blur">
          <label className="flex flex-col gap-2 text-right">
            <span className="text-sm font-semibold text-purple-900">
              ما السؤال أو الموضوع؟
            </span>
            <textarea
              dir="rtl"
              className="min-h-[160px] resize-none rounded-2xl border border-purple-200 bg-white px-4 py-3 text-right text-base leading-7 text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              placeholder={example}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </label>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-purple-900">
              اختر النبرة
            </span>
            <div className="flex flex-col gap-3">
              {TONES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTone(option)}
                  className={`rounded-2xl border px-4 py-3 text-right transition ${
                    tone.id === option.id
                      ? "border-purple-500 bg-purple-100/80 text-purple-900 shadow-sm"
                      : "border-purple-200 bg-white text-purple-900/80 hover:border-purple-300"
                  }`}
                >
                  <span className="text-sm font-semibold">{option.label}</span>
                  <p className="mt-1 text-sm text-purple-900/70">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-semibold text-purple-900">
              <span>عدد الفقرات</span>
              <span>{paragraphs}</span>
            </div>
            <input
              type="range"
              min={3}
              max={7}
              step={1}
              value={paragraphs}
              onChange={(event) => setParagraphs(Number(event.target.value))}
              className="accent-purple-500"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-300 transition hover:bg-purple-500 hover:shadow-xl"
          >
            <Wand2 className="h-4 w-4" />
            أنشئ إجابة مطوّلة
          </button>
        </section>

        <section className="flex flex-col gap-4 rounded-3xl border border-purple-100 bg-white/60 p-6 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between text-right">
            <div>
              <h2 className="text-lg font-bold text-purple-950">النص الناتج</h2>
              <p className="text-sm text-purple-950/60">
                تتولد الفقرات تلقائيًا مع جمل وصل وتفاصيل داعمة.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-xs font-semibold text-purple-900 transition hover:border-purple-400 hover:text-purple-600"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> تم النسخ
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> نسخ
                </>
              )}
            </button>
          </div>

          <article className="h-full min-h-[340px] overflow-y-auto rounded-2xl border border-dashed border-purple-200 bg-gradient-to-br from-white to-purple-50 px-5 py-6 text-right text-base leading-8 text-purple-950 shadow-inner">
            {answer ? (
              answer.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-5 last:mb-0">
                  {paragraph}
                </p>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-purple-900/60">
                <Wand2 className="h-10 w-10" />
                <p>اكتب موضوعًا واضغط على زر الإنشاء لتحصل على إجابة مطولة.</p>
              </div>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}
