import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { questions } from './lib/scoring'

describe('LBTI app', () => {
  it('starts the test and renders answer options as A/B/C choices', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '开始测试' }))

    expect(screen.getByText(questions[0].text)).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })
})
