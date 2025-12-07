<template>
  <div class="editor-root">
    <textarea v-model="content" rows="12" placeholder="Write or paste research text here..."></textarea>
    <div class="controls">
      <button @click="summarize">Summarize</button>
      <button @click="extractCitations">Extract Citations</button>
      <button @click="checkPlagiarism">Check Plagiarism</button>
    </div>
    <div class="results">
      <h3>Results</h3>
      <div v-if="summary.length">
        <h4>Summary</h4>
        <ul><li v-for="s in summary" :key="s">{{ s }}</li></ul>
      </div>
      <div v-if="citations.length">
        <h4>Citations</h4>
        <ul><li v-for="c in citations" :key="c.raw">{{ c.raw }}</li></ul>
      </div>
      <div v-if="plagiarism">
        <h4>Plagiarism</h4>
        <p>Similarity: {{ (plagiarism.similarity * 100).toFixed(2) }}% (overlap {{ plagiarism.overlapCount }})</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { summarize } from '@/plugins/summarizer';
import { extractCitations } from '@/plugins/citation_extractor';
import { compareTexts } from '@/plugins/plagiarism';

export default defineComponent({
  name: 'Editor',
  setup() {
    const content = ref('');
    const summary = ref<string[]>([]);
    const citations = ref<any[]>([]);
    const plagiarism = ref<any | null>(null);

    function summarizeAction() {
      summary.value = summarize(content.value, 3).sentences;
    }
    function extractCitationsAction() {
      citations.value = extractCitations(content.value);
    }
    function checkPlagiarismAction() {
      // For stub: compare the text to itself to show 100% similarity or compare to empty sample.
      plagiarism.value = compareTexts(content.value, content.value);
    }

    return {
      content,
      summary,
      citations,
      plagiarism,
      summarize: summarizeAction,
      extractCitations: extractCitationsAction,
      checkPlagiarism: checkPlagiarismAction,
    };
  },
});
</script>

<style scoped>
.editor-root { display: flex; flex-direction: column; gap: 12px; }
textarea { width: 100%; font-family: monospace; }
.controls { display: flex; gap: 8px; }
.results { border-top: 1px solid #eee; padding-top: 8px; }
</style>
