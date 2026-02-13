document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // --- Scroll Animation ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.feature-card, .problem-item, .step').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- Language Switcher ---
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // Default Language
    const userLang = navigator.language || navigator.userLanguage;
    const defaultLang = userLang.startsWith('ko') ? 'ko' : (userLang.startsWith('en') ? 'en' : 'ja');
    // setLanguage(defaultLang); // Uncomment to auto-detect, currently defaulting to JA in HTML
});

const translations = {
    ja: {
        title: "LunaLog - 40代からのココロとカラダのリズムを整える",
        nav_features: "機能",
        nav_usage: "使い方",
        nav_download: "ダウンロード",
        hero_title_1: "ゆらぐ私を、",
        hero_title_2: "許してあげる。",
        hero_subtitle: "「なんとなく不調」は、あなたのせいじゃない。<br>40代からのココロとカラダ。10秒の記録で、もっと自分を好きになる。",
        problem_title: "こんな「モヤモヤ」、抱えていませんか？",
        problem_1: "理由もなくイライラして、自己嫌悪におちいる",
        problem_2: "「昔はこんなじゃなかったのに」と落ち込む",
        problem_3: "急な体調変化で、予定通りに動けない",
        problem_4: "誰にもわかってもらえない孤独感がある",
        problem_message: "それは、更年期に向けた「変化のサイン」かもしれません。<br>LunaLogは、そんな変わっていくあなたに静かに寄り添います。<br>「書く」ことで客観的になり、「知る」ことで安心する。<br>新しい自分との付き合い方、はじめませんか。",
        feature_title: "LunaLogが、心の常備薬になる理由",
        feature_1_title: "不調の「正体」に気づく",
        feature_1_desc: "「なんとなくダルい」を具体的な言葉に。<br>頭痛、むくみ、甘いものの欲求…<br>タグを選ぶだけで、あなたの体からのサインを記録できます。",
        feature_2_title: "今のあなたに必要な、優しい羅針盤",
        feature_2_desc: "不安定な周期や体調に合わせて。<br>「今は無理しなくていい時期ですよ」と、<br>AIが医学的根拠に基づいたアドバイスをそっと提案します。",
        feature_3_title: "「言わなくても伝わる」安心感",
        feature_3_desc: "パートナーや家族への説明は、ときには負担になるもの。<br>あなたの今の状態を、角が立たない言葉でシェア。<br>大切な人との関係を、もっと穏やかに。",
        step_title: "使い方は、深呼吸するようにシンプル",
        step_1_title: "記録する",
        step_1_desc: "気分のままにタップするだけ。<br>頑張らなくていい記録。",
        step_2_title: "気づく",
        step_2_desc: "グラフを見て<br>「波があるのが私なんだ」と知る。",
        step_3_title: "整う",
        step_3_desc: "アドバイスに耳を傾け<br>自分をいたわる時間を持つ。",
        cta_title: "もう、一人で抱え込まなくていい。",
        cta_desc: "あなたの手のひらに、一番の理解者を。",
        footer_privacy: "プライバシーポリシー",
        footer_terms: "利用規約",
        footer_contact: "お問い合わせ"
    },
    ko: {
        title: "LunaLog - 40대부터 시작하는 방・몸 리듬 관리",
        nav_features: "기능",
        nav_usage: "사용법",
        nav_download: "다운로드",
        hero_title_1: "흔들리는 나를,",
        hero_title_2: "용서해 주세요.",
        hero_subtitle: "이유 없는 부진은 당신 잘못이 아닙니다.<br>40대부터의 마음과 몸. 10초 기록으로 나를 더 사랑하게 됩니다.",
        problem_title: "이런 고민, 안고 계신가요?",
        problem_1: "이유 없이 짜증이 나고 자책하게 된다",
        problem_2: "예전 같지 않은 내 모습에 우울해진다",
        problem_3: "갑작스러운 컨디션 난조로 계획이 틀어진다",
        problem_4: "아무도 이해해주지 않는 외로움을 느낀다",
        problem_message: "그것은 갱년기를 향한 '변화의 신호'일지도 모릅니다.<br>LunaLog는 변화하는 당신 곁에 조용히 함께합니다.<br>'기록'하며 객관적으로 보고, '앎'으로써 안심하세요.<br>새로운 나를 만나는 방법, 시작해보세요.",
        feature_title: "LunaLog가 마음의 상비약이 되는 이유",
        feature_1_title: "부진의 '정체'를 깨닫다",
        feature_1_desc: "막연한 피로감을 구체적인 단어로.<br>두통, 부종, 단 것에 대한 욕구...<br>태그를 선택하는 것만으로 몸이 보내는 신호를 기록할 수 있습니다.",
        feature_2_title: "지금 당신에게 필요한 나침반",
        feature_2_desc: "불안정한 주기와 컨디션에 맞춰,<br>'지금은 무리하지 않아도 돼요'라고<br>AI가 따뜻한 조언을 건넵니다.",
        feature_3_title: "말하지 않아도 전해지는 안심",
        feature_3_desc: "파트너나 가족에게 설명하는 것이 부담스러울 때.<br>당신의 상태를 부드러운 말로 공유하세요.<br>소중한 사람과의 관계가 더 편안해집니다.",
        step_title: "사용법은 심호흡하듯 간단합니다",
        step_1_title: "기록하기",
        step_1_desc: "증상과 기분을 탭하기만 하면 끝.<br>애쓰지 않아도 괜찮습니다.",
        step_2_title: "알아차리기",
        step_2_desc: "그래프를 보며<br>'파도가 있는 게 나구나'라고 이해하기.",
        step_3_title: "가다듬기",
        step_3_desc: "조언에 귀 기울이며<br>나를 보살피는 시간을 가지기.",
        cta_title: "이제 혼자 끙끙 앓지 마세요.",
        cta_desc: "당신의 손안에, 가장 든든한 이해자가 되어드립니다.",
        footer_privacy: "개인정보 처리방침",
        footer_terms: "이용약관",
        footer_contact: "문의하기"
    },
    en: {
        title: "LunaLog - Tuning Mind & Body Rhythms from your 40s",
        nav_features: "Features",
        nav_usage: "How it works",
        nav_download: "Download",
        hero_title_1: "Forgive myself,",
        hero_title_2: "for wavering.",
        hero_subtitle: "Feeling 'off' isn't your fault.<br>Mind and body care for your 40s. Love yourself more with a 10-second log.",
        problem_title: "Do you feel this way?",
        problem_1: "Getting irritated without reason, then blaming yourself",
        problem_2: "Feeling depressed that you're 'not like you used to be'",
        problem_3: "Sudden physical changes disrupting your plans",
        problem_4: "Feeling lonely, like no one understands",
        problem_message: "These might be signs of change towards menopause.<br>LunaLog quietly stays by your side.<br>Objectify by 'writing', find peace by 'knowing'.<br>Start a new way of getting along with yourself.",
        feature_title: "Why LunaLog is your mental first-aid kit",
        feature_1_title: "Unmask your discomfort",
        feature_1_desc: "Turn vague fatigue into specific words.<br>Headaches, swelling, sugar cravings...<br>Simply select tags to record the signals from your body.",
        feature_2_title: "A gentle compass for who you are now",
        feature_2_desc: "Based on your unstable cycles and condition.<br>AI gently suggests, 'It's okay to take it easy now.'",
        feature_3_title: "Peace of mind without saying a word",
        feature_3_desc: "Explaining to partners/family can be a burden.<br>Share your status with gentle words.<br>Make relationships with loved ones calmer.",
        step_title: "Simple as taking a deep breath",
        step_1_title: "Record",
        step_1_desc: "Just tap symptoms and mood.<br>No need to try hard.",
        step_2_title: "Notice",
        step_2_desc: "See the graph and know,<br>'It's natural for me to have waves.'",
        step_3_title: "Tune",
        step_3_desc: "Listen to advice and<br>take time to care for yourself.",
        cta_title: "You don't have to carry it alone.",
        cta_desc: "The best understanding companion, right in your hand.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_contact: "Contact"
    }
};

function setLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            el.innerHTML = data[key]; // Use innerHTML to allow <br> tags
        }
    });

    // Update styling for active language if needed
    document.documentElement.lang = lang;
}
