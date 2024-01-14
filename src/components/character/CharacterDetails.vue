<template>
  <div>
    <div
      v-if="characterProcessing"
      class="flex items-center justify-center h-screen"
    >
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div class="relative">
        <div class="absolute top-0 left-0 m-4">
          <a href="/" class="bg-[#f9e009] text-[#414b5b] px-4 py-2 rounded">
            Back to Home
          </a>
        </div>

        <div class="flex items-center justify-center h-screen">
          <div
            class="flex w-full md:w-1/2 bg-white rounded-md overflow-hidden m-4"
          >
            <img
              v-bind:src="characterDetails?.image"
              alt="Character Image"
              class="w-1/2 h-auto"
            />

            <div class="w-1/2 p-4 flex flex-col items-center justify-center">
              <h2 class="font-bold mb-2">Name</h2>
              <p>{{ characterDetails?.name }}</p>
              <h2 class="font-bold mt-4 mb-2">Gender</h2>
              <p>{{ characterDetails?.gender }}</p>
              <h2 class="font-bold mt-4 mb-2">Species</h2>
              <p>{{ characterDetails?.species }}</p>
              <h2 class="font-bold mt-4 mb-2">Status</h2>
              <p>{{ characterDetails?.status }}</p>
              <h2 class="font-bold mt-4 mb-2">Created At</h2>
              <p>{{ characterDetails?.created }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import ErrorHandler from '../../helpers/error-handler'
import { Character } from '../../types/types'
import FETCH_CHARACTER from '../../graphql/queries/FetchCharacter.graphql'

export default {
  name: 'CharacterDetails',
  setup() {
    const characterDetails: Ref<Character | null> = ref(null)
    const route = useRoute()

    const {
      onResult: onCharacterResult,
      onError: onCharacterError,
      loading: characterProcessing,
      refetch: characterRefetch,
    } = useQuery(
      FETCH_CHARACTER,
      { id: route && route.params ? route.params.id : '' },
      {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
      },
    )

    onMounted(() => {
      characterRefetch()
    })

    onCharacterResult((queryResult) => {
      characterDetails.value = queryResult.data?.character || null
    })

    onCharacterError((error) => {
      console.log(error)
      if (error) {
        ErrorHandler.throwGraphQLError(error)
      }
    })

    return {
      characterDetails,
      characterProcessing,
    }
  },
}
</script>
