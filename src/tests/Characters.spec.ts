// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from 'vitest'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/vue'
import { provideApolloClient } from '@vue/apollo-composable'
import Characters from '../views/Characters.vue'
import { Character } from '../types/types'
import apolloClient from '../apollo'

interface CustomRenderOptions extends RenderOptions {
  charactersProcessing?: boolean
  charactersData?: Character[]
}

beforeEach(() => {
  provideApolloClient(apolloClient)
})

describe('Characters Component', () => {
  test('renders loading spinner when characters are processing', async () => {
    const { container } = render(Characters, {
      charactersProcessing: true,
    } as CustomRenderOptions)

    const spinner = container.querySelector('.spinner')
    expect(spinner).not.toBeNull()

    const charactersGrid = container.querySelector('.grid')
    expect(charactersGrid).toBeNull()
  })
})
