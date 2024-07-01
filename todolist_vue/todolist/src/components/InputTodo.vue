<template>
  <v-row class="mb-3">
    <v-col>
      <v-text-field
        v-model="todo"
        label="할일을 여기에 입력!"
        @keyup.enter="addTodoHandler"
        append-icon="mdi-plus"
        @click:append="addTodoHandler"
        outlined
        dense
        color="success"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])
const todo = ref('')
const addTodoHandler = () => {
  if (todo.value.length >= 3) {
    emit('add-todo', todo.value)
    todo.value = ''
  }
}
</script>