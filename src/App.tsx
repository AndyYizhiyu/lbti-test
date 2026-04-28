import { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import './styles.css'
import {
  answerKeys,
  calculateResult,
  dimensionExplanations,
  dimensionLabels,
  questions,
  type AnswerMap,
  type DimensionId,
  type EggQuestion,
  type LbtiResult,
  type Question,
} from './lib/scoring'

const allItems = [...questions, ...answerKeys]
const dimensionIds = Object.keys(dimensionLabels) as DimensionId[]

const isCoreQuestion = (item: Question | EggQuestion): item is Question => 'dimension' in item

function App() {
  const [screen, setScreen] = useState<'intro' | 'test' | 'result'>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<AnswerMap>>({})

  const answeredCount = allItems.filter((item) => answers[item.id]).length
  const progress = Math.round((answeredCount / allItems.length) * 100)
  const currentItem = allItems[currentIndex]
  const canSubmit = answeredCount === allItems.length
  const result = useMemo<LbtiResult | null>(
    () => (screen === 'result' ? calculateResult(answers) : null),
    [answers, screen],
  )

  const chooseAnswer = (questionId: string, key: 'A' | 'B' | 'C') => {
    setAnswers((previous) => ({ ...previous, [questionId]: key }))
    setCurrentIndex((index) => Math.min(index + 1, allItems.length - 1))
  }

  const restart = () => {
    setAnswers({})
    setCurrentIndex(0)
    setScreen('intro')
  }

  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="页面导航">
        <a className="brand" href="#top" aria-label="LBTI 首页">
          <span className="brand-mark">LB</span>
          <span>LBTI.love</span>
        </a>
        <span className="nav-pill">45 题 · 10 维 · 32 型</span>
      </nav>

      {screen === 'intro' && (
        <section className="hero-card screen-card">
          <div className="hero-copy">
            <span className="eyebrow">Love Behavior Type INDICATOR</span>
            <h1>测测你在恋爱市场到底是什么物种</h1>
            <p>
              一套粉色但不降智的恋爱行为测试：看你的心动方式、边界感、表达习惯、暧昧雷达和资源公平观。
              结果有科学依据，也有足够适合截图转发的抽象整活。
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => setScreen('test')}>
                开始测试
              </button>
              <a className="ghost-button" href="#model">
                先看模型
              </a>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <img src="/icon.svg" alt="" />
            <div className="orbit-card orbit-card-a">纯爱</div>
            <div className="orbit-card orbit-card-b">边界</div>
            <div className="orbit-card orbit-card-c">清醒</div>
          </div>
        </section>
      )}

      {screen === 'test' && (
        <section className="test-card screen-card">
          <div className="test-topbar">
            <div>
              <span className="eyebrow">第 {currentIndex + 1} 题 / {allItems.length}</span>
              <h2>{isCoreQuestion(currentItem) ? dimensionLabels[currentItem.dimension] : '彩蛋题'}</h2>
            </div>
            <div className="progress-text">{progress}%</div>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <article className="question-card">
            <p className="question-kind">
              {isCoreQuestion(currentItem) ? '核心维度题' : '隐藏人格触发题'}
            </p>
            <h3>{currentItem.text}</h3>
            <div className="option-grid">
              {currentItem.options.map((option) => (
                <button
                  className={`option-card ${answers[currentItem.id] === option.key ? 'is-selected' : ''}`}
                  key={option.key}
                  type="button"
                  onClick={() => chooseAnswer(currentItem.id, option.key)}
                >
                  <span className="option-key">{option.key}</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </article>

          <div className="test-actions">
            <button
              className="ghost-button"
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
              disabled={currentIndex === 0}
            >
              上一题
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => setCurrentIndex((index) => Math.min(index + 1, allItems.length - 1))}
              disabled={currentIndex === allItems.length - 1}
            >
              下一题
            </button>
            <button
              className="primary-button"
              type="button"
              onClick={() => setScreen('result')}
              disabled={!canSubmit}
            >
              提交并查看结果
            </button>
          </div>
          {!canSubmit && <p className="hint">全选完才会放行。恋爱可以随缘，测试进度不能随缘。</p>}
        </section>
      )}

      {screen === 'result' && result && (
        <ResultScreen result={result} restart={restart} />
      )}

      <section id="model" className="model-grid">
        <article className="info-card">
          <h2>科学底座</h2>
          <p>参考成人依恋、爱情三角理论、Big Five 与关系满意度研究，把恋爱行为拆成 10 个可解释维度。</p>
        </article>
        <article className="info-card">
          <h2>传播外壳</h2>
          <p>人格名保留网感，结果页先接住你，再指出翻车点，不把任何性别贴成固定标签。</p>
        </article>
        <article className="info-card">
          <h2>本地测试</h2>
          <p>当前版本不需要登录，不上传答案，结果由浏览器即时计算。</p>
        </article>
      </section>
    </main>
  )
}

function ResultScreen({ result, restart }: { result: LbtiResult; restart: () => void }) {
  return (
    <section className="result-card screen-card">
      <div className="result-hero">
        <div className="poster">
          <span className="poster-kicker">你的 LBTI 类型</span>
          <strong>{result.type.englishName}</strong>
          <span>{result.type.name}</span>
        </div>
        <div className="type-copy">
          <span className="eyebrow">主类型</span>
          <h1>{result.type.name}</h1>
          <p className="tagline">{result.type.tagline}</p>
          <div className="badge-row">
            <span>{result.type.strengths}</span>
            <span>{result.type.risks}</span>
          </div>
          <p>{result.type.advice}</p>
        </div>
      </div>

      {result.hiddenPersonas.length > 0 && (
        <section className="hidden-box">
          <h2>隐藏副人格</h2>
          <div className="hidden-grid">
            {result.hiddenPersonas.slice(0, 4).map((persona) => (
              <article key={persona.id}>
                <span>{persona.id}</span>
                <h3>{persona.name}</h3>
                <p>{persona.copy}</p>
                <small>{persona.advice}</small>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="canvas-grid">
        <RadarChartCanvas result={result} />
        <SharePosterCanvas result={result} />
      </section>

      <section className="dimension-box">
        <h2>10 维度评分</h2>
        <div className="dimension-list">
          {dimensionIds.map((dimension) => {
            const score = result.rawScores[dimension]
            const level = result.dimensionLevels[dimension]
            return (
              <article className="dimension-row" key={dimension}>
                <div>
                  <strong>{dimensionLabels[dimension]}</strong>
                  <span>{level} · {score}/12</span>
                </div>
                <div className="dimension-meter" aria-hidden="true">
                  <span style={{ width: `${(score / 12) * 100}%` }} />
                </div>
                <p>{dimensionExplanations[dimension][level]}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="share-box">
        <h2>分享文案</h2>
        <p>{result.shareText}</p>
        <div className="test-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => navigator.clipboard?.writeText(result.shareText)}
          >
            复制结果文案
          </button>
          <button className="ghost-button" type="button" onClick={restart}>
            重新测试
          </button>
        </div>
      </section>
    </section>
  )
}

function RadarChartCanvas({ result }: { result: LbtiResult }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      return
    }
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2 + 8
    const radius = 118
    const scores = dimensionIds.map((dimension) => result.rawScores[dimension] / 12)

    ctx.clearRect(0, 0, width, height)
    const bg = ctx.createLinearGradient(0, 0, width, height)
    bg.addColorStop(0, '#fff7fb')
    bg.addColorStop(1, '#ffe0eb')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(184, 50, 104, 0.18)'
    ctx.lineWidth = 1
    for (let ring = 1; ring <= 4; ring += 1) {
      ctx.beginPath()
      dimensionIds.forEach((_, index) => {
        const angle = (Math.PI * 2 * index) / dimensionIds.length - Math.PI / 2
        const pointRadius = (radius * ring) / 4
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.stroke()
    }

    dimensionIds.forEach((dimension, index) => {
      const angle = (Math.PI * 2 * index) / dimensionIds.length - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.fillStyle = '#8d2656'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = x < centerX - 8 ? 'right' : x > centerX + 8 ? 'left' : 'center'
      ctx.fillText(dimensionLabels[dimension].slice(0, 4), x, y)
    })

    ctx.beginPath()
    scores.forEach((score, index) => {
      const angle = (Math.PI * 2 * index) / scores.length - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius * score
      const y = centerY + Math.sin(angle) * radius * score
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(255, 79, 145, 0.28)'
    ctx.strokeStyle = '#ff4f91'
    ctx.lineWidth = 3
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#4a122b'
    ctx.font = '900 20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('LBTI 维度雷达图', centerX, 34)
  }, [result])

  return (
    <article className="canvas-card">
      <div>
        <span className="eyebrow">Radar</span>
        <h2>维度雷达图</h2>
      </div>
      <canvas aria-label="LBTI 维度雷达图" ref={canvasRef} width="420" height="360" />
    </article>
  )
}

function SharePosterCanvas({ result }: { result: LbtiResult }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      return
    }
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const bg = ctx.createLinearGradient(0, 0, width, height)
    bg.addColorStop(0, '#ff4f91')
    bg.addColorStop(0.58, '#ff8b68')
    bg.addColorStop(1, '#ffd36a')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'rgba(255,255,255,0.22)'
    ctx.beginPath()
    ctx.arc(94, 92, 78, 0, Math.PI * 2)
    ctx.arc(338, 482, 124, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.86)'
    roundRect(ctx, 34, 42, width - 68, height - 84, 30)
    ctx.fill()

    ctx.fillStyle = '#b83268'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('Love Behavior Type Inventory', 62, 92)

    ctx.fillStyle = '#4a122b'
    ctx.font = '900 58px sans-serif'
    ctx.fillText(result.type.englishName, 62, 168)

    ctx.font = '900 30px sans-serif'
    ctx.fillText(result.type.name, 62, 214)

    ctx.fillStyle = '#674053'
    ctx.font = 'bold 19px sans-serif'
    wrapCanvasText(ctx, result.type.tagline, 62, 270, width - 124, 28)
    wrapCanvasText(ctx, result.type.advice, 62, 352, width - 124, 28)

    ctx.fillStyle = '#ff4f91'
    ctx.font = '900 20px sans-serif'
    ctx.fillText('测测你在恋爱市场到底是什么物种', 62, height - 78)
  }, [result])

  const downloadPoster = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `lbti-${result.type.englishName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <article className="canvas-card">
      <div>
        <span className="eyebrow">Poster</span>
        <h2>分享海报</h2>
      </div>
      <canvas aria-label="LBTI 分享海报" ref={canvasRef} width="480" height="640" />
      <button className="primary-button" type="button" onClick={downloadPoster}>
        下载分享海报
      </button>
    </article>
  )
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  let line = ''
  let currentY = y
  Array.from(text).forEach((char) => {
    const testLine = line + char
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY)
      line = char
      currentY += lineHeight
      return
    }
    line = testLine
  })
  if (line) ctx.fillText(line, x, currentY)
}

export default App
