import { describe, expect, it } from 'vitest'
import { answerKeys, calculateResult, personalities, questions, type AnswerMap, type DimensionId } from './scoring'

const answersByDimension = (choices: Partial<Record<DimensionId, 'A' | 'B' | 'C'>>): AnswerMap =>
  Object.fromEntries(
    questions.map((question) => [question.id, choices[question.dimension] ?? 'B']),
  )

describe('LBTI scoring', () => {
  it('calculates the market-aware direct active type from selected answers', () => {
    const answers = answersByDimension({
      D1: 'C',
      D2: 'C',
      D3: 'A',
      D4: 'A',
      D5: 'A',
      D6: 'A',
      D7: 'C',
      D8: 'C',
      D9: 'C',
      D10: 'C',
    })

    const result = calculateResult(answers)

    expect(result.type.code).toBe('HFDAM')
    expect(result.type.englishName).toBe('FIRE')
    expect(result.dimensionLevels.D9).toBe('H')
    expect(result.dimensionLevels.D10).toBe('H')
  })

  it('calculates a low-game slow boundary type from selected answers', () => {
    const answers = answersByDimension({
      D1: 'A',
      D2: 'A',
      D3: 'C',
      D4: 'C',
      D5: 'C',
      D6: 'C',
      D7: 'A',
      D8: 'A',
      D9: 'A',
      D10: 'A',
    })

    const result = calculateResult(answers)

    expect(result.type.code).toBe('CBSWN')
    expect(result.type.englishName).toBe('CHILL')
    expect(result.dimensionLevels.D1).toBe('L')
    expect(result.dimensionLevels.D9).toBe('L')
  })

  it('detects hidden personas from dimension levels and egg answers', () => {
    const answers = answersByDimension({
      D1: 'C',
      D2: 'A',
      D3: 'C',
      D4: 'A',
      D5: 'A',
      D6: 'A',
      D7: 'C',
      D8: 'B',
      D9: 'C',
      D10: 'C',
    })
    answerKeys.forEach((egg) => {
      answers[egg.id] = egg.id === 'egg_message' ? 'B' : 'C'
    })

    const result = calculateResult(answers)

    expect(result.hiddenPersonas.map((persona) => persona.id)).toEqual(
      expect.arrayContaining(['BUG', 'SEA', 'HUNTER']),
    )
  })

  it('keeps internal personality code out of share text', () => {
    const answers = answersByDimension({
      D1: 'C',
      D2: 'C',
      D3: 'A',
      D4: 'A',
      D5: 'A',
      D6: 'A',
      D7: 'C',
      D8: 'C',
      D9: 'C',
      D10: 'C',
    })

    const result = calculateResult(answers)

    expect(result.shareText).toContain('FIRE')
    expect(result.shareText).not.toContain(result.type.code)
    expect(result.shareText).not.toContain('。。')
  })

  it('detects the deep-giver hidden persona', () => {
    const answers = answersByDimension({
      D1: 'C',
      D2: 'A',
      D3: 'B',
      D4: 'B',
      D5: 'C',
      D6: 'B',
      D7: 'B',
      D8: 'A',
      D9: 'A',
      D10: 'B',
    })

    const result = calculateResult(answers)

    expect(result.hiddenPersonas.map((persona) => persona.id)).toContain('DOGE')
  })

  it('uses the new meme-style display names instead of deprecated labels', () => {
    const deprecatedDisplayNames = ['SPARK', 'SCOUT', 'ARROW', 'TREAT', 'PROBE', 'LOGIC', 'AUDIT']
    const allDisplayNames = personalities.map((personality) => personality.englishName)

    deprecatedDisplayNames.forEach((displayName) => {
      expect(allDisplayNames).not.toContain(displayName)
    })
  })
})
