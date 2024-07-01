<template>
  <v-list>
    <TodoListItem
      v-for="todoItem in todoList"
      :key="todoItem.id"
      :todoItem="todoItem"
      @delete-todo="$emit('delete-todo', $event)"
      @toggle-completed="$emit('toggle-completed', $event)"
    />
  </v-list>
</template>

<script setup>
import TodoListItem from './TodoListitem.vue'

const props = defineProps({
  todoList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-todo', 'toggle-completed'])
</script>