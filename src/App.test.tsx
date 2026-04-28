import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { answerKeys, questions } from './lib/scoring'

describe('LBTI app', () => {
  it('starts the test and renders answer options as A/B/C choices', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '开始测试' }))

    expect(screen.getByText(questions[0].text)).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('renders result canvases without exposing the internal personality code', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '开始测试' }))
    for (let index = 0; index < questions.length + answerKeys.length; index += 1) {
      fireEvent.click(screen.getByText('C'))
    }
    fireEvent.click(screen.getByRole('button', { name: '提交并查看结果' }))

    expect(screen.getByText('SOFT')).toBeInTheDocument()
    expect(screen.queryByText('HBSAM')).not.toBeInTheDocument()
    expect(screen.queryByText('TREAT')).not.toBeInTheDocument()
    expect(screen.getByText('PURE')).toBeInTheDocument()
    expect(screen.getByLabelText('LBTI 维度雷达图')).toBeInTheDocument()
    expect(screen.getByLabelText('LBTI 分享海报')).toBeInTheDocument()
  })
})
