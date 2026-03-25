'use strict';

// ===== データ定義 =====

const PLAYER_BASE = {
  name: '市川',
  lv: 51,
  hp: 512,
  maxHp: 512,
  mp: 98,
  maxMp: 98,
  atk: [40, 60],
  def: 30
};

const KOHAYAKAWA_MSGS = {
  normal: ['先輩、負けないでください！', '市川さん、信じてます！', '先輩なら大丈夫です！'],
  pinch:  ['先輩！焼肉食べてください！', '危ない！先輩！', 'まだいけます、先輩！'],
  win:    ['さすが先輩です！！', 'やりましたね先輩！', '先輩、最高です！'],
  lose:   ['先輩……先輩っ……', 'そんな……', 'くっ……']
};

const ENEMIES = [
  {
    id: 'oyaji',
    name: '古参顧客のオヤジ',
    lv: 38,
    hp: 80, maxHp: 80,
    atk: [20, 35],
    def: 8,
    isBoss: false,
    introMsg: '古参顧客の　オヤジが　あらわれた！',
    speech: '「おめぇーさん婿さん？\nとりまコストダウン　おなしゃーす！」',
    quoteMsg: '「先代社長は　そんなことしなかったぞ！」\nオヤジの　ことばが　刺さる！',
    deathMsg: 'オヤジは　しぶしぶ　帰っていった。',
    actions: ['attack', 'shout', 'attack', 'attack'],
    graphic: 'g-4332000mrd-006.jpg'
  },
  {
    id: 'shokunin',
    name: '古株職人',
    lv: 47,
    hp: 100, maxHp: 100,
    atk: [28, 45],
    def: 15,
    isBoss: false,
    introMsg: '古株職人が　腕を組んで　立っていた！',
    speech: '「で？　まさか　給料泥棒の\n婿さんじゃないよな？」',
    quoteMsg: '「俺のやり方に　文句あるんか！」\n職人は　頑として　動かない！',
    deathMsg: '職人は　無言で　持ち場に戻った。',
    actions: ['attack', 'guard', 'attack', 'shout'],
    graphic: '1402935554627.jpg'
  },
  {
    id: 'banto',
    name: '意地悪番頭',
    lv: 44,
    hp: 120, maxHp: 120,
    atk: [25, 42],
    def: 14,
    isBoss: false,
    introMsg: '意地悪番頭が　立ちはだかった！',
    speech: '「今までこのやり方でやってたんだ！！\n勝手に変えるな！」',
    quoteMsg: '「あなたに　何がわかるんですか！」\n番頭の　言葉が　混乱を生む！',
    deathMsg: '番頭は　舌打ちをして　立ち去った。',
    actions: ['attack', 'confuse', 'attack', 'attack'],
    graphic: '1992.jpg'
  },
  {
    id: 'wakaijibun',
    name: '若き頃の自分',
    lv: 51,
    hp: 150, maxHp: 150,
    atk: [30, 50],
    def: 12,
    isBoss: false,
    introMsg: '鏡の前に　見覚えのある顔が……\nわかき　頃の　自分が　あらわれた！',
    quoteMsg: '「俺はこんなもんじゃない！\nまだ諦めてないぞ！！」\n過去の自分の気迫に　圧倒される！',
    deathMsg: '若き頃の自分は　ゆっくり消えていった。\n\n「……お前なら、できる。」',
    actions: ['attack', 'shout', 'attack', 'confuse', 'attack'],
    graphic: '331731247_747685599987096_400141926464036215_n.jpg'
  },
  {
    id: 'baba',
    name: '馬場',
    lv: 51,
    hp: 320, maxHp: 320,
    atk: [55, 82],
    def: 18,
    isBoss: true,
    introMsg: 'スナックのママ　馬場が\n本性を現した！',
    quoteMsg: '「そうは問屋が卸さないわよ！社長業なめんちゃダメ！絶対！！！」\n馬場は　まじゅつをつかった！',
    deathMsg: '馬場は　ゆっくりと　フェイスパックを\nはがした。\n\n「……まあ　ドンペリでも飲みなよ」',
    actions: ['attack', 'donperi', 'taunt', 'attack', 'smoke', 'taunt2', 'attack'],
    graphic: 'Gemini_Generated_Image_ynxkt4ynxkt4ynxk.png'
  }
];

const OPENING_TEXTS = [
  'ここは　東京・台東区。\n小さな町工場会社　にしかわ製作。',
  '婿さんとして　この会社に入って\nはや数年。\n\n市川は　今日も　出社する。',
  'だが　会社の奥から\n不穏な　気配が漂ってくる……',
  '先代の　影が　まだ　この会社に\n色濃く残っていた。',
  '市川は　腹をくくった。\n\n「今日こそ　決着をつける」'
];

const PRE_BOSS_TEXTS = [
  '四体を倒した。\n\nしかし　市川の体力は\nかなり削られていた……',
  '奥の部屋から\n妖気のような　何かが　漂ってくる。',
  '小早川が　耳打ちする。\n\n「先輩……奥に　いますよ。\n　あの人が」',
  '市川は　ドアの前に立った。\n\n深呼吸する。\n\nそして　ドアを開けた。'
];

const ENDING_TEXTS = [
  'ババは　静かに目を閉じた。',
  'しばらくの沈黙の後、\n\n「……流石市川さん私が見込んだだけあるわ....」\n\nと　呟いた。',
  'こうして　市川は\n事業承継を　果たした。',
  'それが　新たな地獄の\nはじまりだったが、\n\nそれはまた別の話である。',
  '\n\n　　　　　　　　　FIN\n\n「婿3クエスト　～事業承継の旅～」'
];

// ===== ゲーム状態 =====

let G = {};

function initGame() {
  G = {
    player: { ...PLAYER_BASE, atk: [...PLAYER_BASE.atk] },
    items: { herb: 3 },
    enemyIndex: 0,
    fieldStep: 0,
    enemy: null,
    confusedTurns: 0,
    cmdLocked: false,
    enemyActionIndex: 0,
    kohayakawaRescued: false,
    kohayakawaAngered: false
  };
}

// ===== 画面切り替え =====

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

// ===== ユーティリティ =====

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcDamage(atk, def) {
  const base = rand(atk[0], atk[1]);
  return Math.max(1, base - Math.floor(def * 0.6));
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typeText(el, text, speed = 38) {
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== UI更新 =====

function renderPlayerStatus() {
  const p = G.player;
  document.getElementById('p-lv').textContent = p.lv;
  document.getElementById('p-hp').textContent = `${p.hp}/${p.maxHp}`;
  document.getElementById('p-mp').textContent = `${p.mp}/${p.maxMp}`;

  const hpPct = Math.max(0, (p.hp / p.maxHp) * 100);
  const mpPct = Math.max(0, (p.mp / p.maxMp) * 100);
  document.getElementById('player-hp-bar').style.width = hpPct + '%';
  document.getElementById('player-mp-bar').style.width = mpPct + '%';

  const hpBar = document.getElementById('player-hp-bar');
  const hpNum = document.getElementById('p-hp');
  if (hpPct < 25) {
    hpBar.style.background = '#cc2222';
    hpNum.classList.add('hp-danger');
  } else if (hpPct < 50) {
    hpBar.style.background = '#cc8800';
    hpNum.classList.remove('hp-danger');
  } else {
    hpBar.style.background = '#00cc44';
    hpNum.classList.remove('hp-danger');
  }

  const itemCmd = document.querySelector('.cmd[data-cmd="item"]');
  if (itemCmd) itemCmd.textContent = `ラーメン(${G.items.herb})`;
}

function renderEnemyStatus() {
  const e = G.enemy;
  if (!e) return;

  document.getElementById('enemy-name-lv').textContent = `${e.name}　LV${e.lv}`;

  const pct = Math.max(0, (e.currentHp / e.maxHp) * 100);
  const bar = document.getElementById('enemy-hp-bar');
  bar.style.width = pct + '%';
  if (pct < 25) bar.style.background = '#cc2222';
  else if (pct < 50) bar.style.background = '#cc8800';
  else bar.style.background = '#00cc44';

  const g = document.getElementById('enemy-graphic');
  if (e.graphic) {
    g.innerHTML = `<img src="${e.graphic}" alt="${e.name}">`;
  } else {
    g.innerHTML = `<div class="enemy-text">${e.name}</div>`;
  }
}

function setCommandsEnabled(enabled) {
  document.querySelectorAll('.cmd').forEach(c => {
    if (enabled) c.classList.remove('disabled');
    else c.classList.add('disabled');
  });
}

function setKohayakawaMsg(type) {
  const msg = pickRandom(KOHAYAKAWA_MSGS[type] || KOHAYAKAWA_MSGS.normal);
  document.getElementById('kohayakawa-msg').textContent = msg;
}

// ===== 変身アニメーション =====

const TRANSFORM_CHARS = [
  {
    real:  '449109062_1948475445585799_4769610603035076544_n.jpg',
    chara: 'field_ichikawa.png',
    label: 'ただの　サラリーマンだった　市川氏……',
    caption: '市川氏　LV 51'
  },
  {
    real:  '639614645_25701335696204289_8807151773139096434_n.jpg',
    chara: 'field_kohayakawa.png',
    label: 'そして　頼れる仲間……',
    caption: '小早川氏　LV 53'
  },
  {
    real:  '272844519_6896987360375981_2970842172439984542_n.jpg',
    chara: 'field_baba.png',
    label: '業界の風雲児　スナックのママ……',
    caption: '馬場氏　LV 51'
  }
];

async function playTransformSequence() {
  showScreen('transform');
  for (const c of TRANSFORM_CHARS) {
    await playOneTransform(c);
    await wait(600);
  }
  await startOpening();
}

async function playOneTransform(c) {
  const card    = document.getElementById('transform-card');
  const realImg = document.getElementById('transform-real');
  const charaImg = document.getElementById('transform-chara');
  const label   = document.getElementById('transform-label');
  const caption = document.getElementById('transform-caption');

  // 初期状態にリセット
  card.classList.remove('spinning');
  card.style.transform = '';
  realImg.src  = c.real;
  charaImg.src = c.chara;
  label.textContent   = c.label;
  caption.textContent = '';

  await wait(800);

  // スピン開始（1回転=1000ms）
  // 半回転（500ms）で裏面（キャラ）に差し替えるタイミングを作る
  return new Promise(resolve => {
    card.classList.add('spinning');

    // 半回転時点（500ms）でキャプション表示
    setTimeout(() => {
      caption.textContent = c.caption;
    }, 500);

    // 1回転完了（1000ms）
    setTimeout(() => {
      card.classList.remove('spinning');
      // スピン後はキャラ面を表に固定
      card.style.transform = 'rotateY(180deg)';
      resolve();
    }, 1100);
  });
}

// ===== オープニング =====

let openingIndex = 0;
let openingMode = 'intro'; // 'intro' | 'baba'
let babaTexts = [];
let babaIdx = 0;

async function startOpening() {
  openingMode = 'intro';
  openingIndex = 0;
  document.getElementById('opening-portrait').style.display = '';
  showScreen('opening');
  const el = document.getElementById('opening-text');
  await typeText(el, OPENING_TEXTS[openingIndex]);
}

document.getElementById('screen-opening').addEventListener('click', async () => {
  const el = document.getElementById('opening-text');
  if (openingMode === 'intro') {
    openingIndex++;
    if (openingIndex < OPENING_TEXTS.length) {
      await typeText(el, OPENING_TEXTS[openingIndex]);
    } else {
      await startField();
    }
  } else if (openingMode === 'baba') {
    babaIdx++;
    if (babaIdx < babaTexts.length) {
      await typeText(el, babaTexts[babaIdx]);
    } else {
      openingMode = 'intro';
      await babaBetrayal();
    }
  }
});

// ===== バトル開始 =====

async function startBattle(enemy) {
  G.enemy = { ...enemy, currentHp: enemy.hp };
  G.enemyActionIndex = 0;
  G.cmdLocked = false;

  showScreen('battle');
  renderPlayerStatus();
  renderEnemyStatus();
  setKohayakawaMsg('normal');

  const msgEl = document.getElementById('battle-message');
  await typeText(msgEl, G.enemy.introMsg);
  if (G.enemy.speech) {
    await wait(800);
    await typeText(msgEl, G.enemy.speech);
  }
  await wait(700);
  setCommandsEnabled(true);
}

// ===== コマンド選択 =====

document.getElementById('battle-commands').addEventListener('click', async (e) => {
  const cmd = e.target.closest('.cmd');
  if (!cmd || G.cmdLocked) return;
  await handleCommand(cmd.dataset.cmd);
});

async function handleCommand(action) {
  G.cmdLocked = true;
  setCommandsEnabled(false);

  const msgEl = document.getElementById('battle-message');
  const p = G.player;
  const e = G.enemy;

  if (action === 'attack') {
    if (G.confusedTurns > 0) {
      G.confusedTurns--;
      if (Math.random() < 0.4) {
        const selfDmg = rand(15, 30);
        p.hp = Math.max(0, p.hp - selfDmg);
        await typeText(msgEl, `市川は　こんらんして\n自分を　たたいた！\n${selfDmg}のダメージ！`);
        renderPlayerStatus();
        await wait(600);
        if (p.hp <= 0) { await checkGameOver(); return; }
        await enemyTurn();
        return;
      }
    }
    const dmg = calcDamage(p.atk, e.def);
    e.currentHp = Math.max(0, e.currentHp - dmg);
    await typeText(msgEl, `市川は　たたかった！\n${e.name}に　${dmg}のダメージ！`);

  } else if (action === 'magic') {
    await typeText(msgEl, '市川は　じゅもんを　となえようとした！\n\n英語が　ガンマクラスで\n魔法が　使えない！！');
    G.cmdLocked = false;
    setCommandsEnabled(true);
    return;

  } else if (action === 'item') {
    if (G.items.herb <= 0) {
      await typeText(msgEl, 'ラーメンが　ない！');
      G.cmdLocked = false;
      setCommandsEnabled(true);
      return;
    }
    const heal = rand(60, 90);
    G.items.herb--;
    p.hp = Math.min(p.maxHp, p.hp + heal);
    await typeText(msgEl, `市川は　ラーメンを　たべた！\nHPが　${heal}　回復した！\n残り　${G.items.herb}杯`);

  } else if (action === 'run') {
    if (e.isBoss) {
      await typeText(msgEl, `にげられない！\nここから　逃げるわけには　いかない！`);
      G.cmdLocked = false;
      setCommandsEnabled(true);
      return;
    }
    await typeText(msgEl, `市川は　にげようとした！\n\n……やっぱり　戻ってきた。`);
    renderPlayerStatus();
    renderEnemyStatus();
    G.cmdLocked = false;
    setCommandsEnabled(true);
    return;
  }

  renderPlayerStatus();
  renderEnemyStatus();
  await wait(600);

  if (e.currentHp <= 0) {
    await typeText(msgEl, `${e.name}を　たおした！\n\n${e.deathMsg}`);
    setKohayakawaMsg('win');
    await wait(1500);
    await nextPhase();
    return;
  }

  await enemyTurn();
}

// ===== 敵ターン =====

async function enemyTurn() {
  const msgEl = document.getElementById('battle-message');
  const p = G.player;
  const e = G.enemy;
  const act = e.actions[G.enemyActionIndex % e.actions.length];
  G.enemyActionIndex++;

  if (act === 'attack') {
    const dmg = Math.max(1, calcDamage(e.atk, p.def));
    p.hp = Math.max(0, p.hp - dmg);
    await typeText(msgEl, `${e.name}の　こうげき！\n市川に　${dmg}のダメージ！`);

  } else if (act === 'shout') {
    const reduction = 8;
    p.atk = p.atk.map(v => Math.max(5, v - reduction));
    await typeText(msgEl, e.quoteMsg + '\n市川は　やるきを　うしなった！');

  } else if (act === 'confuse') {
    G.confusedTurns = 2;
    await typeText(msgEl, e.quoteMsg + '\n市川は　こんらん状態になった！');

  } else if (act === 'guard') {
    G.enemy.def = 30;
    await typeText(msgEl, `${e.name}は　かまえた！\n守備力が　あがった！`);

  } else if (act === 'donperi') {
    const dmg = Math.max(1, rand(80, 120));
    p.hp = Math.max(0, p.hp - dmg);
    await typeText(msgEl, `馬場は　ドンペリを　かかげた！\nドンペリ　マジック！！\n市川に　${dmg}の　大ダメージ！！`);

  } else if (act === 'curse') {
    p.mp = Math.max(0, p.mp - 30);
    await typeText(msgEl, e.quoteMsg + '\nのろいがかかった！\n市川の　MPが　へった！');

  } else if (act === 'taunt') {
    const dmg = Math.max(1, calcDamage(e.atk, p.def));
    p.hp = Math.max(0, p.hp - dmg);
    await typeText(msgEl, `馬場が　叫んだ！\n\n「町工場の経営は\n　甘くないのよおおおおおおおお！！」\n\n市川に　${dmg}のダメージ！`);

  } else if (act === 'taunt2') {
    const dmg = Math.max(1, calcDamage(e.atk, p.def));
    p.hp = Math.max(0, p.hp - dmg);
    await typeText(msgEl, `馬場が　構えた！\n\n「損益計算！貸借対照！\nスワット分析！！\n自己資本利益率！！！\n総資産利益率　ビーーーーム！！」\n\n市川に　${dmg}のダメージ！！`);

  } else if (act === 'smoke') {
    const heal = rand(60, 100);
    G.enemy.currentHp = Math.min(G.enemy.maxHp, G.enemy.currentHp + heal);
    await typeText(msgEl, `馬場は　煙草に　火をつけた。\nうまそうに　一服した。\n馬場の　HPが　${heal}　回復した！`);

  } else if (act === 'item') {
    const heal = rand(60, 100);
    G.enemy.currentHp = Math.min(G.enemy.maxHp, G.enemy.currentHp + heal);
    await typeText(msgEl, `${e.name}は　やくそうを　つかった！\n${e.name}の　HPが　${heal}　回復した！`);
  }

  renderPlayerStatus();
  renderEnemyStatus();

  const ratio = p.hp / p.maxHp;
  setKohayakawaMsg(ratio < 0.3 ? 'pinch' : 'normal');

  await wait(600);

  if (p.hp <= 0) {
    await checkGameOver();
    return;
  }

  // 若き頃の自分：6ターン超過で小早川が激怒介入
  if (G.enemy.id === 'wakaijibun' && G.enemyActionIndex >= 4 && G.enemy.currentHp > 0 && !G.kohayakawaAngered) {
    await kohayakawaAnger();
    return;
  }

  // 馬場がパーティにいる間、ランダムでイベント発生
  if (G.enemyIndex < 4) {
    const r = Math.random();
    if (r < 0.3 && G.confusedTurns === 0) {
      await babaPartyDonperi();
      return;
    } else if (r < 0.6) {
      await babaPartyViolin();
      return;
    }
  }

  G.cmdLocked = false;
  setCommandsEnabled(true);
}

async function babaPartyViolin() {
  const msgEl = document.getElementById('battle-message');
  const babaMsg = document.getElementById('baba-party-msg');
  if (babaMsg) babaMsg.textContent = '♪♪♪';
  await typeText(msgEl, '馬場が　バイオリンを　弾き始めた！\n\n♪ ～～～ ♪\n\n市川も　つられて　カラオケを　歌った！\n♬ ～～～ ♬');
  await wait(600);
  if (babaMsg) babaMsg.textContent = '…';
  G.cmdLocked = false;
  setCommandsEnabled(true);
}

async function babaPartyDonperi() {
  const msgEl = document.getElementById('battle-message');
  const babaMsg = document.getElementById('baba-party-msg');
  if (babaMsg) babaMsg.textContent = '飲みなよ〜';
  G.confusedTurns = 2;
  await typeText(msgEl, '馬場が　ドンペリを　差し出した！\n「飲みなよ〜　いいやつだから」\n市川は　飲んでしまった！\n市川は　こんらん状態になった！');
  await wait(600);
  if (babaMsg) babaMsg.textContent = '…';
  G.cmdLocked = false;
  setCommandsEnabled(true);
}

// ===== 次フェーズ判定 =====


async function nextPhase() {
  G.enemyIndex++;
  if (G.enemyIndex >= ENEMIES.length) {
    await startEnding();
  } else {
    // バトル後はフィールドに戻る
    await startField();
  }
}

// ===== フィールド =====

const FIELD_STEPS = [
  { name: '会社入口',   desc: '市川・小早川・馬場の3人で\n会社に向かった。',        encounter: null },
  { name: '第1倉庫前', desc: '廊下の奥から\n聞き覚えのある声が……',                encounter: 0 },
  { name: '事務フロア', desc: '嫌な視線が刺さる……\nここでもまだ先代の影が濃い。',   encounter: 1 },
  { name: '加工現場前', desc: 'キーンという機械音が響く。\n誰かが立っていた。',       encounter: 2 },
  { name: '社長室前',  desc: '鏡がある。\nそこに映った顔を見て　市川は息をのんだ……', encounter: 3 },
  { name: '奥の間',    desc: 'ここが先代の部屋か……\nドアを開けると――',            encounter: 'boss' }
];

async function startField() {
  renderField();
  showScreen('field');
  document.getElementById('field-advance').classList.remove('disabled');
}

function renderField() {
  const step = FIELD_STEPS[G.fieldStep];
  document.getElementById('field-location').textContent = `【${step.name}】`;
  document.getElementById('field-desc').textContent = step.desc;

  // 進行ドット
  const progress = document.getElementById('field-progress');
  progress.innerHTML = '';
  FIELD_STEPS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (i < G.fieldStep) dot.classList.add('done');
    else if (i === G.fieldStep) dot.classList.add('current');
    progress.appendChild(dot);
  });
}

document.getElementById('field-advance').addEventListener('click', async () => {
  const btn = document.getElementById('field-advance');
  if (btn.classList.contains('disabled')) return;
  btn.classList.add('disabled');

  G.fieldStep++;
  if (G.fieldStep >= FIELD_STEPS.length) return;

  renderField();
  const step = FIELD_STEPS[G.fieldStep];
  await wait(600);

  if (step.encounter === 'boss') {
    await babaTurns();
  } else if (step.encounter !== null) {
    await startBattle(ENEMIES[step.encounter]);
  } else {
    btn.classList.remove('disabled');
  }
});

async function babaBetrayal() {
  // ババがパーティから離脱する演出
  const babaEl = document.getElementById('party-baba');
  const babaMsg = document.getElementById('baba-party-msg');
  showScreen('battle');
  renderPlayerStatus();
  // 敵グラフィックとバトルUIを準備
  document.getElementById('enemy-name-lv').textContent = '';
  document.getElementById('enemy-graphic').innerHTML = '';
  document.getElementById('enemy-hp-bar').style.width = '0%';
  document.getElementById('battle-message').textContent = '馬場が　こちらを向いた……';
  setCommandsEnabled(false);

  await wait(1200);
  babaMsg.textContent = '！？';
  babaEl.classList.add('betraying');
  document.getElementById('battle-message').textContent = '馬場が　パーティを　抜けた！';
  await wait(1200);
  babaEl.style.display = 'none';
  await wait(500);
  await startBattle(ENEMIES[4]);
}

async function babaTurns() {
  babaTexts = [
    '奥の間のドアを開けると……\n\n馬場が　振り返った。',
    '「……あら。みんな揃ってるわね」',
    'ふいに　馬場の目が　変わった。',
    '「テラ川！！！そうはいかんざき！！」\n\n馬場が　豹変した！！'
  ];
  babaIdx = 0;
  openingMode = 'baba';
  document.getElementById('opening-portrait').style.display = 'none';
  showScreen('opening');
  const el = document.getElementById('opening-text');
  await typeText(el, babaTexts[babaIdx]);
}

// ===== HP0判定（救済チェック付き） =====

async function checkGameOver() {
  if (G.enemy && G.enemy.isBoss && !G.kohayakawaRescued) {
    G.player.hp = 1;
    await kohayakawaRescue();
  } else {
    await gameOver();
  }
}

// ===== NOVAフラッシュ =====

function novaFlash(bg) {
  const el = document.getElementById('nova-flash-overlay');
  if (!el) return;
  el.style.background = bg;
  el.style.transition = 'none';
  el.style.opacity = '0.92';
  el.offsetHeight; // reflow
  el.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { el.style.opacity = '0'; }, 80);
}

// ===== 小早川激怒介入イベント（若き頃の自分） =====

async function kohayakawaAnger() {
  G.kohayakawaAngered = true;
  const msgEl = document.getElementById('battle-message');
  const enemyGraphic = document.getElementById('enemy-graphic');
  setCommandsEnabled(false);

  // 小早川を敵グラフィックエリアにアップ表示
  enemyGraphic.innerHTML = '<img src="Gemini_Generated_Image_iu67ryiu67ryiu67.png" alt="小早川" style="width:100%;height:100%;object-fit:contain;border-radius:8px;">';
  document.getElementById('enemy-name-lv').textContent = '小早川　激怒！！';

  await typeText(msgEl, '小早川が　割り込んできた！！');
  await wait(600);

  await typeText(msgEl, '「ピースして　気取ってんじゃ\nねぇええええええ！！！」');
  showHint(); await waitForTap(); hideHint();

  novaFlash('rgba(255,80,80,0.88)');
  await wait(500);

  const dmg = G.enemy.currentHp + rand(20, 50);
  G.enemy.currentHp = 0;
  renderEnemyStatus();

  await typeText(msgEl, `若き頃の自分に　${dmg}の\n大ダメージ！！！`);
  await wait(1000);

  await typeText(msgEl, G.enemy.deathMsg);
  setKohayakawaMsg('win');
  showHint(); await waitForTap(); hideHint();
  await nextPhase();
}

// ===== 小早川NOVA救済イベント =====

function showHint() {
  const el = document.getElementById('battle-tap-hint');
  if (el) el.style.display = '';
}
function hideHint() {
  const el = document.getElementById('battle-tap-hint');
  if (el) el.style.display = 'none';
}

function waitForTap() {
  return new Promise(resolve => {
    const screen = document.getElementById('screen-battle');
    const handler = (e) => {
      e.preventDefault();
      screen.removeEventListener('click', handler);
      screen.removeEventListener('touchend', handler);
      resolve();
    };
    screen.addEventListener('click', handler);
    screen.addEventListener('touchend', handler, { passive: false });
  });
}

async function kohayakawaRescue() {
  G.kohayakawaRescued = true;
  const msgEl = document.getElementById('battle-message');
  const enemyGraphic = document.getElementById('enemy-graphic');
  const enemyNameLv  = document.getElementById('enemy-name-lv');
  const enemyHpBar   = document.getElementById('enemy-hp-bar');

  setCommandsEnabled(false);
  renderPlayerStatus();
  await wait(500);

  // 上部グラフィックエリアを小早川に差し替え（馬場を退場させる）
  const kohSrc = document.querySelector('#party-kohayakawa .party-face').src;
  enemyGraphic.innerHTML = `<img src="${kohSrc}" alt="小早川">`;
  enemyNameLv.textContent = '小早川　参上！！';
  enemyHpBar.style.width = '0%';

  await typeText(msgEl, 'もうやめて！！\n\n市川さんのHPは　もう　0よ！！！');
  showHint(); await waitForTap(); hideHint();

  await typeText(msgEl, '私の　前職は\n\n　　　駅前留学　NO〇A！！\n\n市川さん　魔法　使って！！！');
  showHint(); await waitForTap(); hideHint();

  // ビームフラッシュ
  novaFlash('radial-gradient(ellipse at 28% 85%, rgba(100,210,255,0.92) 0%, rgba(0,80,200,0.4) 40%, transparent 70%)');
  await wait(600);

  await typeText(msgEl, '小早川の　ビームが\n市川を　つらぬいた！！！');
  showHint(); await waitForTap(); hideHint();

  // ビーク演出終了 → 馬場に入れ替え
  renderEnemyStatus();

  novaFlash('rgba(255,220,0,0.82)');
  await wait(400);

  await typeText(msgEl, '市川の　英語力が\n\n　　　　　LvMAX　になった！！！');
  showHint(); await waitForTap(); hideHint();

  novaFlash('rgba(255,255,255,0.96)');
  await wait(400);

  await typeText(msgEl, '強力魔法　発動！！\n\n「引退中だから　いけたら行く！！」');
  showHint(); await waitForTap(); hideHint();

  novaFlash('linear-gradient(135deg, #ff0000 0%, #ff8800 20%, #ffff00 40%, #00ff88 60%, #0088ff 80%, #aa00ff 100%)');
  await wait(500);

  await typeText(msgEl, '引退しているのか　していないのか\n果たして　来るのか　こないのか\n\nさっぱりわからない　魔法が……！！');
  showHint(); await waitForTap(); hideHint();

  novaFlash('rgba(255,255,255,0.98)');
  await wait(600);

  // 一撃大ダメージ
  const dmg = rand(290, 360);
  G.enemy.currentHp = Math.max(0, G.enemy.currentHp - dmg);
  renderEnemyStatus();

  await typeText(msgEl, `馬場に\n\n${dmg} の\n\nだい　だい　だい　だい\nダメージ！！！！！！`);
  await wait(1500);

  if (G.enemy.currentHp <= 0) {
    await typeText(msgEl, `${G.enemy.name}を　たおした！\n\n${G.enemy.deathMsg}`);
    setKohayakawaMsg('win');
    showHint(); await waitForTap(); hideHint();
    await nextPhase();
  } else {
    await typeText(msgEl, 'しかし　馬場は　まだ　立っていた！！\n（もう少し！！がんばれ！！）');
    await wait(800);
    G.cmdLocked = false;
    setCommandsEnabled(true);
  }
}

// ===== ゲームオーバー =====

async function gameOver() {
  setKohayakawaMsg('lose');
  await wait(500);
  showScreen('gameover');
  const el = document.getElementById('gameover-text');
  await typeText(el, '市川は　たおれた。\n\n「あなたには　無理だったのよ。」\n\n　　　　　　　　　— 馬場 —');
}

// ===== エンディング =====

let endingIndex = 0;

async function startEnding() {
  endingIndex = 0;
  showScreen('ending');
  const el = document.getElementById('ending-text');
  await typeText(el, ENDING_TEXTS[endingIndex]);
}

document.getElementById('screen-ending').addEventListener('click', async (e) => {
  if (e.target.closest('.btn-restart')) return;
  endingIndex++;
  const hint = document.getElementById('ending-tap-hint');
  if (endingIndex < ENDING_TEXTS.length) {
    const el = document.getElementById('ending-text');
    await typeText(el, ENDING_TEXTS[endingIndex]);
    // 最終ページはヒント非表示・はじめからボタン表示
    if (endingIndex === ENDING_TEXTS.length - 1) {
      if (hint) hint.style.display = 'none';
    }
  }
});

// ===== 再スタート =====

document.getElementById('gameover-restart').addEventListener('click', () => {
  initGame();
  showScreen('title');
});

document.getElementById('ending-restart').addEventListener('click', () => {
  initGame();
  showScreen('title');
});

// ===== タイトル画面 =====

document.getElementById('title-menu').addEventListener('click', (e) => {
  const item = e.target.closest('.menu-item');
  if (!item) return;
  const action = item.dataset.action;
  if (action === 'newgame') {
    initGame();
    playTransformSequence();
  } else if (action === 'continue') {
    const saved = loadSave();
    if (saved) {
      G.player = saved.player;
      G.items = saved.items;
      G.enemyIndex = saved.enemyIndex;
      startBattle(ENEMIES[G.enemyIndex] || ENEMIES[0]);
    } else {
      const msgEl = document.querySelector('#title-menu');
      const orig = msgEl.innerHTML;
      msgEl.innerHTML = '<div style="color:#ff4444;padding:8px;">冒険の書が　みつかりません。</div>';
      setTimeout(() => { msgEl.innerHTML = orig; }, 2000);
    }
  }
});

// ===== セーブ/ロード =====

function saveGame() {
  try {
    localStorage.setItem('muko3_save', JSON.stringify({
      player: G.player,
      items: G.items,
      enemyIndex: G.enemyIndex
    }));
  } catch (_) { /* ignore */ }
}

function loadSave() {
  try {
    const data = localStorage.getItem('muko3_save');
    return data ? JSON.parse(data) : null;
  } catch (_) {
    return null;
  }
}

// ===== 起動 =====
initGame();
