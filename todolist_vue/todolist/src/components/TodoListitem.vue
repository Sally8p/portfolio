<template>
  <v-list-item
    class="todo-item"
    :class="{ 'v-list-item--active': todoItem.completed }"
  >
    <v-list-item-content class="todo-item-content" @click="$emit('toggle-completed', todoItem.id)">
      <span class="pointer" :class="{ 'todo-done': todoItem.completed }">
        {{ todoItem.todo }} {{ todoItem.completed ? "(완료)" : "" }}
      </span>
    </v-list-item-content>
    <v-list-item-action class="todo-item-actions">
      <v-btn icon @click.stop="$emit('delete-todo', todoItem.id)" color="success">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script setup>
const props = defineProps({
  todoItem: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-todo', 'toggle-completed'])
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}

.pointer {
  cursor: pointer;
}
</style>