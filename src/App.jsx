import { useState } from 'react'
import './App.css'

// 行動経済学10問クイズデータ
const questions = [
  {
    question: "人は「得をすること」より「損を避けること」を重視する傾向があります。この心理効果は？",
    choices: ["アンカリング効果", "損失回避バイアス", "バンドワゴン効果", "ハロー効果"],
    answer: 1,
    explanation: "損失回避バイアス：ノーベル経済学賞を受賞したダニエル・カーネマンの研究によると、人は同じ金額でも得る喜びより失う痛みを約2倍強く感じます。マーケティングでは『今だけ割引（逃すと損）』が『お得です（得する）』より効果的なのはこのためです。"
  },
  {
    question: "最初に提示された数字が、その後の判断に影響を与える心理効果は？",
    choices: ["フレーミング効果", "サンクコスト効果", "アンカリング効果", "現状維持バイアス"],
    answer: 2,
    explanation: "アンカリング効果：不動産の売値、メニューの最上段の高額商品、元値の表示…すべてアンカリングです。ある実験では、ルーレットでランダムに出た数字ですら、その後の判断に影響を与えました。価格交渉では『最初に数字を出した側が有利』と言われるのはこの効果です。"
  },
  {
    question: "すでに費やしたコストがもったいなくて、損な選択を続けてしまう心理は？",
    choices: ["確証バイアス", "サンクコスト効果", "正常性バイアス", "バンドワゴン効果"],
    answer: 1,
    explanation: "サンクコスト効果：映画がつまらなくても最後まで観る、使わないサブスクを解約できない、赤字のプロジェクトを止められない。すべてサンクコストの罠です。合理的な判断をするには『これまでにいくら使ったか』ではなく『これからどうなるか』だけを考えることが大切です。"
  },
  {
    question: "同じ内容でも、表現の仕方によって判断が変わる心理効果は？",
    choices: ["フレーミング効果", "ピーク・エンドの法則", "選択のパラドックス", "ナッジ理論"],
    answer: 0,
    explanation: "フレーミング効果：手術の説明で『生存率90%』と言われるのと『死亡率10%』と言われるのでは、同意率が大きく変わります。LPのコピーライティングでも、同じ事実を肯定形で伝えるか否定形で伝えるかで、コンバージョン率が数十%変わることがあります。"
  },
  {
    question: "多くの人が選んでいるものを自分も選びたくなる心理は？",
    choices: ["希少性の原理", "ハロー効果", "バンドワゴン効果", "ピグマリオン効果"],
    answer: 2,
    explanation: "バンドワゴン効果：Amazonのレビュー数、飲食店の行列、SNSのフォロワー数…人は『他の人が選んでいるもの＝良いもの』と判断します。新商品のマーケティングでは、まず少数のファンを作り社会的証明を得ることが成功の鍵になります。"
  },
  {
    question: "数量や時間が限られていると感じると、価値が高く見える心理は？",
    choices: ["アンカリング効果", "確証バイアス", "おとり効果", "希少性の原理"],
    answer: 3,
    explanation: "希少性の原理：チャルディーニの研究で実証された強力な心理効果です。Booking.comの『残り1室！』、ECサイトの『在庫わずか』、セミナーの『限定10名』。数量・時間・アクセスの3つの希少性を組み合わせると、さらに効果が高まります。"
  },
  {
    question: "選択肢が多すぎると、かえって選べなくなる現象は？",
    choices: ["選択のパラドックス", "現状維持バイアス", "デフォルト効果", "メンタルアカウンティング"],
    answer: 0,
    explanation: "選択のパラドックス：コロンビア大学のシーナ・アイエンガー教授の有名なジャム実験では、24種類を並べたときの購買率は3%、6種類では30%でした。料金プランは3つまで、LPのCTAは1つに絞るなど、選択肢を減らすことがコンバージョン向上の基本です。"
  },
  {
    question: "人の行動をさりげなく望ましい方向に導く仕組みを何という？",
    choices: ["プライミング効果", "ナッジ理論", "ハロー効果", "双曲割引"],
    answer: 1,
    explanation: "ナッジ理論：リチャード・セイラー教授がノーベル経済学賞を受賞した理論です。男性用トイレの的のシール、年金の自動加入、臓器提供のオプトアウト方式…いずれも強制ではなく、デフォルト設計や環境デザインで人の行動を自然に変えています。"
  },
  {
    question: "将来の大きな利益より、目の前の小さな利益を選んでしまう傾向は？",
    choices: ["損失回避バイアス", "バンドワゴン効果", "双曲割引", "確証バイアス"],
    answer: 2,
    explanation: "双曲割引：人は将来の報酬を極端に低く見積もります。ダイエットや貯金が続かないのもこの心理です。ビジネスでは『今すぐ使える特典』が強力な申込動機になります。逆に、将来の価値を実感させるビフォーアフター提示が、この心理を克服する有効な手法です。"
  },
  {
    question: "自分の信念に合う情報ばかり集め、反する情報を無視する傾向は？",
    choices: ["正常性バイアス", "確証バイアス", "ハロー効果", "フレーミング効果"],
    answer: 1,
    explanation: "確証バイアス：SNSのアルゴリズムがこの傾向を加速させ、エコーチェンバー（反響室）を作ります。ビジネスでは、顧客の声を集める際に『良い評価ばかり見ていないか？』と自問することが重要です。反証を意図的に探す習慣が、正しい意思決定につながります。"
  }
]

// スコアに応じた判定
function getJudgment(score) {
  if (score >= 9) return {
    emoji: "🏆",
    text: "行動経済学マスター！",
    description: "素晴らしい知識です！カーネマンやセイラーの理論を実践に活かせるレベル。次のステップは、自分のビジネスやコミュニケーションにこれらの原理を意図的に組み込むことです。"
  }
  if (score >= 7) return {
    emoji: "🎓",
    text: "かなり詳しい！",
    description: "行動経済学の主要な理論をしっかり理解しています。日常の買い物や広告を見るとき、今回学んだバイアスがどこで使われているか観察してみてください。きっと世界の見え方が変わります。"
  }
  if (score >= 5) return {
    emoji: "📚",
    text: "いい線いっています！",
    description: "基礎はしっかり押さえています。間違えた問題の解説をもう一度読み返すと、ビジネスや日常生活で『なぜあの時あの判断をしたのか』が見えてきます。行動経済学は知れば知るほど面白い分野です。"
  }
  return {
    emoji: "🌱",
    text: "伸びしろ無限大！",
    description: "行動経済学は、人間の『なぜそうしてしまうのか？』を科学的に解き明かす学問です。ダニエル・カーネマン著『ファスト＆スロー』がおすすめの入門書。ビジネスにもプライベートにも必ず役立つ知識が詰まっています。"
  }
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

  // 各問題の回答を記録（戻るボタン用）
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))

  // 回答処理
  function handleAnswer(index) {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
  }

  // 次の問題へ
  function goNext() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  // 前の問題へ
  function goBack() {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1
      const prevAnswer = answers[prevIndex]
      // 前の問題のスコアを取り消す
      if (prevAnswer === questions[prevIndex].answer) {
        setScore(score - 1)
      }
      // 前の問題に戻る（未回答状態に戻す）
      const newAnswers = [...answers]
      newAnswers[prevIndex] = null
      setAnswers(newAnswers)
      setCurrentQuestion(prevIndex)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
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
    setAnswers(Array(questions.length).fill(null))
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

        {/* ナビゲーションボタン */}
        <div className="nav-buttons">
          {currentQuestion > 0 && (
            <button className="nav-btn nav-back" onClick={goBack} disabled={!isAnswered}>
              ← 前の問題
            </button>
          )}
          {isAnswered && (
            <button className="nav-btn nav-next" onClick={goNext}>
              {currentQuestion + 1 < questions.length ? '次の問題 →' : '結果を見る →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
