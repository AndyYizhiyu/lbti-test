import { useMemo, useState } from 'react'
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
            <span className="eyebrow">Love Behavior Type Inventory</span>
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
            <div className="orbit-card orbit-card-a">PURE</div>
            <div className="orbit-card orbit-card-b">SIGMA</div>
            <div className="orbit-card orbit-card-c">LOGIC</div>
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
          <span>{result.type.code}</span>
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

export default App
