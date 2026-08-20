(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  /* ===== STEP 1 ===== */
  const DIKW = [
    { en: 'Data', ja: 'データ', d: '事実や数値そのもの。意味づけはされていない。' },
    { en: 'Information', ja: '情報', d: 'データを整理・比較して意味をもたせたもの。' },
    { en: 'Knowledge', ja: '知識', d: '情報を積み重ね、体系化して法則やしくみとして理解したもの。' },
    { en: 'Wisdom', ja: '知恵', d: '知識をもとに、状況に応じて判断し行動に生かす力。' }
  ];
  const SORT = [
    { t: '2024年のある日の気温を測定したところ31.0℃であった。', a: 'データ', why: '測っただけの数値そのものです。' },
    { t: '2024年の世界の平均気温は15.1℃で過去最高を記録し、前年よりも0.2℃上昇している。', a: '情報', why: '複数のデータを比較して「過去最高」「0.2℃上昇」という意味をもたせています。' },
    { t: '1950年以降の100年間で、地球の平均気温は大幅に上昇する見込みである。', a: '知識', why: '長期のデータから導かれた、体系化された理解です。' },
    { t: '地球温暖化対策として、再生可能エネルギーの導入や脱炭素技術の開発などの対策が求められている。', a: '知恵', why: '知識をもとに、どう行動すべきかを判断しています。' }
  ];
  const SCH = ['データ', '情報', '知識', '知恵'];
  let sAns = {};
  function drawDIKW(hi) {
    $('dikwBox').innerHTML = DIKW.map(d =>
      '<div class="l' + (hi === d.ja ? ' on' : '') + '"><div class="en">' + d.en + '</div><div class="ja">' + d.ja + '</div><div class="d">' + d.d + '</div></div>').join('');
  }
  function drawSort() {
    $('sortBox').innerHTML = SORT.map((s, i) =>
      '<div style="border:1px solid var(--line);border-radius:3px;padding:10px 12px;margin-bottom:8px">' +
      '<div style="margin-bottom:8px">' + s.t + '</div>' +
      '<div class="choice4" data-i="' + i + '">' + SCH.map(c =>
        '<button class="btn" data-i="' + i + '" data-c="' + c + '" style="text-align:center">' + c + '</button>').join('') + '</div>' +
      '<div class="note" id="sfb' + i + '" hidden style="margin-top:8px"></div></div>').join('');
    $('sortBox').querySelectorAll('button[data-c]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i, s = SORT[i], ok = b.dataset.c === s.a;
      const row = $('sortBox').querySelector('.choice4[data-i="' + i + '"]');
      row.classList.add('locked');
      [...row.children].forEach(x => { if (x.dataset.c === s.a) x.classList.add('correct'); else if (x === b) x.classList.add('wrong'); });
      const fb = $('sfb' + i); fb.hidden = false; fb.className = 'note ' + (ok ? 'ok' : 'ng');
      fb.innerHTML = '<strong>' + s.a + '</strong>　' + s.why;
      drawDIKW(s.a);
      sAns[i] = ok;
      const done = Object.keys(sAns).length, right = Object.values(sAns).filter(Boolean).length;
      const n = $('sortNote');
      n.className = 'note ' + (done === SORT.length ? (right === done ? 'ok' : 'warn') : 'info');
      n.innerHTML = done + ' / ' + SORT.length + ' 問（正解 ' + right + ' 問）' +
        (done === SORT.length ? '<br>この4つが、そのまま本文の問1の選択肢⓪〜③にあたります。「情報」は<strong>データに意味づけをしたもの</strong>です。' : '');
    }));
    $('sortNote').className = 'note info'; $('sortNote').textContent = '0 / ' + SORT.length + ' 問';
  }

  /* ===== STEP 2 ===== */
  function drawSpread() {
    const k = +$('shareN').value, st = +$('steps').value;
    $('shareNV').textContent = k; $('stepsV').textContent = st;
    let total = 1, cur = 1; const arr = [1];
    for (let i = 1; i <= st; i++) { cur *= k; total += cur; arr.push(cur); }
    const max = Math.max.apply(null, arr);
    $('spreadBox').innerHTML = arr.map((v, i) =>
      '<i style="height:' + Math.max(2, v / max * 100) + '%"><span>' + (i === 0 ? '最初' : i) + '</span></i>').join('');
    $('reachV').textContent = total.toLocaleString() + ' 人';
    const n = $('spreadNote');
    n.className = 'note ' + (total > 10000 ? 'ng' : 'info');
    n.innerHTML = '1人が ' + k + ' 人に伝え、それが ' + st + ' 段階くり返されると <strong>' + total.toLocaleString() + ' 人</strong>に届きます。' +
      (total > 10000 ? '　<strong>これだけ広がった情報を、あとからすべて消すことはできません。</strong>' : '　段階を増やしてみてください。');
  }
  function drawCharTable() {
    $('charTable').innerHTML = '<thead><tr><th>特性</th><th>意味</th><th>気をつけること</th></tr></thead><tbody>' +
      '<tr><td><strong>残存性</strong></td><td>いちど発信された情報は消えずに残る。</td><td>削除しても、すでに保存・転載されたものは残る（デジタルタトゥー）。</td></tr>' +
      '<tr><td><strong>複製性</strong></td><td>簡単に、劣化せずコピーできる。</td><td>コピーされた時点で、発信者は管理できなくなる。</td></tr>' +
      '<tr><td><strong>伝播性</strong></td><td>速く、広く伝わる。</td><td>意図しない範囲まで一気に広がる（STEP 2 の計算）。</td></tr></tbody>';
  }

  /* ===== STEP 3 ===== */
  const HEADS = [
    { h: '本校生徒の6割超が「朝食は毎日」', b: '調査の結果、100人中62人が毎日朝食をとっていることが分かった。', n: ['info', '数値をそのまま伝えた、比較的中立な見出しです。'] },
    { h: '衝撃　4割近くが朝食を抜く日あり', b: '調査の結果、100人中38人に朝食を食べない日があることが判明した。', n: ['warn', '同じ調査でも、<strong>少数のほうに注目し「衝撃」という語を加える</strong>と、深刻な問題のように見えます。事実は変わっていません。'] },
    { h: '朝食習慣、依然として定着せず', b: '毎日朝食をとる生徒は62人にとどまった。', n: ['warn', '「とどまった」という語が、<strong>62人を少ないと評価する主観</strong>を加えています。'] }
  ];
  function drawHead(i) {
    $('headBox').innerHTML = '<div class="headline"><div class="h">' + HEADS[i].h + '</div><div class="b">' + HEADS[i].b + '</div></div>';
    const n = $('headNote'); n.className = 'note ' + HEADS[i].n[0]; n.innerHTML = HEADS[i].n[1];
  }

  function init() {
    drawDIKW(''); drawSort(); drawSpread(); drawCharTable(); drawHead(0);
    ['shareN', 'steps'].forEach(i => $(i).addEventListener('input', drawSpread));
    document.querySelectorAll('button[data-h]').forEach(b => b.addEventListener('click', () => drawHead(+b.dataset.h)));
    Quiz.choice('q1Box', 'q1Note', [
      { k: 'ア', q: 'DIKWモデルにおける「情報」に関する記述として最も適当なものは',
        ch: ['2024年の世界の平均気温は15.1℃で過去最高を記録し、前年よりも0.2℃上昇している', '2024年のある日の気温を測定したところ31.0℃であった', '1950年以降の100年間で、地球の平均気温は大幅に上昇する見込みである', '地球温暖化対策として、再生可能エネルギーの導入や脱炭素技術の開発などの対策が求められている'],
        a: 0, why: '①は測っただけの「データ」、②は体系化された「知識」、③は判断・行動にあたる「知恵」です。⓪だけが、データを比較して意味づけした「情報」になっています。' }
    ], '本文の答えは【ア】⓪ です。');
    Quiz.choice('q2Box', 'q2Note', [
      { k: 'イ', q: '情報の特性についての記述として最も適当なものは',
        ch: ['情報は複製を繰り返すと、やがて元の内容が失われることがあるので、その取り扱いには慎重になるべきである', 'インターネット上での投稿が、発信者の意図に関係なく拡散することがあり、拡散されたすべての情報を削除することは困難である', '信ぴょう性の高い情報であればあるほど、拡散されやすい特性があるため、SNSの「いいね」や共有の数を参考するとよい', '情報の価値は常に一定であり、時間が経過しても変化することはない'],
        a: 1, why: 'STEP 2 で見たとおりです。⓪はデジタル情報は劣化せず複製できるので誤り、②は「いいね」の数は信ぴょう性の証明にならず、③は情報の価値は時間とともに変わります（速報性）。' }
    ], '本文の答えは【イ】① です。');
    Quiz.choice('q3Box', 'q3Note', [
      { k: 'ウ', q: 'メディアの特性についての記述として<strong>適当でない</strong>ものは',
        ch: ['メディアで伝えられる情報は、すべて客観的であり、発信者の主観は含まれない', '受け手はメディアの特性を理解しながら、情報を受け取ることが重要である', 'インターネットを使ったメディアの多くは、双方向のやりとりが可能である', 'メディアによる表現の仕方で、受け手の印象が変わることがある'],
        a: 0, why: 'STEP 3 で見たとおり、どの事実を選び、どんな言葉で伝えるかに<strong>発信者の主観が入ります</strong>。だからこそ、受け手にはメディアリテラシーが必要です。' }
    ], '本文の答えは【ウ】⓪ です。');
    window.Terms.glossary($('glossBox'), ['メディアリテラシー', 'DIKWモデル', '残存性', '複製性', '伝播性', 'デジタルタトゥー', '情報の信憑性', 'メディア', 'ファクトチェック']);
    window.Terms.attach();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
