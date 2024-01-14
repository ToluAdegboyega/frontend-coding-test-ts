// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, beforeEach } from 'vitest'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions, waitFor } from '@testing-library/vue'
import { provideApolloClient } from '@vue/apollo-composable'
import CharacterDetails from '../components/character/CharacterDetails.vue'
import { Character } from '../types/types'
import apolloClient from '../apollo'

interface CustomRenderOptions extends RenderOptions {
  characterProcessing?: boolean
  characterDetails?: Character | null
}

beforeEach(() => {
  provideApolloClient(apolloClient)
})

describe('CharacterDetails Component', () => {
  test('renders loading spinner when character details are processing', async () => {
    const { container } = render(CharacterDetails, {
      characterProcessing: true,
    } as CustomRenderOptions)

    const spinner = container.querySelector('.spinner')
    expect(spinner).not.toBeNull()

    const characterDetailsContainer = container.querySelector('.relative')
    expect(characterDetailsContainer).toBeNull()
  })

  test('renders character details when successfully loaded', async () => {
    const characterDetails: Character = {
      id: 1,
    }

    const { container } = render(CharacterDetails, {
      characterProcessing: false,
      characterDetails,
    } as CustomRenderOptions)

    await waitFor(() => {
      const spinner = container.querySelector('.spinner')
      expect(spinner).toBeNull()
    })
  })
})
