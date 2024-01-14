<template>
  <div>
    <div
      v-if="charactersProcessing"
      class="flex items-center justify-center h-screen"
    >
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-16">
        <a
          v-for="character in charactersData"
          v-bind:key="character.id"
          v-bind:href="`/character-details/${character.id}`"
          v-bind:data-testid="`character-${character.id}`"
          class="bg-white rounded-md shadow-md block cursor-pointer transition-transform transform-glow-up hover:transform-hover"
        >
          <img
            v-bind:src="character.image"
            v-bind:alt="character.name"
            class="w-full h-50 object-cover mb-4 rounded-tl-md rounded-tr-md"
          />
          <div>
            <h4 class="text-lg text-[#414b5b] font-semibold mb-2">
              {{ character.name }}
            </h4>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import ErrorHandler from '../helpers/error-handler'
import { Character } from '../types/types'
import FETCH_CHARACTERS from '../graphql/queries/FetchCharacters.graphql'

export default {
  name: 'Characters',
  setup() {
    const charactersData: Ref<Character[]> = ref([])
    const charactersVariables = ref({})
    const router = useRouter()

    const {
      onResult: onCharactersResult,
      onError: onCharactersError,
      loading: charactersProcessing,
      refetch: charactersRefetch,
    } = useQuery(FETCH_CHARACTERS, charactersVariables, {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    })

    const goToCharacterDetailsPage = (characterId: number) => {
      router.push(`/character-details/${characterId}`)
    }

    onCharactersResult((queryResult) => {
      const value = queryResult.data?.characters
      if (value && value.results.length > 0) {
        charactersData.value = value.results as Character[]
      } else {
        charactersData.value = []
      }
    })

    onCharactersError((error) => {
      if (error) {
        ErrorHandler.throwGraphQLError(error)
      }
    })

    return {
      charactersProcessing,
      charactersData,
      charactersRefetch,
      goToCharacterDetailsPage,
    }
  },
}
</script>

<style>
.spinner {
  border: 4px solid rgba(0, 128, 0, 0.1);
  border-top: 4px solid #f9e009;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.transform-hover {
  transition: transform 0.3s ease;
}

.hover\:transform-hover:hover {
  transform: translateY(-20px);
}
</style>
