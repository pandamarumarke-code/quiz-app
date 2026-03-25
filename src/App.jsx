import { useState, useEffect } from 'react'
import './App.css'

// 行動経済学10問クイズデータ
const questions = [
  {
    question: "人は「得をすること」より「損を避けること」を重視する傾向があります。この心理効果は？",
    choices: ["アンカリング効果", "損失回避バイアス", "バンドワゴン効果", "ハロー効果"],
    answer: 1,
    explanation: "損失回避バイアス：人は同じ金額でも、得る喜びより失う痛みの方が約2倍強く感じます。"
  },
  {
    question: "最初に提示された数字が、その後の判断に影響を与える心理効果は？",
    choices: ["フレーミング効果", "サンクコスト効果", "アンカリング効果", "現状維持バイアス"],
    answer: 2,
    explanation: "アンカリング効果：最初の価格表示が「基準」となり、割引後の価格がお得に感じられます。"
  },
  {
    question: "すでに費やしたコストがもったいなくて、損な選択を続けてしまう心理は？",
    choices: ["確証バイアス", "サンクコスト効果", "正常性バイアス", "バンドワゴン効果"],
    answer: 1,
    explanation: "サンクコスト効果：映画がつまらなくても「チケット代がもったいない」と最後まで観てしまう現象です。"
  },
  {
    question: "同じ内容でも、表現の仕方によって判断が変わる心理効果は？",
    choices: ["フレーミング効果", "ピーク・エンドの法則", "選択のパラドックス", "ナッジ理論"],
    answer: 0,
    explanation: "フレーミング効果：「成功率90%」と「失敗率10%」は同じ意味でも、前者の方がポジティブに感じます。"
  },
  {
    question: "多くの人が選んでいるものを自分も選びたくなる心理は？",
    choices: ["希少性の原理", "ハロー効果", "バンドワゴン効果", "ピグマリオン効果"],
    answer: 2,
    explanation: "バンドワゴン効果：「売上No.1」「みんな使ってる」という表現が購買意欲を高めるのはこの効果です。"
  },
  {
    question: "数量や時間が限られていると感じると、価値が高く見える心理は？",
    choices: ["アンカリング効果", "確証バイアス", "おとり効果", "希少性の原理"],
    answer: 3,
    explanation: "希少性の原理：「残りわずか」「期間限定」と表示されると、つい急いで買いたくなります。"
  },
  {
    question: "選択肢が多すぎると、かえって選べなくなる現象は？",
    choices: ["選択のパラドックス", "現状維持バイアス", "デフォルト効果", "メンタルアカウンティング"],
    answer: 0,
    explanation: "選択のパラドックス：ジャムの試食実験では、6種類のほうが24種類より6倍も売れました。"
  },
  {
    question: "人の行動をさりげなく望ましい方向に導く仕組みを何という？",
    choices: ["プライミング効果", "ナッジ理論", "ハロー効果", "双曲割引"],
    answer: 1,
    explanation: "ナッジ理論：カフェテリアで野菜を取りやすい位置に置くと、自然と健康的な食事が増えます。"
  },
  {
    question: "将来の大きな利益より、目の前の小さな利益を選んでしまう傾向は？",
    choices: ["損失回避バイアス", "バンドワゴン効果", "双曲割引", "確証バイアス"],
    answer: 2,
    explanation: "双曲割引：「今すぐ1万円」と「1年後の1万5千円」なら、多くの人が今すぐを選びます。"
  },
  {
    question: "自分の信念に合う情報ばかり集め、反する情報を無視する傾向は？",
    choices: ["正常性バイアス", "確証バイアス", "ハロー効果", "フレーミング効果"],
    answer: 1,
    explanation: "確証バイアス：自分の意見を支持する記事ばかり読んで「やっぱり正しい」と思い込む現象です。"
  }
]

// スコアに応じた判定
function getJudgment(score) {
  if (score >= 9) return { emoji: "🏆", text: "行動経済学マスター！", description: "素晴らしい！あなたは行動経済学の達人です。" }
  if (score >= 7) return { emoji: "🎓", text: "かなり詳しい！", description: "行動経済学の知識がしっかり身についています。" }
  if (score >= 5) return { emoji: "📚", text: "まだまだ学べる！", description: "基本は押さえています。さらに深めてみましょう！" }
  return { emoji: "🌱", text: "これから伸びる！", description: "行動経済学を学ぶと、ビジネスが変わりますよ！" }
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [copied, setCopied] = useState(false)

  const appUrl = typeof window !== 'undefined' ? window.location.href : ''

  // 回答処理
  function handleAnswer(index) {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
    // 2秒後に次の問題へ
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 2000)
  }

  // リスタート
  function restart() {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setGameStarted(false)
    setCopied(false)
  }

  // SNSシェア
  function shareToX() {
    const text = `行動経済学クイズで${score}/10問正解！🧠\nあなたは何問解ける？👉`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(appUrl)}`
    window.open(url, '_blank')
  }

  function shareToLINE() {
    const text = `行動経済学クイズで${score}/10問正解！🧠 あなたも挑戦してみて👉 ${appUrl}`
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  function copyLink() {
    navigator.clipboard.writeText(appUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // スタート画面
  if (!gameStarted) {
    return (
      <div className="app">
        <div className="card start-card">
          <div className="start-icon">🧠</div>
          <h1 className="start-title">行動経済学<br/>10問クイズ</h1>
          <p className="start-description">
            損失回避、アンカリング効果、ナッジ理論…<br/>
            あなたの行動経済学力をチェック！
          </p>
          <button className="start-button" onClick={() => setGameStarted(true)}>
            クイズを始める
          </button>
          <p className="start-note">全10問 ・ 所要時間 約3分</p>
        </div>
      </div>
    )
  }

  // 結果画面
  if (showResult) {
    const judgment = getJudgment(score)
    return (
      <div className="app">
        <div className="card result-card">
          <h2 className="result-header">🎉 結果発表！</h2>
          <div className="result-emoji">{judgment.emoji}</div>
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total">/ 10</span>
          </div>
          <div className="result-judgment">{judgment.text}</div>
          <p className="result-description">{judgment.description}</p>

          {/* SNSシェアボタン */}
          <div className="share-section">
            <p className="share-label">結果をシェアしよう！</p>
            <div className="share-buttons">
              <button className="share-btn share-x" onClick={shareToX}>
                <span className="share-icon">𝕏</span>
                <span>ポスト</span>
              </button>
              <button className="share-btn share-line" onClick={shareToLINE}>
                <span className="share-icon">💬</span>
                <span>LINE</span>
              </button>
              <button className="share-btn share-copy" onClick={copyLink}>
                <span className="share-icon">🔗</span>
                <span>{copied ? 'コピー済み ✓' : 'リンクコピー'}</span>
              </button>
            </div>
          </div>

          {/* LINE公式CTA */}
          <div className="cta-banner">
            <div className="cta-icon">📚</div>
            <div className="cta-content">
              <h3 className="cta-title">もっと学びたい方へ</h3>
              <p className="cta-text">行動経済学をビジネスに活かす方法をLINEで無料配信中！</p>
            </div>
            <a 
              href="https://lin.ee/qKLLAv87" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button"
            >
              LINE公式に登録する（無料）
            </a>
          </div>

          <button className="retry-button" onClick={restart}>
            もう一度挑戦する
          </button>
        </div>
      </div>
    )
  }

  // 問題画面
  const q = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100

  return (
    <div className="app">
      <div className="card question-card">
        {/* プログレスバー */}
        <div className="progress-section">
          <div className="progress-text">Q{currentQuestion + 1} / {questions.length}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* 問題文 */}
        <h2 className="question-text">{q.question}</h2>

        {/* 選択肢 */}
        <div className="choices">
          {q.choices.map((choice, index) => {
            let className = "choice-btn"
            if (isAnswered) {
              if (index === q.answer) className += " correct"
              else if (index === selectedAnswer) className += " incorrect"
              else className += " dimmed"
            }
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                <span className="choice-label">{['A', 'B', 'C', 'D'][index]}</span>
                <span className="choice-text">{choice}</span>
              </button>
            )
          })}
        </div>

        {/* 解説（回答後に表示） */}
        {isAnswered && (
          <div className={`explanation ${selectedAnswer === q.answer ? 'explanation-correct' : 'explanation-incorrect'}`}>
            <div className="explanation-header">
              {selectedAnswer === q.answer ? '⭕ 正解！' : '❌ 不正解…'}
            </div>
            <p className="explanation-text">{q.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
